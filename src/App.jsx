import { CalendarView } from "./components/calendar-view";
import { DayPlan } from "./components/day-plan";
import { Navbar } from "./components/navbar";
import { UpcomingEvents } from "./components/upcoming-events";

function App() {
  return (
    <div className="min-h-screen h-max bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto p-4">
        <div className="grid gap-4 h-[calc(100vh-5rem)] sm:grid-cols-[2fr,400px] grid-cols-1">
          <CalendarView />
          <div className="space-y-4 h-full">
            <DayPlan />
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
