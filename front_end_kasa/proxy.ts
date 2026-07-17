import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy d'authentification : vérifie la présence du token dans les cookies
 * et redirige vers la page de connexion s'il est absent.
 * @param request - la requête entrante
 * @returns une redirection vers /signin si l'utilisateur n'est pas
 * connecté, sinon la poursuite du traitement de la requête
 */
export function proxy(request: NextRequest) {
  const jwtToken = request.cookies.get("token");
  const token = jwtToken?.value as string;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  } else {
    return NextResponse.next();
  }
}

/**
 * Routes protégées sur lesquelles le proxy s'applique.
 */
export const config = {
  matcher: ["/favorites", "/messages", "/add-property"],
};
