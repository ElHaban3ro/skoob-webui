import "../css/App.css";
import { getApiUrl } from "@/config/api";
import { useNavigate } from "react-router";
import Sidebar from "./minicomponents/sidebar";
import { useEffect, useState } from "react";
import Library from "./minicomponents/library";

function Main() {
  const nav = useNavigate();
  const base_url = getApiUrl();
  const [user, setUser] = useState(Object);
  const [tabSelected, setTabSelected] = useState("library");
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
        <Sidebar _user={user} logoutFunction={logout} tabSelected={tabSelected} setTabSelected={setTabSelected} />
        {tabSelected === 'library' && <Library user={user} />}
      </div>
    </>
  );
}

export default Main;

