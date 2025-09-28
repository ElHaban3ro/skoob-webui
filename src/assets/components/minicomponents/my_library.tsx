function MyLibrary({ books }: any) {


    return (
        <div className="library_content w-full h-[10rem] ">
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