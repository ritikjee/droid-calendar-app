import { Navbar } from "./components/navbar"
import { CalendarView } from "./components/calendar-view"
import { DayPlan } from "./components/day-plan"
import { UpcomingEvents } from "./components/upcoming-events"

export default function CalendarApp() {
  return (
    (<div className="min-h-screen h-max bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto p-4">
        <div className="grid gap-4 h-[calc(100vh-5rem)] grid-cols-[2fr,400px]">
          <CalendarView />
          <div className="space-y-4 h-full">
            <DayPlan />
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </div>)
  );
}

