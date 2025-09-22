import '../css/App.css'
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button"

function Main() {
    const [user, setUser] = useState(Object);

    useEffect(() => {
        test()
    }, [])

    const test = async () => {
        await fetch("http://localhost:3030/users/me", {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
        }).catch(() => {
            console.log("Error");
        }).then(async (res) => {
            if (res) {
            const data = await res.json();
            setUser(data.content.content);
            }
        });
    }
    
    const logout = async () => {
        await fetch("http://localhost:3030/users/logout", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
        }).catch(() => {
            console.log("Error");
        }).then(async (res) => {
            if (res) {
            const data = await res.json();
            setUser(data.content.content);
            }
        });
    }

  return (
    <>
      <div className="main w-full h-screen flex justify-center items-center font-worksans">
        {user.email ? <p>Hola, {user.email}!</p> : <p>Not Logged</p>}
        <Button onClick={logout}>LOGOUT</Button>
      </div>
    </>
  )
}

export default Main