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

function Register() {
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
                <div className="main_div  w-[50rem] p-10 rounded-lg  outline-muted-foreground flex justify-center items-center items-col flex-col">
                    <div className="form_div mt-5 w-full flex justify-between flex-row h-[20rem]">
                        <div className="column p-4">
                            <form onSubmit={handleLogin} className="w-[25rem] h-full flex flex-col justify-between">
                                <div className="form_main_content">
                                    <p className="text-center text-accent w-full mb-2">¡Comienza a crear tu cuenta de <b>SKOOB</b>!</p>

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

                                    <Label htmlFor="passwordConfirm" className="text-sm mt-1 text-accent">
                                        Confirm the password
                                    </Label>
                                    <Input
                                        type="password"
                                        id="passwordConfirm"
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

                                </div>

                                
                                <div className="send_button mt-4">
                                    <Button
                                        type="submit"
                                        className="cursor-pointer w-full font-bold"
                                        disabled={isLoading}
                                    >
                                        {isLoading && (
                                            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        {isLoading ? "Connecting..." : "Register"}
                                    </Button>
                                </div>
                            </form>
                        </div>

                        <div className="googlelogin flex justify-between items-center flex-col text-[0.7rem] w-[20rem] p-4 h-full border-l-2">
                            <div className="maindiv">

                                <div className="top_div font-worksans text-accent font-bold flex justify-center items-center gap-2 text-5xl border-muted-foreground w-full">
                                    <BookOpenText size={40} />
                                    <h1 className="skoob">SKOOB</h1>
                                </div>
                                <p className="text-center text-accent w-fit text-[1rem] ">¡Comienza ahora mismo tu biblioteca online creando una cuenta en <b>SKOOB</b> y desbloque la verdadera satisfacción de leer!</p>
                            </div>
                            <div className="footermain flex justify-center items-center flex-col w-full">
                                <Button
                                    type="submit"
                                    className="cursor-pointer w-full font-bold bg-background hover:bg-gray-100 text-black"
                                    variant={"outline"}
                                    onClick={google_auth}
                                >
                                    <FaGoogle className="mr-2" />
                                    Google
                                </Button>
                                <span className="text-accent">or try</span>
                                <Button
                                    className="cursor-pointer w-full font-bold"
                                >
                                    Log In
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Register;