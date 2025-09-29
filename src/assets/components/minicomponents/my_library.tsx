import Book from "@/components/book";
import { type BookType } from "@/types/books";

function MyLibrary({ books }: { books: BookType[] | undefined }) {
  return (
    <div className="library_content w-full h-screen overflow-auto flex justify-start items-start p-10 pt-5 pb-25 flex-row">
      <div className="w-full h-screen overflow-auto flex justify-start items-start p-10 pt-5 pb-25 flex-row flex-wrap">
        {books !== null &&
          books?.map((book) => <Book key={book?.id} book={book} />)}
      </div>
    </div>
  );
}
export default MyLibrary;
