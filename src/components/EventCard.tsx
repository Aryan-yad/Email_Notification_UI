import { Calendar, Clock, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import type { Event } from "../App";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const isSuccess = event.status === "success";
  const isPending = event.status === "pending";

  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg mb-1">{event.title}</h3>
          <p className="text-gray-600 text-sm">{event.description}</p>
        </div>
        <div className="ml-4">
          {isSuccess && (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Success
            </Badge>
          )}
          {isPending && (
            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200">
              <AlertCircle className="w-3 h-3 mr-1" />
              Pending
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{new Date(event.eventDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{event.eventTime}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Mail className="w-4 h-4" />
          <span className="truncate max-w-[300px]">{event.recipients}</span>
        </div>
      </div>

      {isPending && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full animate-pulse w-2/3"></div>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
}
