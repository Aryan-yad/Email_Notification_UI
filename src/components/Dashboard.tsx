
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Plus, Download, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { AddEventDialog } from "./AddEventDialog";
import { EventCard } from "./EventCard";
import { toast } from "sonner@2.0.3";
import * as XLSX from "xlsx";

export interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  eventTime: string;
  recipients: string;
  status: "success" | "pending";
  createdAt: string;
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Team Meeting Reminder",
      description: "Quarterly review meeting with all stakeholders",
      eventDate: "2025-11-25",
      eventTime: "10:00",
      recipients: "team@company.com, manager@company.com",
      status: "success",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Project Deadline Alert",
      description: "Final submission for Project Alpha",
      eventDate: "2025-11-30",
      eventTime: "17:00",
      recipients: "dev@company.com",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  const handleAddEvent = (
    eventData: Omit<Event, "id" | "status" | "createdAt">
  ) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setEvents([newEvent, ...events]);
    setIsAddEventOpen(false);

    toast.success("Event created successfully!", {
      description: "Email notification is pending and will be sent soon.",
    });

    setTimeout(() => {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === newEvent.id ? { ...event, status: "success" } : event
        )
      );

      toast.success("Email notification sent!", {
        description: `Notification for "${newEvent.title}" has been sent successfully.`,
      });
    }, 3000);
  };

  const handleGenerateReport = () => {
    const reportData = events.map((event) => ({
      Title: event.title,
      Description: event.description,
      "Event Date": event.eventDate,
      "Event Time": event.eventTime,
      Recipients: event.recipients,
      Status: event.status.toUpperCase(),
      "Created At": new Date(event.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Events Report");

    const fileName = `NotifyHub_Events_Report_${new Date()
      .toISOString()
      .split("T")[0]}.xlsx`;

    XLSX.writeFile(workbook, fileName);

    toast.success("Report downloaded!", {
      description: `Saved as ${fileName}`,
    });
  };

  const handleLogout = () => {
    localStorage.clear(); // remove user session
    toast.info("Logged out successfully");
    navigate("/", { replace: true }); // go to Landing Page
  };

  const pendingCount = events.filter((e) => e.status === "pending").length;
  const successCount = events.filter((e) => e.status === "success").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xl">NotifyHub</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {userName}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Email Notification Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Manage all your email notifications in one place.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Button
              onClick={() => setIsAddEventOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>

            <Button
              onClick={handleGenerateReport}
              variant="outline"
              disabled={events.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow border">
            <p className="text-sm text-gray-600">Total Events</p>
            <p className="text-3xl mt-1">{events.length}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow border">
            <p className="text-sm text-gray-600">Successful</p>
            <p className="text-3xl mt-1">{successCount}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow border">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-3xl mt-1">{pendingCount}</p>
          </div>
        </div>

        {/* Event List */}
        <div className="bg-white rounded-lg p-6 shadow border">
          <h2 className="text-xl mb-4">Recent Events</h2>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p>No events yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </main>

      <AddEventDialog
        open={isAddEventOpen}
        onOpenChange={setIsAddEventOpen}
        onSubmit={handleAddEvent}
      />
    </div>
  );
}
