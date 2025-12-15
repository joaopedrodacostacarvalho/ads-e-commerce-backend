import { decodeJwt } from "jose"

export type JwtPayload = {
  sub: number,
  email: string,
  role: string,
  exp: number,
  iat: number,
}

export function decodeToken(token: string): JwtPayload {
  return decodeJwt(token) as JwtPayload;
}

export function isTokenExpired(token: string): boolean {
  const { exp } = decodeJwt(token) as JwtPayload;
  return Date.now() >= exp * 1000;
}
