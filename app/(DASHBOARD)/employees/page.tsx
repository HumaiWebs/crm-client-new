"use client";

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
import { DownloadIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent } from "react";
import { RQKeys } from "../../../app_data_store/react-query-keys";
import { CSVLink } from "react-csv";
import { TEmployee } from "@/@types/employees";

export default function EmployeesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get("page") || 1;
  const pageSize = searchParams.get("pageSize") || 10;

  const { isFetching, data } = useQuery<TEmployee[]>({
    queryKey: [RQKeys.EMPLOYEES["RQ_GET-EMPLOYEES_ADMIN"], page],
    async queryFn() {
      return (await http.get(`employee?page=${page}&pageSize=${pageSize}`)).data
        .data;
    },
  });

  // INFO: employees search

  const query = searchParams.get("query") || "";
  const { data: searchResults, isFetching: searching } = useQuery<TUser[]>({
    queryKey: ["search-employees_admin", query],
    async queryFn() {
      const result = (await http.get(`/user/search?search=${query}`)).data
        .users;
      router.push(`/employees?query=${query}&pageSize=${result.length}`);
      return result;
    },
    enabled: query.length > 0,
  });

  function handleSearchInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setTimeout(() => {
      router.push(`/employees?query=${value}`);
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
        <div className="w-full flex justify-between">
          <h3 className="font-semibold text-xl text-primary">All Employees</h3>
          <div>{/* <EmployeeCrud create /> */}</div>
        </div>
        <div className="w-full gap-4 flex items-center">
          <Input
            onChange={handleSearchInputChange}
            className="flex-1 text-lg p-2 bg-white"
            placeholder="Search employees...."
          />
          <CSVLink
            data={query.length === 0 ? data ?? [] : searchResults ?? []}
            headers={csvHeaders}
            filename={`${new Date().toLocaleDateString()}-employees.csv`}
          >
            <DownloadIcon className="text-primary" />
          </CSVLink>
        </div>
      </div>

      {isFetching || searching ? (
        <div className="my-8 w-full flex justify-center items-center">
          <Loader size="md" message="Loading employees....." />
        </div>
      ) : (
        <Table className="my-8 data_table">
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-primary bg-primary/5">
                Image
              </TableHead>
              <TableHead className="font-semibold text-primary bg-primary/5 p-2">
                Name
              </TableHead>
              <TableHead className="font-semibold text-primary bg-primary/5 p-2">
                Email
              </TableHead>
              <TableHead className="font-semibold text-primary bg-primary/5 p-2">
                Phone
              </TableHead>
              <TableHead className="font-semibold text-primary bg-primary/5 p-2">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(query.length === 0 ? data : searchResults)?.map((employee) => {
              return (
                <TableRow key={employee._id} className="border-b-none">
                  <TableCell className="p-2 bg-white">
                    <div className="w-[50px] h-[50px] rounded-full bg-slate-100"></div>
                  </TableCell>
                  <TableCell className="p-2 bg-white">
                    {employee.name}
                  </TableCell>
                  <TableCell className="p-2 bg-white">
                    {employee.email}
                  </TableCell>
                  <TableCell className="p-2 bg-white">N/A</TableCell>
                  <TableCell className="p-2 bg-white">
                    <div className="flex gap-2 items-center">
                      {/* <EmployeeDetailsModal employeeId={employee._id} />
                      <EmployeeCrud edit employee_id={employee._id} />
                      <DeleteEmployee
                        employee_id={employee._id}
                        employee_name={employee.name}
                      /> */}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
      {isFetching ? <Loader /> : data && <Pagination totalPages={1} />}
    </section>
  );
}
