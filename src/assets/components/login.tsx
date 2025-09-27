import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";
import { BookOpenText } from "lucide-react";
import { Loader2Icon } from "lucide-react";
import { Toaster } from "sonner";
import "../css/App.css";
import useLoginFormData from "@/hooks/useLoginFormData";
import useGoogleAuthErrorCatcher from "@/hooks/useGoogleAuthErrorCatcher";
import { useNavigate } from "react-router";
import { getApiUrl } from "@/config/api";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

function Login() {
  const navigator = useNavigate();
  const { credentials, handleChange, handleError, error } = useLoginFormData();

  const { login, isLogging } = useAuth();

  useGoogleAuthErrorCatcher();

  const api_url = getApiUrl();

  const google_auth = () => {
    window.location.href = api_url + "/users/auth/google";
  };

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleError("", "");

    if (!credentials.email) {
      handleError("email", "Enter your email");
      return;
    }
    if (!credentials.password) {
      handleError("password", "Enter your password");
      return;
    }

    login(credentials);
  }

  const get_user = async () => {
    await fetch(api_url + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .catch(() => {
        console.log("Error");
      })
      .then(async (res) => {
        if (res) {
          if (res.status === 200) {
            navigator("/");
          }
        }
      });
  };

  useEffect(() => {
    get_user();
  }, []);

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="main w-full h-screen flex justify-center items-center font-worksans">
        <div className="main_div  w-96 h-[25rem] p-10 rounded-lg  outline-muted-foreground flex justify-center items-center items-col flex-col">
          <div className="top_div font-worksans text-accent font-bold flex justify-center items-center gap-2 text-3xl mb-4 border-muted-foreground w-full">
            <BookOpenText />
            <h1 className="skoob">SKOOB</h1>
          </div>
          <div className="form_div w-full">
            <form onSubmit={handleLogin}>
              <Label htmlFor="email" className="text-sm text-accent">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                className="bg-background"
                value={credentials.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {error.fieldError === "email" && (
                <span className="registerspan text-xs text-red-800">
                  {error.errorMsg}
                </span>
              )}

              <Label htmlFor="password" className="text-sm mt-4 text-accent">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                className="bg-background"
                value={credentials.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              {error.fieldError === "password" && (
                <span className="registerspan text-xs text-red-800">
                  {error.errorMsg}
                </span>
              )}

              <div className="send_button mt-4">
                <Button
                  type="submit"
                  className="cursor-pointer w-full font-bold"
                  disabled={isLogging}
                >
                  {isLogging && (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLogging ? "Connecting..." : "Login"}
                </Button>
                <span
                  className="registerspan text-xs underline text-accent"
                  onClick={() => {
                    navigator("/register");
                  }}
                >
                  I want to register
                </span>
              </div>
            </form>

            <div className="googlelogin mt-6 flex justify-center items-center flex-col gap-2 text-[0.7rem]">
              <span className="text-accent">or try</span>
              <Button
                type="submit"
                className="cursor-pointer w-full font-bold bg-background hover:bg-gray-100 text-black"
                variant={"outline"}
                onClick={google_auth}
              >
                <FaGoogle className="mr-2" />
                Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
