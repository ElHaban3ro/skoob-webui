import "../css/App.css";

import Sidebar from "./minicomponents/sidebar";
import { useState } from "react";
import Library from "./minicomponents/library";
import useCurrentUser from "@/hooks/useCurrentUser";

function Main() {
  const [tabSelected, setTabSelected] = useState("library");

  const { currentUser, isLoadingCurrentUser } = useCurrentUser();

  if (isLoadingCurrentUser)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <>
      <div className="main w-full h-screen flex justify-between items-center font-worksans">
        <Sidebar tabSelected={tabSelected} setTabSelected={setTabSelected} />
        {tabSelected === "library" && <Library user={currentUser} />}
      </div>
    </>
  );
}

export default Main;
