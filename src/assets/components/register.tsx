import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";
import { BookOpenText } from "lucide-react";
import { toast } from "sonner";
import "../css/App.css";
import useLoginFormData from "@/hooks/useLoginFormData";
import useGoogleAuthErrorCatcher from "@/hooks/useGoogleAuthErrorCatcher";
import { useEffect, useState } from "react";
import { getApiUrl } from "@/config/api";
import { useNavigate } from "react-router";

function Register() {
    const { credentials, handleChange, handleError, error } = useLoginFormData();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);

    useGoogleAuthErrorCatcher();
    const api_url = getApiUrl();

    const google_auth = () => {
        window.location.href = api_url + "/users/auth/google";
    };

    const nav = useNavigate();

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
                        nav('/');
                    }
                }
            });
    };

    useEffect(() => {
    get_user();
    }, []);
    

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setNameError(false);

        handleError("", "");

        if (!credentials.email) {
            handleError("email", "Enter your email");
            return;
        }

        if (!name || name === "") {
            setNameError(true);
            return;
        }

        if (!credentials.password) {
            handleError("password", "Enter your password");
            return;
        }

        if (confirmPassword !== credentials.password) {
            toast.error("Passwords do not match.", {
                duration: 4000,
                position: "top-center",
            });
            return;
        }


        await fetch(api_url + "/users/register?" + new URLSearchParams({
            email: credentials.email,
            password: credentials.password,
            name: name
        }), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",

        })
            .catch(() => {
                toast.error("Error registering user.", {
                    description: "Vuelve a intentarlo más tarde.",
                    duration: 4000,
                    position: "top-center",
                });
            })
            .then(async (res) => {
                if (res) {
                    const response = await res.json()
                    if (res.status === 200) {
                        toast.success("Registered successfully", {
                            duration: 4000,
                            position: "top-center",
                        });
                        nav("/login");
                    } else {
                        if (response.status_title == 'AlreadyExist') {
                            toast.error("Email is already in use.", {
                                description: "The proportioned email is already in use on the other hand. Try a different one.",
                                duration: 4000,
                                position: "top-center",
                            });
                        }
                    }
                }
            });
    }

    return (
        <>
            <div className="main w-full h-screen flex justify-center items-center font-worksans">
                <div className="main_div  w-[50rem] p-10 rounded-lg  outline-muted-foreground flex justify-center items-center items-col flex-col">
                    <div className="top_div font-worksans text-accent font-bold flex justify-center items-center gap-2 text-5xl border-muted-foreground w-full">
                        <BookOpenText size={40} />
                        <h1 className="skoob">SKOOB</h1>
                    </div>
                    <div className="form_div mt-5 w-full flex justify-between flex-row h-[22rem] pr-2 pl-2">
                        <div className="column pr-2 pl-2">
                            <form onSubmit={handleRegister} className="w-[20rem] h-full flex flex-col justify-between">
                                <div className="form_main_content">

                                    <Label htmlFor="email" className="text-sm text-accent mb-2">
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

                                    <Label htmlFor="fullname" className="text-sm mt-2 text-accent mb-2">
                                        Full Name
                                    </Label>
                                    <Input
                                        type="text"
                                        id="fullname"
                                        placeholder="Fernando Leguizamo"
                                        className="bg-background"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {nameError ? (
                                        <span className="registerspan text-xs text-red-800">
                                            Enter your full name
                                        </span>
                                    ) : (
                                        <></>)}

                                    <Label htmlFor="password" className="text-sm mt-2 text-accent mb-2">
                                        Password
                                    </Label>
                                    <Input
                                        autoComplete="off"
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

                                    <Label htmlFor="passwordConfirm" className="text-sm mt-2 text-accent mb-2">
                                        Confirm the password
                                    </Label>
                                    <Input
                                        autoComplete="off"
                                        type="password"
                                        id="passwordConfirm"
                                        placeholder="Password"
                                        className="bg-background"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    { }

                                </div>


                                <div className="send_button">
                                    <Button
                                        type="submit"
                                        className="cursor-pointer w-full font-bold"
                                    > Register
                                    </Button>
                                </div>
                            </form>
                        </div>

                        <div className="googlelogin flex justify-between items-center flex-col text-[0.7rem] w-[20rem] h-full border-l-2 pr-8 pl-8">
                            <div className="maindiv">

                                <p className="text-center text-accent w-fit text-[1.3rem] ">¡Comienza ahora mismo tu biblioteca online creando una cuenta en <b>SKOOB</b> y desbloque la verdadera satisfacción de leer!</p>
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
                                    className="cursor-pointer w-full font-bold" onClick={() => { nav("/login") }}
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