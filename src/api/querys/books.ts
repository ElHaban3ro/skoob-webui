import type { BookType } from "@/types/books";
import { skoobApi } from "../client";

export async function getAllBooks(): Promise<BookType[]> {
  const res = await skoobApi.get("/books/all");

  return res.data.content.content;
}

export async function getBookCover(
  book_id: number | undefined
): Promise<string> {
  const res = await skoobApi.get("/books/get/cover", {
    params: {
      book_id,
    },
    responseType: "blob",
  });

  const cover_url = URL.createObjectURL(res.data);
  return cover_url;
}

export async function uploadBook(bookFile: File) {
  const formData = new FormData();
  formData.append("file", bookFile);

  const res = await skoobApi.post("/books/upload", formData);

  return res.data.content.content;
}
