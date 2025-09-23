import { skoobApi } from "@/lib/api/client";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface LoginInput {
  email: string;
  password: string;
}

export default function useLogin() {
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);

  const login = async (credentials: LoginInput) => {
    if (loading) return;

    setLoading(true);

    try {
      await skoobApi.post(
        "/users/auth",
        new URLSearchParams({
          username: credentials.email,
          password: credentials.password,
        })
      );

      toast.success("Logged in successfully", {
        duration: 4000,
        position: "top-center",
      });

      nav("/");
    } catch (e) {
      console.error(e);
      toast.error("Error logging in.", {
        description: "Please check your credentials and try again.",
        duration: 4000,
        position: "top-center",
      });
      setLoading(false);
    }
  };

  return { login, isLoading: loading };
}
