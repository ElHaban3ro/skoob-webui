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
import useLogin from "@/hooks/useLogin";
import { useNavigate } from "react-router";

function Login() {
  const navigator = useNavigate();
  const { credentials, handleChange, handleError, error } = useLoginFormData();

  const { login, isLoading } = useLogin();

  useGoogleAuthErrorCatcher();

  const google_auth = () => {
    window.location.href = "http://localhost:3030/users/auth/google";
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
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Connecting..." : "Login"}
                </Button>
                <span className="registerspan text-xs underline text-accent" onClick={() => {navigator('/register')}}>
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

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { FaGoogle } from "react-icons/fa";
// import { BookOpenText } from "lucide-react";
// import { Loader2Icon } from "lucide-react";
// import { toast, Toaster } from "sonner";
// import "../css/App.css";
// import { useState } from "react";
// import { useNavigate } from "react-router";
// import { useSearchParams } from "react-router";
// import { useEffect } from "react";

// function Login() {
//   const nav = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);

//   const [loading, setLoading] = useState(false);

//   function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
//     setEmail(e.target.value);
//   }

//   function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
//     setPassword(e.target.value);
//   }

//   const google_auth = () => {
//     window.location.href = "http://localhost:3030/users/auth/google";
//   };

//   const [searchParams] = useSearchParams();

//   const catch_error = () => {
//     const error = searchParams.get("error");
//     console.log(error);
//     if (error === "user_registred_with_different_method") {
//       toast.error("Google Auth Error", {
//         description:
//           "Please try logging in with the method you used to register.",
//         duration: 6000,
//         position: "top-center",
//       });
//     } else if (error === "google_auth_failed") {
//       toast.error("Google Auth Error", {
//         description:
//           "There was an error during Google authentication. Please try again.",
//         duration: 6000,
//         position: "top-center",
//       });
//     }
//   };

//   useEffect(() => {
//     catch_error();
//   }, []);

//   const login = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setEmailError(false);
//     setPasswordError(false);

//     if (!loading) {
//       const emailEmpty = email === "";
//       const passwordEmpty = password === "";

//       if (email === "") {
//         setEmailError(true);
//       }
//       if (password === "") {
//         setPasswordError(true);
//       }
//       if (emailEmpty || passwordEmpty) {
//         return;
//       }

//       setLoading(true);
//       await fetch("http://localhost:3030/users/auth", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           username: email,
//           password,
//         }),
//         credentials: "include",
//       })
//         .catch(() => {
//           toast.error("Error logging in.", {
//             description: "Please check your credentials and try again.",
//             duration: 4000,
//             position: "top-center",
//           });
//           setLoading(false);
//         })
//         .then(async (res) => {
//           if (res) {
//             const data = await res.json();
//             console.log(data);
//             if (res.status === 200) {
//               toast.success("Logged in successfully", {
//                 duration: 4000,
//                 position: "top-center",
//               });
//               nav("/");
//             } else {
//               toast.error("Error logging in.", {
//                 description: "Please check your credentials and try again.",
//                 duration: 4000,
//                 position: "top-center",
//               });
//               setLoading(false);
//             }
//           }
//         });
//     }
//   };

//   return (
//     <>
//       <Toaster richColors position="top-center" />
//       <div className="main w-full h-screen flex justify-center items-center font-worksans">
//         <div className="main_div  w-96 h-[25rem] p-10 rounded-lg  outline-muted-foreground flex justify-center items-center items-col flex-col">
//           <div className="top_div font-worksans text-accent font-bold flex justify-center items-center gap-2 text-3xl mb-4 border-muted-foreground w-full">
//             <BookOpenText />
//             <h1 className="skoob">SKOOB</h1>
//           </div>
//           <div className="form_div w-full">
//             <form onSubmit={login}>
//               <Label htmlFor="email" className="text-sm text-accent">
//                 Email
//               </Label>
//               <Input
//                 type="email"
//                 id="email"
//                 placeholder="Email"
//                 className="bg-background"
//                 onChange={handleEmail}
//               />
//               {emailError && (
//                 <span className="registerspan text-xs text-red-800">
//                   Enter your email
//                 </span>
//               )}

//               <Label htmlFor="password" className="text-sm mt-4 text-accent">
//                 Password
//               </Label>
//               <Input
//                 type="password"
//                 id="password"
//                 placeholder="Password"
//                 className="bg-background"
//                 onChange={handlePassword}
//               />
//               {passwordError && (
//                 <span className="registerspan text-xs text-red-800">
//                   Enter your password
//                 </span>
//               )}

//               <div className="send_button mt-4">
//                 <Button
//                   type="submit"
//                   className="cursor-pointer w-full font-bold"
//                   disabled={loading}
//                 >
//                   {loading && (
//                     <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
//                   )}
//                   {loading ? "Connecting..." : "Login"}
//                 </Button>
//                 <span className="registerspan text-xs underline text-accent">
//                   <a href="http://test.com">I want to register</a>
//                 </span>
//               </div>
//             </form>

//             <div className="googlelogin mt-6 flex justify-center items-center flex-col gap-2 text-[0.7rem]">
//               <span className="text-accent">or try</span>
//               <Button
//                 type="submit"
//                 className="cursor-pointer w-full font-bold bg-background hover:bg-gray-100 text-black"
//                 variant={"outline"}
//                 onClick={google_auth}
//               >
//                 <FaGoogle className="mr-2" />
//                 Google
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;
