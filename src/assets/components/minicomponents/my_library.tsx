function MyLibrary({ books }: any) {

    return (
        <div className="library_content w-full h-screen overflow-auto flex justify-start items-start p-10 pt-5 pb-25 flex-row">
            <div className="w-full h-screen overflow-auto flex justify-start items-start p-10 pt-5 pb-25 flex-row flex-wrap">
                {books !== null && books.map((book: any) => (
                    <div key={book.id} className="relative book w-55 m-5 aspect-[148/210] bg-cover rounded-2xl" style={{ backgroundImage: `url(${book.cover})` }}>
                        <div className="backdrop w-full h-full bg-black/40 absolute z-[1] backdrop-blur-[10px] saturate-300 rounded-2xl border-2 border-[#FFFFFF]/50 "></div>

                        <div className="book_content relative z-10 text-white flex justify-start items-center flex-col h-full w-full p-4">
                            <img src={book.cover} alt={book.title} className="book_cover w-full h-45 object-cover flex-1 rounded-[0.5rem] " />
                            <div className="book_info w-full pr-1 pl-1 pt-3">
                                <p className="font-bold line-clamp-2 ">{book.title}</p>
                                <p className="text-[0.8rem] ">{book.author} </p>
                                <p className="text-[0.8rem]">{book.book_charapters} Partes</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MyLibrary;