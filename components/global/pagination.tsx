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

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex gap-2 w-full justify-end" style={{ display: "flex", gap: "8px", marginTop: "1rem" }}>
      <Button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-blue-900"
      >
        <ChevronLeft />
      </Button>
      {pages.map((page) => (
        <Button
          className={`${
            currentPage !== page
              ? "bg-white text-blue-900 hover:bg-blue-900 hover:text-white cursor-pointer"
              : "bg-blue-900 text-white  hover:bg-blue-900 hover:text-white"
          }`}
          key={page}
          onClick={() => goToPage(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        className="bg-blue-900"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </Button>
    </nav>
  );
};

export default Pagination;
