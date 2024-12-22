import { Calendar } from "@/components/ui/calendar";
import { useData } from "@/provider/data-provider";

export function CalendarView() {
  const { selectedDate, setSelectedDate } = useData();

  return (
    <div className="space-y-4 h-full flex flex-col">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border flex-1"
      />
    </div>
  );
}
