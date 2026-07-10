import Cookie from "js-cookie";

// ─── Wrapper HTTP ───────────────────────────────────────────────────────────

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// URL de base de l'API
if (!API_BASE_URL) {
  throw new Error("La variable API_URL est manquante dans le fichier .env");
}

// Options acceptées par le wrapper apiRequest
interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
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
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (auth) {
    headers.Authorization = `Bearer ${Cookie.get("token")}`;
  }

  return fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
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
