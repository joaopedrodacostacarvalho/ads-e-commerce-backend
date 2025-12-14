import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeUserToken } from "@/services/auth.service";
import { User } from "@/services/types";

interface JWTPayload {
  sub: number;
  email: string;
  role: "consumidor" | "vendedor";
  exp: number;
}
async function getAuthenticatedUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get("jwt-token")?.value;

  if (!token) {
    return null;
  }

  const payload = decodeUserToken(token);

  if (!payload) {
    // Se a decodificação falhar (token inválido ou expirado)
    return null;
  }

  // Mapeia o payload decodificado para o objeto User (simulação)
  const user: User = {
    id: payload.sub,
    name: "Usuário Autenticado", // Placeholder
    email: payload.email,
    phone: null,
    registrationDate: new Date().toISOString(),
    role: payload.role,
  };

  return user;
}

export default async function AccountPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    // Redireciona o usuário não autenticado para a tela de login
    redirect("/login");
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl leading-6 font-medium text-gray-900">
          Informações da Conta
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Detalhes pessoais e de acesso.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Nome (Simulado)
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.name}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">E-mail</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.email}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Perfil</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.role}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              ID de Usuário (Token)
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.id}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
