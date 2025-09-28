import type { User } from "@/types/user";
import Header from "./header";
import MyLibrary from "./my_library";
import { useState } from "react";
import { getApiUrl } from "@/config/api";
import { useEffect } from "react";
import LibraryNav from "./library_nav";

function Library({ user }: { user: User | undefined }) {
    const [books, setBooks] = useState([]);
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
                        setBooks(data.content.content);
                    } else {
                        setBooks([])
                    }
                }
            });
    };

    useEffect(() => {
        get_books();
    }, [])

    return (
        <div className="appmaindiv h-screen w-full flex flex-col justify-start items-center">
            <Header user={user} />
            <LibraryNav get_books={get_books} />
            <MyLibrary books={books} />
        </div>
    );
}
export default Library;
