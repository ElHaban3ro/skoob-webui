import "../css/App.css";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/config/api";
import { useNavigate } from "react-router";
import Sidebar from "./minicomponents/sidebar";
import { useEffect, useState } from "react";

function Main() {
  const nav = useNavigate();
  const base_url = getApiUrl();
  const [user, setUser] = useState(Object);
  useEffect(() => {
    get_user();
  }, []);

  const get_user = async () => {
    await fetch(base_url + "/users/me", {
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
              const data = await res.json();
              setUser(data.content.content);
          } else {
            nav('/login');
          }
        }
      });
  };

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
          console.log("Logged out");
          setUser({})
          nav('/login');
        }
      });
  };

  return (
    <>
      <div className="main w-full h-screen flex justify-between items-center font-worksans">
        <Sidebar _user={user} logoutFunction={logout} />
        <Button onClick={logout}>LOGOUT</Button>
        <Button onClick={() => { nav('/login') }}>LOGIN</Button>
        <Button onClick={() => { nav('/register') }}>REGISTER</Button>
      </div>
    </>
  );
}

export default Main;

