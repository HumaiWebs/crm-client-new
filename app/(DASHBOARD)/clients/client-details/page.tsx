"use client";

import { http } from "@/app/config/axiosClient";
import { queryClient } from "@/app/store/QueryClientProvider";
import { RQKeys } from "@/app_data_store/react-query-keys";
import ProjectCard from "@/components/clients/client-details-page/project-card";
import Loader from "@/components/global/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TProject, TUser } from "@/type";
import { useQuery } from "@tanstack/react-query";
import {
  Building2,
  Clock,
  CheckCircle,
  TrendingUp,
  CreditCard,
  Search,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";

export default function ClientDetailsPage() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");

  const [searchTerm, setSearchTerm] = useState("");

  const { data, isFetching } = useQuery<{
    client: TUser;
    projects: TProject[];
  }>({
    queryKey: [RQKeys.CLIENTS["RQ_PROJECTS-BY-CLIENT_ADMIN"], clientId],
    async queryFn() {
      return (await http.get(`project/${clientId}`)).data;
    },
  });

  const filteredProjects = useMemo(() => {
    return data?.projects?.filter(
      (project) =>
        project.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const stats = useMemo(() => {
    const totalProjects = data?.projects?.length;
    const ongoingProjects = data?.projects?.filter(
      (p) => p.status.toLowerCase() === "on going"
    ).length;
    const completedProjects = data?.projects?.filter(
      (p) => p.status.toLowerCase() === "completed"
    ).length;
    const totalRevenue = data?.projects?.reduce(
      (sum, p) => sum + p.totalAmount,
      0
    );
    const totalPaid = data?.projects?.reduce(
      (sum, p) => sum + p.depositedAmount,
      0
    );

    return {
      totalProjects,
      ongoingProjects,
      completedProjects,
      totalRevenue,
      totalPaid,
      pendingPayment: (totalRevenue || 0) - (totalPaid || 0),
    };
  }, [data?.projects]);

  return isFetching ? (
    <div className="w-full p-4 flex jusitfy-center items-center">
      <Loader message="Loading project data...." />
    </div>
  ) : (
    data && (
      <section>
        <div className="w-full p-4">
          <p className="text-gray-800 font-semibold text-2xl capitalize">
            {data?.client.name} Details
          </p>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Projects
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalProjects}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ongoing</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.ongoingProjects}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Completed
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.completedProjects}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      £{stats.totalRevenue?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
                Financial Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    £{stats.totalRevenue?.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Amount Received
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    £{stats.totalPaid?.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Pending Payment
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    £{stats.pendingPayment.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search projects by company, client, category, or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Projects Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                All Projects ({filteredProjects?.length})
              </h2>
            </div>

            {filteredProjects?.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">
                    No projects found matching your search criteria.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects?.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  );
}
