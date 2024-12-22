import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useData } from "@/provider/data-provider";

export function UpcomingEvents() {
  const { upcomingEvents } = useData();

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div className="space-y-4">
            {upcomingEvents?.map((event, index) => (
              <div key={index} className="space-y-1">
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
                <p className="text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
