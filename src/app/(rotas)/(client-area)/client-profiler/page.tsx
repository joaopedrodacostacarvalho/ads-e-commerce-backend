'use client'
import { useEffect, useState } from "react";
import { useAuth } from "../../(auth)/_AuthContext";
import Navegation from "../../../components/navegationComponents/navbar.home"
// import { useAuth } from "@/contexts/AuthContext";
type UserResponse = {
  id: number;
  name: string;
  email: string;
  role: string;
};


export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${user.sub}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar usuário");
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (!user) return <p>Usuário não autenticado</p>;
  if (loading) return <p>Carregando...</p>;


  return (
     <>
      <Navegation/>
      <h1>PROFILE AREA</h1>
      <h1>{user.sub}</h1>
      <h1>{user.role}</h1>

      <h2>Dados da API</h2>
      <p>ID: {profile?.id}</p>
      <p>Nome: {profile?.name}</p>
      <p>Email: {profile?.email}</p>
      <p>Role: {profile?.role}</p>
    
     </>
  )
}