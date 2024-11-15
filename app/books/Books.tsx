"use client";

import { GetBooksRes } from "@/app/api/books/route";
import { booksTable } from "@/drizzle/schema";
import { useInfiniteQuery } from "@tanstack/react-query";
import { cn } from "clsx-for-tailwind";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  books: (typeof booksTable.$inferSelect)[];
};

async function fetchBooks(
  offset: number,
): Promise<(typeof booksTable.$inferSelect)[]> {
  const res = (await fetch(`/api/books?offset=${offset}&limit=20`).then((res) =>
    res.json(),
  )) as GetBooksRes;
  if (!res.success) throw new Error();
  return res.data;
}

export function Books({ books: books_ }: Props) {
  const { ref, inView } = useInView();
  const {
    data: { pages },
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["books"],
    queryFn: ({ pageParam }) => fetchBooks(pageParam),
    initialPageParam: 20,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 20 ? allPages.flat().length : undefined;
    },
    initialData: {
      pages: [books_],
      pageParams: [20],
    },
  });

  useEffect(() => {
    if (!inView || !hasNextPage) return;
    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      {pages.flat().map((book, idx, arr) => {
        return (
          <Link
            ref={arr.length - 5 === idx ? ref : undefined}
            className={cn("w-fit rounded bg-gray-300 p-3 *:text-sm", {
              "bg-red-200": arr.length - 5 === idx,
            })}
            href={`/books/${book.isbn}`}
            key={book.isbn}
          >
            <span>{idx + 1}.</span>
            <p>Book Title: {book.title}</p>
            <p>Author: {book.author}</p>
          </Link>
        );
      })}
    </>
  );
}
