// import { useState } from "react";
// import { AddEventDialog } from "./AddEventDialog";
// import { createEvent } from "../api/events";
//
// export default function AddEventPage() {
//   const [open, setOpen] = useState(false);
//
//   const userId = 1; // replace with logged-in user id
//
//   const handleAddEvent = async (data: any) => {
//     try {
//       const response = await createEvent(userId, {
//         title: data.title,
//         description: data.description,
//         eventDate: data.eventDate,
//         eventTime: data.eventTime,
//         recipients: data.recipients,
//       });
//
//       alert("Event created successfully!");
//       console.log(response);
//
//       setOpen(false);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to create event");
//     }
//   };
//
//   return (
//     <div className="p-4">
//       <button
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//         onClick={() => setOpen(true)}
//       >
//         Add Event
//       </button>
//
//       <AddEventDialog
//         open={open}
//         onOpenChange={setOpen}
//         onSubmit={handleAddEvent}
//       />
//     </div>
//   );
// }

//

// import { useState } from "react";
// import { AddEventDialog } from "./AddEventDialog";
// import { createEvent } from "../api/events";

// export default function AddEventPage() {
//   const [open, setOpen] = useState(false);

//   const userId = 1;  // later get from login/JWT

//   const handleAddEvent = async (formData: any) => {
//     try {
//       const response = await createEvent(userId, {
//         title: formData.title,
//         description: formData.description,
//         eventDate: formData.eventDate,
//         eventTime: formData.eventTime,
//         recipients: formData.recipients,
//       });

//       console.log("Event created:", response);
//       alert("Event created! Mail will be sent in 30 seconds.");

//       setOpen(false);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to create event");
//     }
//   };

//   return (
//     <div className="p-4">
//       <button
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//         onClick={() => setOpen(true)}
//       >
//         Add Event
//       </button>

//       <AddEventDialog open={open} onOpenChange={setOpen} onSubmit={handleAddEvent} />
//     </div>
//   );
// }

import { useState } from "react";
import { AddEventDialog } from "./AddEventDialog";
import { createEvent } from "../api/events";
import { toast } from "sonner";

export default function AddEventPage() {
  const [open, setOpen] = useState(false);

  const handleAddEvent = async (payload: {
    title: string;
    description: string;
    date: string;
    time: string;
    recipientEmails: string[];
  }) => {
    try {
      const response = await createEvent(payload);
      console.log("Event created:", response);
      toast.success("Event created successfully!");
      setOpen(false);
    } catch (error: any) {
      console.error("Error creating event:", error);
      toast.error(error.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        onClick={() => setOpen(true)}
      >
        Add Event
      </button>

      <AddEventDialog 
        open={open} 
        onOpenChange={setOpen} 
        onSubmit={handleAddEvent} 
      />
    </div>
  );
}

