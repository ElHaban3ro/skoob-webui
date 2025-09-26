import { getApiUrl } from "@/config/api";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilePlus2 } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { useRef } from "react";
import { toast } from "sonner";


function MyLibrary({ }: any) {

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const api_url = getApiUrl();
    // const nav = useNavigate()
    const [books, setBooks] = useState([]);


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

    const uploadBook = async (file: any) => {
        const formData = new FormData();
        formData.append("file", file);
        await fetch(api_url + "/books/upload", {
            method: "POST",
            headers: {
            },
            body: formData,

            credentials: "include",
        })
            .catch((e) => {
                console.log(e)
                console.log("Error");
                toast.error(
                    'Error al subir el libro.',
                    {
                        duration: 4000, 
                        position: 'top-center',
                        description: 'Ha sucedido un error al subir el archivo. Inténtalo de nuevo más tarde.'
                    }
                )
            })
            .then(async (res) => {
                if (res) {
                    if (res.status === 200) {
                        const response = await res.json();
                        const book_info = response.content.content;
                        toast.success(`El libro ${book_info.title} se ha subido correctamente.`, { duration: 4000, position: 'top-center' })
                        get_books()
                    } else {
                        toast.error(
                            'Error al añadir el libro.',
                            {
                                duration: 4000, 
                                position: 'top-center',
                                description: 'Ha sucedido un error al subir el archivo. Es posible que el libro no tenga un formato adecuado.'
                            }
                        )
                    }
                }
            });
    };

    useEffect(() => {
        get_books();
    }, [])

    function recieveBook(e: any) {
        const files = e.target.files;
        if (files.length > 0) {
            uploadBook(files[0])
        }
    }

    function handleUploadBook() {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    return (
        <div className="library_content w-full h-[10rem] ">
            <div className="library_title w-full bg-background flex flex-row justify-between items-center p-4  text-[1.5rem] pr-[3rem] pl-[3rem] ">
                <div className="title font-playfair text-accent font-bold">
                    <h3>Mi Librería</h3>
                </div>
                <div className="add_book">
                    <Input type="file" ref={fileInputRef} onChange={recieveBook} className="hidden" />
                    <Button onClick={() => {handleUploadBook()}} className="cursor-pointer">
                        <FilePlus2 className="cursor-pointer" />
                        SUBIR LIBRO
                    </Button>
                </div>
            </div>
            <div className="books">
                {books !== null && books.map((book: any) => (
                    <div key={book.id} className="book">
                        {book.title}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MyLibrary;