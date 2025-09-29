import { login, logout } from "@/api/querys/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function useAuth() {
  const nav = useNavigate();

  const { mutate: loginMutation, isPending: isLoginPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Logged in successfully", {
        duration: 4000,
        position: "top-center",
      });

      nav("/");
    },
    onError: (e) => {
      console.error(e);
      toast.error("Error logging in.", {
        description: "Please check your credentials and try again.",
        duration: 4000,
        position: "top-center",
      });
    },
  });

  const { mutate: logoutMutation, isPending: isLogoutPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      nav("/login");
    },
  });

  return {
    login: loginMutation,
    isLogging: isLoginPending,
    logout: logoutMutation,
    isLoggingOut: isLogoutPending,
  };
}
