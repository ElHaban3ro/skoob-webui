import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import useBooks from "@/hooks/useBooks";

function LibraryNav() {
  const { uploadBook } = useBooks();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function recieveBook(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files || !files.length) return;

    if (files?.length > 0) {
      uploadBook(files[0]);
    }
  }

  function handleUploadBook() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <div className="library_title w-full bg-background flex flex-row justify-between items-center p-4  text-[1.5rem] pr-[3rem] pl-[3rem] sticky top-0 z-30 ">
      <div className="title font-playfair text-accent font-bold">
        <h3>Mi Librería</h3>
      </div>
      <div className="add_book">
        <Input
          type="file"
          ref={fileInputRef}
          onChange={recieveBook}
          className="hidden"
        />
        <Button
          onClick={() => {
            handleUploadBook();
          }}
          className="cursor-pointer"
        >
          <FilePlus2 className="cursor-pointer" />
          SUBIR LIBRO
        </Button>
      </div>
    </div>
  );
}
export default LibraryNav;
