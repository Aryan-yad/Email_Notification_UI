import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Calendar, Clock, Mail } from "lucide-react";

interface AddEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (eventData: {
    title: string;
    description: string;
    eventDate: string;
    eventTime: string;
    recipients: string;
  }) => void;
}

export function AddEventDialog({ open, onOpenChange, onSubmit }: AddEventDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    eventTime: "",
    recipients: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      title: "",
      description: "",
      eventDate: "",
      eventTime: "",
      recipients: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = 
    formData.title.trim() !== "" &&
    formData.description.trim() !== "" &&
    formData.eventDate !== "" &&
    formData.eventTime !== "" &&
    formData.recipients.trim() !== "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            Add New Event
          </DialogTitle>
          <DialogDescription>
            Create a new event and schedule email notifications for recipients.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div>
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Team Meeting Reminder"
              required
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="description">Event Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide details about the event..."
              required
              rows={3}
              className="mt-1.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Event Date *
              </Label>
              <Input
                id="eventDate"
                name="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="eventTime" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Event Time *
              </Label>
              <Input
                id="eventTime"
                name="eventTime"
                type="time"
                value={formData.eventTime}
                onChange={handleChange}
                required
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="recipients" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Recipients *
            </Label>
            <Input
              id="recipients"
              name="recipients"
              type="text"
              value={formData.recipients}
              onChange={handleChange}
              placeholder="email1@example.com, email2@example.com"
              required
              className="mt-1.5"
            />
            <p className="text-sm text-gray-500 mt-1">
              Separate multiple emails with commas
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Save Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}