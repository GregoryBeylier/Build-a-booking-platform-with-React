import Cookie from "js-cookie";

// ─── Wrapper HTTP ───────────────────────────────────────────────────────────

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_BASE_URL) {
  throw new Error("La variable API_URL est manquante dans le fichier .env");
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean;
  token?: string;
}

/**
 * Wrapper HTTP centralisé pour tous les appels à l'API Kasa.
 * Construit l'URL, pose les en-têtes (Content-Type, Authorization),
 * envoie la requête et retourne le JSON de la réponse.
 * @param path - chemin de la route API (ex: "/api/properties")
 * @param options - méthode HTTP, corps de la requête, et gestion de l'authentification
 * @returns les données JSON de la réponse
 */
function apiRequest<T = any>(
  path: string,
  { method = "GET", body, auth = true, token }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {};

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    headers.Authorization = `Bearer ${token ?? Cookie.get("token")}`;
  }

  let requestBody: BodyInit | undefined;

  if (body instanceof FormData) {
    requestBody = body;
  } else {
    requestBody = body === undefined ? undefined : JSON.stringify(body);
  }
  return fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: requestBody,
  }).then(async (response) => {
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    return response.json() as Promise<T>;
  });
}

// ─── Property ─────────────────────────────────────────────────────────────────────

export interface PropertyHost {
  id: number;
  name: string;
  picture: string;
}

// fiche d'identité d'un logment
export interface Property {
  id: string;
  slug?: string;
  title: string;
  description?: string;
  cover?: string;
  location?: string;
  price_per_night: number;
  rating_avg?: number;
  ratings_count?: number;
  host?: PropertyHost;
  pictures?: string[];
  equipments?: string[];
  tags?: string[];
}

/**
 * Récupère la liste de toutes les annonces, pour l'affichage sur la page d'accueil.
 * @returns la liste des logements
 */
export function fetchProperties(): Promise<Property[]> {
  return apiRequest<Property[]>("/api/properties", { auth: false });
}

/**
 * Récupère le détail d'une annonce à partir de son identifiant.
 * @param id - identifiant du logement
 * @returns le logement correspondant
 */
export function fetchPropertyById(id: string): Promise<Property> {
  return apiRequest<Property>(`/api/properties/${id}`, { auth: false });
}

// ─── Create Property ─────────────────────────────────────────────────────────────────────

export type CreatePropertyPayload = Pick<
  Property,
  | "title"
  | "description"
  | "location"
  | "price_per_night"
  | "cover"
  | "equipments"
  | "tags"
  | "pictures"
> & { host_id: number };

/**
 * Crée une nouvelle annonce.
 * @param newProperty - les informations du logement à créer
 * @returns le logement créé, tel que renvoyé par l'API
 */
export function fetchAddProperty(
  newProperty: CreatePropertyPayload,
): Promise<Property> {
  return apiRequest<Property>("/api/properties", {
    method: "POST",
    body: newProperty,
  });
}

// ─── Login / register ─────────────────────────────────────────────────────────────────────

export interface UserSession {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    picture?: string;
    role: "owner" | "client" | "admin";
  };
}

/**
 * Connecte un utilisateur avec son email et son mot de passe.
 * @param credentials - email et mot de passe de l'utilisateur
 * @returns le token d'authentification et les informations de l'utilisateur
 */
export function fetchLogin(credentials: {
  password: string;
  email: string;
}): Promise<UserSession> {
  return apiRequest<UserSession>("/auth/login", {
    method: "POST",
    body: credentials,
    auth: false,
  });
}

/**
 * Crée un nouveau compte utilisateur.
 * @param register - nom, email et mot de passe du nouvel utilisateur
 * @returns le token d'authentification et les informations de l'utilisateur créé
 */
export function fetchRegister(register: {
  password: string;
  email: string;
  name: string;
}): Promise<UserSession> {
  return apiRequest<UserSession>("/auth/register", {
    method: "POST",
    body: register,
    auth: false,
  });
}

// ─── Favoris ─────────────────────────────────────────────────────────────────────

export interface FavoriteResponse {
  ok: boolean;
}

/**
 * Ajoute un logement aux favoris de l'utilisateur connecté.
 * @param id - identifiant du logement à ajouter
 * @returns la confirmation de l'ajout
 */
export function fetchAddFavorite(id: string): Promise<FavoriteResponse> {
  return apiRequest<FavoriteResponse>(`/api/properties/${id}/favorite`, {
    method: "POST",
  });
}

/**
 * Retire un logement des favoris de l'utilisateur connecté.
 * @param id - identifiant du logement à retirer
 * @returns la confirmation du retrait
 */
export function fetchRemoveFavorite(id: string): Promise<FavoriteResponse> {
  return apiRequest<FavoriteResponse>(`/api/properties/${id}/favorite`, {
    method: "DELETE",
  });
}

/**
 * Récupère la liste des logements favoris d'un utilisateur.
 * @param id - identifiant de l'utilisateur
 * @param token - jeton d'authentification, à fournir explicitement quand l'appel
 * vient d'un Server Component (sinon récupéré automatiquement via le cookie côté navigateur)
 * @returns la liste des logements favoris
 */
export function fetchFavorites(
  id: string,
  token?: string,
): Promise<Property[]> {
  return apiRequest<Property[]>(`/api/users/${id}/favorites`, { token });
}

// ─── upload ─────────────────────────────────────────────────────────────────────

export interface Upload {
  file: File;
  purpose?: string;
}

/**
 * Envoie une image à l'API et retourne son URL définitive.
 * @param file - le fichier image à envoyer
 * @param purpose - usage prévu de l'image (ex : "property-cover", "user-picture")
 * @returns l'URL complète de l'image hébergée
 */
export function fetchUploadImage({ file, purpose }: Upload): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  if (purpose) {
    formData.append("purpose", purpose);
  }
  return apiRequest<{ url: string }>("/api/uploads/image", {
    method: "POST",
    body: formData,
  }).then((data) =>
    data.url.startsWith("http")
      ? data.url
      : `${process.env.NEXT_PUBLIC_API_URL}${data.url}`,
  );
}

// ─── Users ─────────────────────────────────────────────────────────────────────

export type UserProfile = Pick<
  UserSession["user"],
  "id" | "name" | "picture" | "role"
>;

/**
 * Récupère le profil d'un utilisateur.
 * @param id - identifiant de l'utilisateur
 * @returns le profil de l'utilisateur (nom, photo, rôle)
 */
export function fetchUser(id: string): Promise<UserProfile> {
  return apiRequest<UserProfile>(`/api/users/${id}`, {});
}

export type UpdateUserPayload = Pick<UserProfile, "name" | "picture" | "role">;

/**
 * Met à jour le profil d'un utilisateur (nom, photo, rôle).
 * @param id - identifiant de l'utilisateur à modifier
 * @param data - les champs à mettre à jour
 * @returns le profil mis à jour
 */
export function fetchUpdateUser(
  id: string,
  data: UpdateUserPayload,
): Promise<UserProfile> {
  return apiRequest<UserProfile>(`/api/users/${id}`, {
    body: data,
    method: "PATCH",
  });
}

// ─── Message ─────────────────────────────────────────────────────────────────────

export interface Message {
  id: number;
  senderId: number;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: number;
  hostId: number;
  name: string;
  picture: string;
  unread: boolean;
  messages: Message[];
}
