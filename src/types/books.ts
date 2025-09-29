export type BookDocType = "epub" | "pdf" | "mobi";

export interface TableOfContents {
  [chapterKey: string]: string;
}

export interface BookType {
  id: number;
  title: string;
  description: string;
  author: string;
  cover_path: string;
  contributor: string | null;
  category: string;
  publish_date: string;
  publisher: string | null;
  language: string;
  opf_path: string;
  metadata_path: string;
  toc_path: string;
  book_type: BookDocType;
  book_content: string[];
  book_charapters: number;
  toc_content: TableOfContents;
  main_folder_path: string;
  original_file_path: string;
  owner_id: number;
}
