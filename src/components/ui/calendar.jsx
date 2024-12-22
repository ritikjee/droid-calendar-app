import { useState } from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "./button";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  return (
    <div
      className={cn(
        "p-3 w-full h-full flex flex-col space-y-4 sm:space-y-6",
        className
      )}
    >
      <DayPicker
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        showOutsideDays={showOutsideDays}
        className="flex-grow"
        classNames={{
          months: "flex flex-col space-y-4 w-full",
          month: "space-y-4",
          caption:
            "flex justify-center pt-1 relative items-center text-center sm:text-left",
          caption_label: "text-sm font-medium",
          nav: "hidden",
          table: "w-full border-collapse space-y-1 text-xs sm:text-sm",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md flex-1 font-normal text-[0.7rem] sm:text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: cn(
            "relative p-0 text-center text-sm flex-1 focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          ),
          day: cn(
            "h-10 w-10 sm:h-12 sm:w-12 p-0 font-normal aria-selected:opacity-100"
          ),
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        {...props}
      />
      {/* Custom navigation buttons */}
      <div className="flex justify-between mt-4 space-x-2 sm:space-x-4">
        <Button
          className="px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-primary-dark"
          onClick={handlePreviousMonth}
        >
          Previous
        </Button>
        <Button
          className="px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-primary-dark"
          onClick={handleNextMonth}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
