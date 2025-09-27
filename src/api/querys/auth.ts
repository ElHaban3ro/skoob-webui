import type { Credentials } from "@/types/auth";
import { skoobApi } from "../client";
import type { User } from "@/types/user";

export async function getCurrentUser(): Promise<User> {
  const res = await skoobApi.get("/users/me");

  return res.data.content.content;
}

export async function login(credentials: Credentials) {
  const res = await skoobApi.post(
    "/users/auth",
    new URLSearchParams({
      username: credentials.email,
      password: credentials.password,
    })
  );

  return res;
}

export async function logout() {
  const res = await skoobApi.post("/users/logout");

  return res;
}
