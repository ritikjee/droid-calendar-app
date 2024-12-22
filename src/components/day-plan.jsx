import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { useModal } from "@/provider/modal-provider";
import { MODAL_TYPE_ENUM } from "@/constants/modal";
import { useData } from "@/provider/data-provider";
import { cn } from "@/lib/utils";

export function DayPlan() {
  const { showModal } = useModal();
  const { selectedDate, currentDateEvents } = useData();

  const hours = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}:00`
  );

  const isTimeInRange = (time, startTime, endTime) => {
    const [timeHour] = time.split(":").map(Number);
    const [startHour] = startTime.split(":").map(Number);
    const [endHour] = endTime.split(":").map(Number);

    return timeHour >= startHour && timeHour < endHour;
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>
          {new Date(selectedDate).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(50vh-8rem)]">
          <div className="space-y-2">
            {hours.map((hour) => {
              const event = currentDateEvents.find((e) =>
                isTimeInRange(
                  hour,
                  e.startTime || "00:00",
                  e.endTime || "24:00"
                )
              );

              return (
                <div key={hour} className="flex items-start gap-4">
                  <span className="text-sm text-muted-foreground w-12">
                    {hour}
                  </span>
                  {event ? (
                    <div
                      className={cn(
                        "flex-1 rounded-md bg-primary/10 p-3 cursor-pointer"
                      )}
                      onClick={() => {
                        showModal({
                          modalType: MODAL_TYPE_ENUM.ADD_EVENT_MODAL,
                          props: {
                            eventId: event.id,
                          },
                        });
                      }}
                    >
                      <p className="font-medium">{event.title}</p>
                    </div>
                  ) : (
                    <div className="flex-1 h-8"></div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <Button
          className="w-full my-3"
          onClick={() =>
            showModal({
              modalType: MODAL_TYPE_ENUM.ADD_EVENT_MODAL,
            })
          }
        >
          Add Event
        </Button>
      </CardContent>
    </Card>
  );
}
