import Cookie from "js-cookie";

// ─── Wrapper HTTP ───────────────────────────────────────────────────────────

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// URL de base de l'API
if (!API_BASE_URL) {
  throw new Error("La variable API_URL est manquante dans le fichier .env");
}

// Options acceptées par le wrapper apiRequest
interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  // Ajoute l'en-tête Authorization avec le token (true par défaut)
  auth?: boolean;
}

// Wrapper centralisé : construit l'URL, pose les en-têtes (et le token si besoin),
// envoie la requête et renvoie une promesse résolue avec le JSON de la réponse.
function apiRequest<T = any>(
  path: string,
  { method = "GET", body, auth = true }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {};

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    headers.Authorization = `Bearer ${Cookie.get("token")}`;
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

// Interface reutlisable
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

//appel toute les annonce pour les afficher sur l'acceuil
export function fetchProperties(): Promise<Property[]> {
  return apiRequest<Property[]>("/api/properties", { auth: false });
}

//appel une annonce par son ID
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

//appel une annonce par son ID
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

// pour se connecter
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

// pour créer un compte
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

// pour ajouter un logement aux favoris
export function fetchAddFavorite(id: string): Promise<FavoriteResponse> {
  return apiRequest<FavoriteResponse>(`/api/properties/${id}/favorite`, {
    method: "POST",
  });
}

// pour retirer un logement aux favoris
export function fetchRemoveFavorite(id: string): Promise<FavoriteResponse> {
  return apiRequest<FavoriteResponse>(`/api/properties/${id}/favorite`, {
    method: "DELETE",
  });
}

// pour affichier la liste des logments en forvori
export function fetchFavorites(id: string): Promise<Property[]> {
  return apiRequest<Property[]>(`/api/users/${id}/favorites`, {});
}

// ─── upload ─────────────────────────────────────────────────────────────────────

export interface Upload {
  file: File;
  purpose?: string;
}

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

export function fetchUser(id: string): Promise<UserProfile> {
  return apiRequest<UserProfile>(`/api/users/${id}`, {});
}

export type UpdateUserPayload = Pick<UserProfile, "name" | "picture" | "role">;

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
