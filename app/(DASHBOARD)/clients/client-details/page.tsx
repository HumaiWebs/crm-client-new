"use client";

import { http } from "@/app/config/axiosClient";
import { queryClient } from "@/app/store/QueryClientProvider";
import { RQKeys } from "@/app_data_store/react-query-keys";
import { TProject } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ClientDetailsPage() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");

  const { data: projects, isFetching } = useQuery<TProject[]>({
    queryKey: [RQKeys.CLIENTS["RQ_PROJECTS-BY-CLIENT_ADMIN"], clientId],
    async queryFn() {
      return (await http.get(`project/${clientId}`)).data;
    },

  });

  return <div>ClientDetailsPage</div>;
}
