import type { User } from "@/types/user";
import Header from "./header";
import MyLibrary from "./my_library";
import LibraryNav from "./library_nav";
import useBooks from "@/hooks/useBooks";

function Library({ user }: { user: User | undefined }) {
  const { books } = useBooks();

  return (
    <div className="appmaindiv h-screen w-full flex flex-col justify-start items-center overflow-auto">
      <Header user={user} />
      <LibraryNav />
      <MyLibrary books={books} />
    </div>
  );
}
export default Library;
