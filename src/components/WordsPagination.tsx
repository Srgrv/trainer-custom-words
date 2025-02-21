import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

import { useWordsStore } from "@/store/wordsSlice";

function WordsPagination() {
  const { currentPage, setCurrentPage, totalPages } = useWordsStore();

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          {currentPage > 1 && (
            <PaginationPrevious
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            />
          )}
          {/* <PaginationPrevious
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          /> */}
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page} className="cursor-pointer">
            <PaginationLink
              onClick={() => setCurrentPage(page)}
              isActive={currentPage === page}
              className={
                currentPage === page
                  ? "bg-red-500 text-white"
                  : "bg-transparent"
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem className="cursor-pointer">
          {currentPage < totalPages && (
            <PaginationNext
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
            />
          )}
          {/* <PaginationNext
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          /> */}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default WordsPagination;
