"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import Button from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    return `?${params.toString()}`;
  };

  const goToPage = (page: number) => {
    router.push(createPageLink(page));
  };

  // Helper to generate page numbers with dots
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Always show first 3 pages, last page, and current page +/- 1
    pages.push(1);
    if (currentPage > 4) pages.push("...");
    if (currentPage <= 4) {
      for (let i = 2; i <= 4; i++) pages.push(i);
    } else if (currentPage >= totalPages - 3) {
      for (let i = totalPages - 4; i <= totalPages - 1; i++) {
        if (i > 1) pages.push(i);
      }
    } else {
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
    }
    if (currentPage < totalPages - 3) pages.push("...");
    pages.push(totalPages);
    // Remove duplicates and sort
    return [...new Set(pages)].filter(
      (p) => typeof p === "string" || (p as number) >= 1 && (p as number) <= totalPages
    );
  };

  const pages = getPages();

  return (
    <nav className="flex gap-2 w-full justify-end" style={{ marginTop: "1rem" }}>
      <Button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-primary"
      >
        <ChevronLeft />
      </Button>
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-400 select-none">
            ...
          </span>
        ) : (
          <Button
            className={`${
              currentPage !== page
                ? "bg-white text-primary hover:bg-primary hover:text-white cursor-pointer"
                : "bg-primary text-white  hover:bg-primary hover:text-white"
            }`}
            key={page}
            onClick={() => goToPage(page as number)}
          >
            {page}
          </Button>
        )
      )}
      <Button
        className="bg-primary"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </Button>
    </nav>
  );
};

export default Pagination;
