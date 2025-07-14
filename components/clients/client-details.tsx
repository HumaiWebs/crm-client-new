import { http } from "@/app/config/axiosClient";
import { TProject } from "@/type";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../global/loader";
import Link from "next/link";
import { Globe } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { getStatusColor } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Button from "../global/button";
import { useRouter } from "next/navigation";
import { RQKeys } from "@/app_data_store/react-query-keys";

export default function ClientDetails({ clientId }: { clientId: string }) {
  const router = useRouter();

  const { data: projects, isFetching } = useQuery<TProject[]>({
    queryKey: [RQKeys.CLIENTS["RQ_PROJECTS-BY-CLIENT_ADMIN"], clientId],
    async queryFn() {
      return (await http.get(`project/${clientId}`)).data;
    },
  });

  return (
    <div className="border-t border-t-primary/20 pt-4">
      {isFetching ? (
        <Loader message="Loading client details" />
      ) : projects?.length === 0 ? (
        <p>No project found for this client</p>
      ) : (
        projects && (
          <div>
            <div className="flex gap-4 items-center">
              <div className="w-[100px] h-[100px] relative border border-secondary rounded-full bg-slate-50"></div>
              <div className="flex flex-col">
                <h2 className="font-semibold text-lg text-secondary">
                  {projects[0].client.name}
                </h2>
                <Link
                  className="text-gray-600 text-sm mt-2"
                  href={"mailto:" + projects[0].client.email}
                >
                  {projects[0].client.email}
                </Link>
                <Link
                  className="text-gray-600 text-sm"
                  href={"tel:" + projects[0].client.phone}
                >
                  {projects[0].client.phone}
                </Link>
              </div>
            </div>
            <div className="py-4 mt-2">
              <h3 className="font-semibold text-lg mb-2 text-primary">
                Projects
              </h3>
              {projects.map((project) => {
                return (
                  <Card className="border-l-4 mb-2 border-l-blue-500">
                    <CardHeader className="py-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-2">
                          <CardTitle className="text-2xl font-bold text-primary">
                            {project.companyName}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-secondary">
                            <Globe className="h-4 w-4" />
                            <span className="text-sm break-all">
                              {project.name}
                            </span>
                          </div>
                        </div>
                        <Badge
                          className={`${getStatusColor(
                            project.status
                          )} font-medium px-3 py-1`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        )
      )}
      <Button
        onClick={() =>
          router.push(`/clients/client-details?clientId=${clientId}`)
        }
        className="float-right"
      >
        View Details
      </Button>
    </div>
  );
}
