import "../css/App.css";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/config/api";
import { useNavigate } from "react-router";
import Sidebar from "./sidebar";

function Main() {
  const nav = useNavigate();
  const base_url = getApiUrl();


  const logout = async () => {
    await fetch(base_url + "/users/logout", {
      method: "post",
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
          const data = await res.json();
        }
      });
  };

  return (
    <>
      <div className="main w-full h-screen flex justify-between items-center font-worksans">
        <Sidebar />
        <Button onClick={logout}>LOGOUT</Button>
        <Button onClick={() => {nav('/login')}}>LOGIN</Button>
        <Button onClick={() => {nav('/register')}}>REGISTER</Button>
      </div>
    </>
  );
}

export default Main;

