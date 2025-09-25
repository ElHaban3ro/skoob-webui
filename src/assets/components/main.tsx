import "../css/App.css";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/config/api";
import { useNavigate } from "react-router";

function Main() {
  const nav = useNavigate();
  const [user, setUser] = useState(Object);

  useEffect(() => {
    test();
  }, []);
  const base_url = getApiUrl();
  const test = async () => {
    await fetch(base_url +"/users/me", {
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
          const data = await res.json();
          setUser(data.content.content);
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
          const data = await res.json();
          setUser(data.content.content);
        }
      });
  };

  return (
    <>
      <div className="main w-full h-screen flex justify-center items-center font-worksans">
        {user.email ? <p>Hola, {user.name}!</p> : <p>Not Logged</p>}
        <img src={user.image} alt="" />
        <Button onClick={logout}>LOGOUT</Button>
        <Button onClick={() => {nav('/login')}}>LOGIN</Button>
        <Button onClick={() => {nav('/register')}}>REGISTER</Button>
      </div>
    </>
  );
}

export default Main;
