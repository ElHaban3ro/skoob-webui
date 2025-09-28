function MyLibrary({ books }: any) {

    return (
        <div className="library_content w-full h-[10rem] ">
            <div className="books">
                {books !== null && books.map((book: any) => (
                    <div key={book.id} className="book">
                        <img src={book.cover} alt={book.title} className="book_cover" />
                        {book.title}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MyLibrary;