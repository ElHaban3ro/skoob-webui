import type { User } from "@/types/user";
import Header from "./header";
import MyLibrary from "./my_library";
import { useState } from "react";
import { getApiUrl } from "@/config/api";
import { useEffect } from "react";
import LibraryNav from "./library_nav";

function Library({ user }: { user: User | undefined }) {
    const [books, setBooks] = useState([] as any[]);
    const api_url = getApiUrl();

    const get_books = async () => {
        await fetch(api_url + "/books/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .catch(() => {
                setBooks([])
            })
            .then(async (res) => {
                if (res) {
                    if (res.status === 200) {
                        const data = await res.json();
                        const books_data = []
                        for (const book of data.content.content) {
                            const cover_url = await get_book_cover(book.id);
                            console.log('cover_url', cover_url);
                            books_data.push({ ...book, cover: cover_url })
                        }
                        console.log('books_data', books_data);
                        setBooks(books_data)
                    } else {
                        setBooks([])
                    }
                }
            });
    };

    const get_book_cover = async (book_id: string) => {
        const res = await fetch(api_url + "/books/get/cover?book_id=" + book_id, {
            method: "GET",
            credentials: "include",
        })

        if (!res.ok) return null;

        if (res.status === 200) {
            const data = await res.blob();
            const cover_url = URL.createObjectURL(data);
            return cover_url;
        } else {
            return null;
        }
    }

    useEffect(() => {
        get_books();
    }, [])

    return (
        <div className="appmaindiv h-screen w-full flex flex-col justify-start items-center overflow-auto">
            <Header user={user} />
            <LibraryNav get_books={get_books} />
            <MyLibrary books={books} />
        </div>
    );
}
export default Library;
