import "../css/App.css";

import Sidebar from "./minicomponents/sidebar";
import { useState } from "react";
import Library from "./minicomponents/library";
import useAuth from "@/hooks/useAuth";

function Main() {
  const [tabSelected, setTabSelected] = useState("library");

  const { currentUser, isLoadingCurrentUser, logout } = useAuth();

  if (isLoadingCurrentUser)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <>
      <div className="main w-full h-screen flex justify-between items-center font-worksans">
        <Sidebar
          _user={currentUser}
          logoutFunction={logout}
          tabSelected={tabSelected}
          setTabSelected={setTabSelected}
        />
        {tabSelected === "library" && <Library user={currentUser} />}
      </div>
    </>
  );
}

export default Main;
