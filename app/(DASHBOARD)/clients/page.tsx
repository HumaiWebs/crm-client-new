"use client";

import { getAllClients } from "@/api/user";
import { http } from "@/app/config/axiosClient";
import Loader from "@/components/global/loader";
import Pagination from "@/components/global/pagination";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TUser } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { DownloadIcon, ViewIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent } from "react";

import { CSVLink } from "react-csv";

export default function ClientsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get("page") || 1;
  const pageSize = searchParams.get("pageSize") || 10;

  const { isFetching, data } = useQuery<{ data: TUser[]; total: number }>({
    queryKey: ["get-clients_admin", page],
    async queryFn() {
      return (await http.get(`/user?page=${page}&pageSize=${pageSize}`)).data;
    },
  });

  // INFO: clients search

  const query = searchParams.get("query") || "";
  const { data: searchResults, isFetching: searching } = useQuery<TUser[]>({
    queryKey: ["search-clients_admin", query],
    async queryFn() {
      const result = (await http.get(`/user/search?search=${query}`)).data
        .users;
      router.push(`/clients?query=${query}&pageSize=${result.length}`);
      return result;
    },
    enabled: query.length > 0,
  });

  function handleSearchInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setTimeout(() => {
      router.push(`/clients?query=${value}`);
    }, 500);
  }

  const csvHeaders = [
    { label: "Name", key: "name" },
    { label: "email", key: "email" },
    { label: "Joined", key: "createdAt" },
    { label: "Phone", key: "phone" },
  ];
  return (
    <section className="p-4">
      <div className="w-ful flex flex-col gap-4">
        <h3 className="font-semibold text-xl text-blue-900">All Clients</h3>
        <div className="w-full gap-4 flex items-center">
          <Input
            onChange={handleSearchInputChange}
            className="flex-1 text-lg p-2 bg-white"
            placeholder="Search clients...."
          />
          <CSVLink
            data={query.length === 0 ? data?.data ?? [] : searchResults ?? []}
            headers={csvHeaders}
            filename={`${new Date().toLocaleDateString()}-clients.csv`}
          >
            <DownloadIcon className="text-blue-900" />
          </CSVLink>
        </div>
      </div>

      {isFetching || searching ? (
        <div className="my-8 w-full flex justify-center items-center">
          <Loader size="md" message="Loading clients....." />
        </div>
      ) : (
        <Table className="my-8">
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-blue-900 p-4">
                Image
              </TableHead>
              <TableHead className="font-semibold text-blue-900 p-4">
                Name
              </TableHead>
              <TableHead className="font-semibold text-blue-900 p-4">
                Email
              </TableHead>
              <TableHead className="font-semibold text-blue-900 p-4">
                Phone
              </TableHead>
              <TableHead className="font-semibold text-blue-900 p-4">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(query.length === 0 ? data?.data : searchResults)?.map(
              (client) => {
                return (
                  <TableRow key={client._id} className="bg-white">
                    <TableCell className="p-4 border-b border-b-blue-100">
                      <div className="w-[50px] h-[50px] rounded-full bg-slate-100"></div>
                    </TableCell>
                    <TableCell className="p-4 border-b border-b-blue-100">
                      {client.name}
                    </TableCell>
                    <TableCell className="p-4 border-b border-b-blue-100">
                      {client.email}
                    </TableCell>
                    <TableCell className="p-4 border-b border-b-blue-100">
                      N/A
                    </TableCell>
                    <TableCell className="p-4 border-b border-b-blue-100">
                      <div className="flex gap-2 items-center">
                        <ViewIcon />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      )}
      {isFetching ? (
        <Loader />
      ) : (
        data && <Pagination totalPages={data.total / 1} />
      )}
    </section>
  );
}
