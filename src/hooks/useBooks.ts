import { getAllBooks, getBookCover, uploadBook } from "@/api/querys/books";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useBooks(bookId?: number) {
  const queryClient = useQueryClient();

  const { data: books, isLoading: isLoadingBooks } = useQuery({
    queryKey: ["all-books"],
    queryFn: getAllBooks,
    enabled: !bookId,
  });

  const { data: bookCoverUrl, isLoading: isBookCoverLoading } = useQuery({
    queryKey: ["book-cover", bookId],
    queryFn: () => getBookCover(bookId),
    enabled: !!bookId,
  });

  const { mutate: uploadBookMutate, isPending: isUploadingBook } = useMutation({
    mutationFn: uploadBook,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["all-books"] });
      toast.success(`El libro ${res.title} se ha subido correctamente.`, {
        duration: 4000,
        position: "top-center",
      });
    },
    onError: (e) => {
      console.error(e);
      queryClient.invalidateQueries({ queryKey: ["all-books"] });
      toast.error("Error al añadir el libro.", {
        duration: 4000,
        position: "top-center",
        description:
          "Ha sucedido un error al subir el archivo. Es posible que el libro no tenga un formato adecuado.",
      });
    },
  });

  return {
    books,
    isLoadingBooks,
    bookCoverUrl,
    isBookCoverLoading,
    uploadBook: uploadBookMutate,
    isUploadingBook,
  };
}
