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
      const res = await fetch("http://localhost:3030/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: credentials.email,
          password: credentials.password,
        }),
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

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
