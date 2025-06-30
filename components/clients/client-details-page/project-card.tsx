import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import { TProject } from "@/type";
import { Globe, Badge, CalendarDays } from "lucide-react";

export default function ProjectCard({ project }: { project: TProject}) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <CardTitle className="text-lg font-bold text-gray-900 line-clamp-1">
              {project.companyName}
            </CardTitle>
            <div className="flex items-center gap-2 text-gray-600">
              <Globe className="h-3 w-3 flex-shrink-0" />
              <span className="text-xs truncate">{project.name}</span>
            </div>
            <Badge
              className={`${getStatusColor(
                project.status
              )} text-xs font-medium px-2 py-1 w-fit`}
            >
              {project.status}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Client Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-semibold text-xs">
              {project.client.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-gray-900 text-sm truncate">
              {project.client.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {project.client.email}
            </p>
          </div>
        </div>

        <Separator />

        {/* Project Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Category</span>
            <span className="font-medium text-gray-900">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CalendarDays className="h-3 w-3" />
            <span>
              {formatDate(project.startDate)} - {formatDate(project.endDate)}
            </span>
          </div>
        </div>

        <Separator />

        {/* Financial Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-500 mb-1">Total</p>
            <p className="font-bold text-gray-900 text-sm">
              {formatCurrency(project.totalAmount, project.currency)}
            </p>
          </div>
          <div className="text-center p-2 bg-green-50 rounded">
            <p className="text-xs text-gray-500 mb-1">Paid</p>
            <p className="font-bold text-green-600 text-sm">
              {formatCurrency(project.depositedAmount, project.currency)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
