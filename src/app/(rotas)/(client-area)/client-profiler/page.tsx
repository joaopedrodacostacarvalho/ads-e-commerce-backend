'use client'

import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react"; import { useAuth } from "../../(auth)/_AuthContext";
import Navegation from "../../../components/navegationComponents/navbar.home"
import { Alert, Box, Button, CircularProgress, Container, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { authStorage } from "../../(auth)/authStorage";
import { boolean } from "zod";

type UserResponse = {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
};

type AddressResponse = {
  id: number,
  street: string,
  number: string,
  complement: string,
  city: string,
  state: string,
  zipCode: string,
  isDefault: boolean,
};


export default function Profile() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserResponse | null>(null);
  const [address, setAddress] = useState<AddressResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);

  const toggleEdit = () => setEditing((prev) => !prev);
  const editAdornment = (
    <InputAdornment position="end">
      <Tooltip title={editing ? "Cancelar edição" : "Editar perfil"}>
        <IconButton
          size="small"
          onClick={toggleEdit}
          edge="end"
        >
          {editing ? <CloseIcon /> : <EditIcon />}
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );

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

        if (!response.ok) throw new Error("Erro ao buscar usuário");

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };

    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/address/client/${user.sub}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        )

        if (!response.ok) throw new Error("Erro ao buscar endereço");
        const data = await response.json();
        console.log(`Buscando endereço: ${data}`);
        setAddress(data);
      } catch (error) {
        setError(error)
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchAddress();
  }, [user]);

  // if (!user && !loading) return router.push("/login");
  useEffect(() => {
  if (!loading && !user) {
    router.push("/login");
  }
}, [loading, user, router]);


  if (loading) return (
    <>
      <Navegation />
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    </>
  );

  if (!user) {
  // enquanto redireciona, não renderiza nada
    return null;
   }

  const handleChangeUser = (field: keyof UserResponse, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleChangeAddress = (field: keyof AddressResponse, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    handleSaveUser();
    handleSaveAddress();
  }

  const handleSaveUser = async () => {
    if (!profile) return;

    setSaving(true);
    setError(null);
    setEditing(false);

    try {
      await fetch(
        `http://localhost:3000/user/${profile.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${authStorage.getToken()}` },
          body: JSON.stringify({
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
          }),
        }
      );
      setSaved(true);
    } catch {
      setError("Erro ao salvar alterações.");
    } finally {
      setSaving(false);
    }
  };


  const handleSaveAddress = async () => {
    if (!address) return;

    setSaving(true);
    setError(null);
    setEditing(false);

    try {
      await fetch(
        (!address) ? `http://localhost:3000/address` : `http://localhost:3000/address/${address.id}`,
        {
          method: (!address) ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${authStorage.getToken()}` },
          body: JSON.stringify((!address) ? {
            clientId: profile.id,
            street: address.street,
            number: address.number,
            complement: address.complement,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            isDefault: address.isDefault,
          } : {
            id: address.id,
            street: address.street,
            number: address.number,
            complement: address.complement,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            isDefault: address.isDefault,
          }),
        }
      );
      setSaved(true);
    } catch {
      setError("Erro ao salvar alterações.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navegation />
      {/* <Box sx={{
        width: '100%',
        height: '200px',
        background: '#FFE600',
        m: 0,
        position: 'relative'


      }}> */}
      {/* melhorar estilo */}
      {/* </Box> */}
      <Container maxWidth="md" sx={{ position: 'relative'}}>
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            Minha Conta
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {saved && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Dados alterados com sucesso!
            </Alert>
          )}

          <Grid container spacing={2}>

            <Grid size={{ xs: 12 }} >
              <Box >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"

                >
                  Perfil
                </Typography>

                <Typography
                  variant="body1"
                  fontWeight={500}
                  sx={{ mt: 0.5 }}
                >
                  {profile.role === "vendedor" ? "Vendedor" : "Consumidor"}
                </Typography>
                <br />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} >
              <TextField
                label="Nome"
                fullWidth
                value={profile.name}
                disabled={!editing}

                onChange={(e) =>
                  handleChangeUser("name", e.target.value)
                }
                slotProps={{
                  input: {
                    endAdornment: editAdornment,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} >
              <TextField
                label="Email"
                fullWidth
                value={profile.email}
                disabled={!editing}
                onChange={(e) =>
                  handleChangeUser("email", e.target.value)
                }
                slotProps={{
                  input: {
                    endAdornment: editAdornment,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} >
              <TextField
                label="Telefone"
                fullWidth
                value={profile.phone}
                disabled={!editing}
                onChange={(e) =>
                  handleChangeUser("phone", e.target.value)
                }
                slotProps={{
                  input: {
                    endAdornment: editAdornment,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }} >
              <Typography
                variant="body1"
                fontWeight={500}
                sx={{ mt: 0.5 }}
              >
                Endereço
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} >
              <TextField
                label="Rua"
                fullWidth
                value={address.street}
                disabled={!editing}
                onChange={(e) =>
                  handleChangeAddress("street", e.target.value)
                }
                slotProps={{
                  input: {
                    endAdornment: editAdornment,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} >
              <TextField
                label="Número"
                fullWidth
                value={address.number}
                disabled={!editing}
                onChange={(e) =>
                  handleChangeAddress("number", e.target.value)
                }
                slotProps={{
                  input: {
                    endAdornment: editAdornment,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} >
              <TextField
                label="Complemento"
                fullWidth
                value={address.complement}
                disabled={!editing}
                onChange={(e) =>
                  handleChangeAddress("complement", e.target.value)
                }
                slotProps={{
                  input: {
                    endAdornment: editAdornment,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} >
              <TextField
                label="Cidade"
                fullWidth
                value={address.city}
                disabled={!editing}
                onChange={(e) =>
                  handleChangeAddress("city", e.target.value)
                }
                slotProps={{
                  input: {
                    endAdornment: editAdornment,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} >
              <TextField
                label="Estado"
                fullWidth
                value={address.state}
                disabled={!editing}
                onChange={(e) =>
                  handleChangeAddress("state", e.target.value)
                }
                slotProps={{
                  input: {
                    endAdornment: editAdornment,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} >
              <TextField
                label="CEP"
                fullWidth
                value={address.zipCode}
                disabled={!editing}
                onChange={(e) =>
                  handleChangeAddress("zipCode", e.target.value)
                }
                slotProps={{
                  input: {
                    endAdornment: editAdornment,
                  },
                }}
              />
            </Grid>

          </Grid>

          <Box
            display="flex"
            justifyContent="flex-end"
            mt={3}
          >
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={saving || editing}
            >
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </Box>
        </Box>
      </Container>

    </>
  )
}
