
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Bell, Plus, Download, LogOut } from "lucide-react";
// import { Button } from "./ui/button";
// import { AddEventDialog } from "./AddEventDialog";
// import { EventCard } from "./EventCard";
// import { toast } from "sonner@2.0.3";
// import * as XLSX from "xlsx";

// export interface Event {
//   id: string;
//   title: string;
//   description: string;
//   eventDate: string;
//   eventTime: string;
//   recipients: string;
//   status: "success" | "pending";
//   createdAt: string;
// }

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const [events, setEvents] = useState<Event[]>([
//     {
//       id: "1",
//       title: "Team Meeting Reminder",
//       description: "Quarterly review meeting with all stakeholders",
//       eventDate: "2025-11-25",
//       eventTime: "10:00",
//       recipients: "team@company.com, manager@company.com",
//       status: "success",
//       createdAt: new Date().toISOString(),
//     },
//     {
//       id: "2",
//       title: "Project Deadline Alert",
//       description: "Final submission for Project Alpha",
//       eventDate: "2025-11-30",
//       eventTime: "17:00",
//       recipients: "dev@company.com",
//       status: "pending",
//       createdAt: new Date().toISOString(),
//     },
//   ]);

//   const [isAddEventOpen, setIsAddEventOpen] = useState(false);
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const storedName = localStorage.getItem("userName");
//     if (storedName) setUserName(storedName);
//   }, []);

//   const handleAddEvent = (
//     eventData: Omit<Event, "id" | "status" | "createdAt">
//   ) => {
//     const newEvent: Event = {
//       ...eventData,
//       id: Date.now().toString(),
//       status: "pending",
//       createdAt: new Date().toISOString(),
//     };

//     setEvents([newEvent, ...events]);
//     setIsAddEventOpen(false);

//     toast.success("Event created successfully!", {
//       description: "Email notification is pending and will be sent soon.",
//     });

//     setTimeout(() => {
//       setEvents((prev) =>
//         prev.map((event) =>
//           event.id === newEvent.id ? { ...event, status: "success" } : event
//         )
//       );

//       toast.success("Email notification sent!", {
//         description: `Notification for "${newEvent.title}" has been sent successfully.`,
//       });
//     }, 3000);
//   };

//   const handleGenerateReport = () => {
//     const reportData = events.map((event) => ({
//       Title: event.title,
//       Description: event.description,
//       "Event Date": event.eventDate,
//       "Event Time": event.eventTime,
//       Recipients: event.recipients,
//       Status: event.status.toUpperCase(),
//       "Created At": new Date(event.createdAt).toLocaleString(),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(reportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Events Report");

//     const fileName = `NotifyHub_Events_Report_${new Date()
//       .toISOString()
//       .split("T")[0]}.xlsx`;

//     XLSX.writeFile(workbook, fileName);

//     toast.success("Report downloaded!", {
//       description: `Saved as ${fileName}`,
//     });
//   };

//   const handleLogout = () => {
//     localStorage.clear(); // remove user session
//     toast.info("Logged out successfully");
//     navigate("/", { replace: true }); // go to Landing Page
//   };

//   const pendingCount = events.filter((e) => e.status === "pending").length;
//   const successCount = events.filter((e) => e.status === "success").length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                 <Bell className="w-6 h-6 text-blue-600" />
//               </div>
//               <span className="text-xl">NotifyHub</span>
//             </div>

//             <div className="flex items-center gap-4">
//               <span className="text-gray-600">Welcome, {userName}</span>
//               <Button variant="ghost" size="sm" onClick={handleLogout}>
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl mb-2">Email Notification Dashboard</h1>
//           <p className="text-gray-600 mb-6">
//             Manage all your email notifications in one place.
//           </p>

//           <div className="flex gap-4 flex-wrap">
//             <Button
//               onClick={() => setIsAddEventOpen(true)}
//               className="bg-blue-600 hover:bg-blue-700"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Add Event
//             </Button>

//             <Button
//               onClick={handleGenerateReport}
//               variant="outline"
//               disabled={events.length === 0}
//             >
//               <Download className="w-4 h-4 mr-2" />
//               Generate Report
//             </Button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-lg p-6 shadow border">
//             <p className="text-sm text-gray-600">Total Events</p>
//             <p className="text-3xl mt-1">{events.length}</p>
//           </div>

//           <div className="bg-white rounded-lg p-6 shadow border">
//             <p className="text-sm text-gray-600">Successful</p>
//             <p className="text-3xl mt-1">{successCount}</p>
//           </div>

//           <div className="bg-white rounded-lg p-6 shadow border">
//             <p className="text-sm text-gray-600">Pending</p>
//             <p className="text-3xl mt-1">{pendingCount}</p>
//           </div>
//         </div>

//         {/* Event List */}
//         <div className="bg-white rounded-lg p-6 shadow border">
//           <h2 className="text-xl mb-4">Recent Events</h2>

//           {events.length === 0 ? (
//             <div className="text-center py-12">
//               <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p>No events yet</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {events.map((event) => (
//                 <EventCard key={event.id} event={event} />
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       <AddEventDialog
//         open={isAddEventOpen}
//         onOpenChange={setIsAddEventOpen}
//         onSubmit={handleAddEvent}
//       />
//     </div>
//   );
// }


//


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Bell, Plus, Download, LogOut, User } from "lucide-react";
// import { Button } from "./ui/button";
// import { AddEventDialog } from "./AddEventDialog";
// import { EventCard } from "./EventCard";
// import { toast } from "sonner";
// import * as XLSX from "xlsx";
// import { fetchUserEvents, createEvent } from "../api/events";

// export interface Event {
//   id: string;
//   title: string;
//   description: string;
//   eventDate: string;
//   eventTime: string;
//   recipients: string;
//   status: "success" | "pending";
//   createdAt: string;
// }

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [events, setEvents] = useState<Event[]>([]);
//   const [isAddEventOpen, setIsAddEventOpen] = useState(false);
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const storedName = localStorage.getItem("userName");
//     if (storedName) setUserName(storedName);
//     loadEvents();
//   }, []);

//   const loadEvents = async () => {
//     try {
//       const res = await fetchUserEvents();
//       console.log("Fetched events:", res);
      
//       const mapped = Array.isArray(res)
//         ? res.map((e: any) => ({
//             id: String(e.id),
//             title: e.title,
//             description: e.description,
//             eventDate: e.date || e.eventDate,
//             eventTime: e.time || e.eventTime,
//             recipients: Array.isArray(e.recipientEmails)
//               ? e.recipientEmails.join(", ")
//               : e.recipientEmails || "",
//             status: e.approved ? "success" : "pending",
//             createdAt: e.createdAt || new Date().toISOString(),
//           }))
//         : [];
//       setEvents(mapped);
//     } catch (err) {
//       console.error("Failed to fetch events:", err);
//       toast.error("Failed to fetch events from backend");
//     }
//   };

//   const handleAddEvent = async (eventData: {
//     title: string;
//     description: string;
//     date: string;
//     time: string;
//     recipientEmails: string[];
//   }) => {
//     try {
//       console.log("Sending event data:", eventData);
//       await createEvent(eventData);
//       toast.success("Event created successfully!");
//       setIsAddEventOpen(false);
//       await loadEvents();
//     } catch (err: any) {
//       console.error("Error creating event:", err);
//       toast.error(err.response?.data?.message || "Failed to create event");
//     }
//   };

//   const handleGenerateReport = () => {
//     const reportData = events.map((event) => ({
//       Title: event.title,
//       Description: event.description,
//       "Event Date": event.eventDate,
//       "Event Time": event.eventTime,
//       Recipients: event.recipients,
//       Status: event.status.toUpperCase(),
//       "Created At": new Date(event.createdAt).toLocaleString(),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(reportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Events Report");
//     const fileName = `NotifyHub_Events_Report_${new Date()
//       .toISOString()
//       .split("T")[0]}.xlsx`;
//     XLSX.writeFile(workbook, fileName);
//     toast.success("Report downloaded!", { description: `Saved as ${fileName}` });
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     toast.info("Logged out successfully");
//     navigate("/", { replace: true });
//   };

//   const pendingCount = events.filter((e) => e.status === "pending").length;
//   const successCount = events.filter((e) => e.status === "success").length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//                 <Bell className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">NotifyHub</h1>
//                 <p className="text-sm text-gray-500">Event Management</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <User className="w-4 h-4" />
//                 <span>Welcome, {userName || "User"}</span>
//               </div>
//               <Button
//                 onClick={handleLogout}
//                 variant="outline"
//                 className="flex items-center gap-2"
//               >
//                 <LogOut className="w-4 h-4" />
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                 <Bell className="w-6 h-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Events</p>
//                 <p className="text-2xl font-bold text-gray-900">{events.length}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                 <div className="w-6 h-6 bg-green-500 rounded-full"></div>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Success</p>
//                 <p className="text-2xl font-bold text-gray-900">{successCount}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
//                 <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Pending</p>
//                 <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Your Events</h2>
//             <p className="text-gray-600">Manage and track your scheduled events</p>
//           </div>
//           <div className="flex gap-3">
//             <Button
//               onClick={handleGenerateReport}
//               variant="outline"
//               className="flex items-center gap-2"
//             >
//               <Download className="w-4 h-4" />
//               Export Report
//             </Button>
//             <Button
//               onClick={() => setIsAddEventOpen(true)}
//               className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
//             >
//               <Plus className="w-4 h-4" />
//               Add Event
//             </Button>
//           </div>
//         </div>

//         {/* Events Grid */}
//         {events.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {events.map((event) => (
//               <EventCard key={event.id} event={event} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Bell className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
//             <p className="text-gray-500 mb-6">Get started by creating your first event</p>
//             <Button
//               onClick={() => setIsAddEventOpen(true)}
//               className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 mx-auto"
//             >
//               <Plus className="w-4 h-4" />
//               Create Your First Event
//             </Button>
//           </div>
//         )}
//       </main>

//       <AddEventDialog
//         open={isAddEventOpen}
//         onOpenChange={setIsAddEventOpen}
//         onSubmit={handleAddEvent}
//       />
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Plus, Download, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { AddEventDialog } from "./AddEventDialog";
import { EventCard } from "./EventCard";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { fetchUserEvents, createEvent } from "../api/events";

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
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check authentication first - FIXED: Added token check
    const token = localStorage.getItem("token");
    console.log("🏠 Dashboard - Token:", token);
    
    if (!token) {
      console.error("❌ No token found! Redirecting to login...");
      toast.error("Please login again");
      navigate("/login");
      return;
    }

    const storedName = localStorage.getItem("userName");
    console.log("🏠 Dashboard - UserName:", storedName);
    if (storedName) setUserName(storedName);
    
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await fetchUserEvents();
      console.log("Fetched events:", res);
      
      const mapped = Array.isArray(res)
        ? res.map((e: any) => ({
            id: String(e.id),
            title: e.title,
            description: e.description,
            eventDate: e.date || e.eventDate,
            eventTime: e.time || e.eventTime,
            recipients: Array.isArray(e.recipientEmails)
              ? e.recipientEmails.join(", ")
              : e.recipientEmails || "",
            status: e.approved ? "success" : "pending",
            createdAt: e.createdAt || new Date().toISOString(),
          }))
        : [];
      setEvents(mapped);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      toast.error("Failed to fetch events from backend");
    }
  };

  const handleAddEvent = async (eventData: {
    title: string;
    description: string;
    date: string;
    time: string;
    recipientEmails: string[];
  }) => {
    try {
      console.log("Sending event data:", eventData);
      await createEvent(eventData);
      toast.success("Event created successfully!");
      setIsAddEventOpen(false);
      await loadEvents();
    } catch (err: any) {
      console.error("Error creating event:", err);
      toast.error(err.response?.data?.message || "Failed to create event");
    }
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
    toast.success("Report downloaded!", { description: `Saved as ${fileName}` });
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged out successfully");
    navigate("/", { replace: true });
  };

  const pendingCount = events.filter((e) => e.status === "pending").length;
  const successCount = events.filter((e) => e.status === "success").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NotifyHub</h1>
                <p className="text-sm text-gray-500">Event Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Welcome, {userName || "User"}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Success</p>
                <p className="text-2xl font-bold text-gray-900">{successCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Events</h2>
            <p className="text-gray-600">Manage and track your scheduled events</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleGenerateReport}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Button
              onClick={() => setIsAddEventOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first event</p>
            <Button
              onClick={() => setIsAddEventOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Create Your First Event
            </Button>
          </div>
        )}
      </main>

      <AddEventDialog
        open={isAddEventOpen}
        onOpenChange={setIsAddEventOpen}
        onSubmit={handleAddEvent}
      />
    </div>
  );
}