import { FormState, LoginSchema, CadastroSchema } from "../lib/definitions";

export async function login(state: FormState, formData: FormData) {
  // Validar login  
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const BASE_URL = "http://localhost:3000";
  const { email, password } = validatedFields.data;

  try {
    const request = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    });

    if (!request.ok) {
      throw new Error(`Erro ao realizar login ${request.status}`);
    }

    const response = await request.json();
    console.log(response);

  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function cadastro(state: FormState, formData: FormData) {
  // Validar login  
  const validatedFields = CadastroSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    role: formData.get("role"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const BASE_URL = "http://localhost:3000";
  const {
    name,
    email,
    password,
    phone,
    role,

  } = validatedFields.data;

  try {
    const request = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
        role: role,
      })
    });

    if (!request.ok) {
      throw new Error(`Erro ao realizar login ${request.status}`);
    }

    const response = await request.json();
    console.log(response);

  } catch (error) {
    console.error("Error: ", error);
  }
}
