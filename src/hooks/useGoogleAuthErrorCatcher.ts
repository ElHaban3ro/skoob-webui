import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

export default function useGoogleAuthErrorCatcher() {
  const [searchParams] = useSearchParams();

  const catch_error = () => {
    const error = searchParams.get("error");
    console.log(error);
    if (error === "user_registred_with_different_method") {
      toast.error("Google Auth Error", {
        description:
          "Please try logging in with the method you used to register.",
        duration: 6000,
        position: "top-center",
      });
    } else if (error === "google_auth_failed") {
      toast.error("Google Auth Error", {
        description:
          "There was an error during Google authentication. Please try again.",
        duration: 6000,
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    catch_error();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
