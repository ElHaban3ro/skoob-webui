import type { User } from "@/types/user";
import Header from "./header";
import MyLibrary from "./my_library";

function Library({ user }: { user: User | undefined }) {
  return (
    <div className="appmaindiv h-screen w-full flex flex-col justify-start items-center">
      <Header user={user} />
      <MyLibrary />
    </div>
  );
}
export default Library;
