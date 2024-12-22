import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MODAL_TYPE_ENUM } from "@/constants/modal";
import { cn } from "@/lib/utils";
import { useData } from "@/provider/data-provider";
import { useModal } from "@/provider/modal-provider";

const formSchema = z
  .object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().optional(),
    color: z.optional(z.string()),
    date: z.date({
      required_error: "A date is required.",
    }),
    startTime: z.string({
      required_error: "Start time is required.",
    }),
    endTime: z.string({
      required_error: "End time is required.",
    }),
  })
  .refine(
    (data) => {
      const start = parseInt(data.startTime.split(":")[0]);
      const end = parseInt(data.endTime.split(":")[0]);
      return end > start;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

export function EventModal({ eventId }) {
  const { modalStack, hideModal, showModal } = useModal();
  const { addEvent, categories, events } = useData();

  const event = events.find((event) => event.id === eventId);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      color: event?.color || "",
      date: event?.date || new Date(),
      startTime: event?.startTime || "",
      endTime: event?.endTime || "",
    },
  });

  function onSubmit(values) {
    addEvent(values);
    hideModal();
  }

  const existingEvents = events.some((existingEvent) => {
    return (
      existingEvent.date === form.watch("date") &&
      ((form.watch("startTime") >= existingEvent.startTime &&
        form.watch("startTime") < existingEvent.endTime) ||
        (form.watch("endTime") > existingEvent.startTime &&
          form.watch("endTime") <= existingEvent.endTime) ||
        (form.watch("startTime") <= existingEvent.startTime &&
          form.watch("endTime") >= existingEvent.endTime))
    );
  });

  return (
    <Dialog
      open={modalStack.some(
        (modal) => modal.modalType === MODAL_TYPE_ENUM.ADD_EVENT_MODAL
      )}
      onOpenChange={() => {
        hideModal();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Add Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Create a new event by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Event description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(categoryId) => {
                      const selectedCategory = categories.find(
                        (category) => category.id === categoryId
                      );
                      if (selectedCategory) {
                        field.onChange(selectedCategory.color);
                      }
                    }}
                    defaultValue={field.value?.color}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                      <div
                        className="p-2 cursor-pointer hover:bg-primary/10 text-sm"
                        onClick={() => {
                          showModal({
                            modalType: MODAL_TYPE_ENUM.ADD_CATEGORY_MODAL,
                          });
                        }}
                      >
                        <div className="flex">
                          <PlusIcon className="h-4 w-4 mr-2" />
                          <span>Create new category</span>
                        </div>
                      </div>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select start time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <SelectItem
                            key={hour}
                            value={`${hour.toString().padStart(2, "0")}:00`}
                          >
                            {`${hour.toString().padStart(2, "0")}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select end time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <SelectItem
                            key={hour}
                            value={`${hour.toString().padStart(2, "0")}:00`}
                          >
                            {`${hour.toString().padStart(2, "0")}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              {existingEvents && !eventId && (
                <FormMessage type="error">
                  An event already exists in the selected time range.
                </FormMessage>
              )}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || existingEvents}
              >
                {eventId ? "Update Event" : "Add Event"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

EventModal.propTypes = {
  eventId: PropTypes.string.optional,
};
