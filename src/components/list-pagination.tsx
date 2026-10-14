"use client";

import { Pagination } from "@nextui-org/react";

interface ListPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const ListPagination = ({ page, totalPages, onChange }: ListPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <Pagination
      showControls
      page={page}
      total={totalPages}
      onChange={onChange}
      aria-label="Paginação"
      classNames={{
        wrapper: "gap-1 sm:gap-2",
        item: "bg-[#121326] text-gray-200 font-medium shadow-none data-[hover=true]:!bg-white/10",
        prev: "bg-[#121326] text-gray-200 shadow-none data-[disabled=true]:opacity-40",
        next: "bg-[#121326] text-gray-200 shadow-none data-[disabled=true]:opacity-40",
        cursor: "bg-blue-500 text-white font-bold shadow-lg",
      }}
    />
  );
};
export default ListPagination;
