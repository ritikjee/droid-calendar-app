import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./ui/mode-toggle";
import { useModal } from "@/provider/modal-provider";
import { MODAL_TYPE_ENUM } from "@/constants/modal";

export function Navbar() {
  const { showModal } = useModal();
  return (
    <nav className="flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <Calendar className="h-6 w-6" />
        <span className="text-lg font-semibold">Calendar</span>
      </div>
      <div>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Plus className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                showModal({
                  modalType: MODAL_TYPE_ENUM.ADD_EVENT_MODAL,
                });
              }}
            >
              Add a event
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                showModal({
                  modalType: MODAL_TYPE_ENUM.ADD_CATEGORY_MODAL,
                });
              }}
            >
              Add a category
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                showModal({
                  modalType: MODAL_TYPE_ENUM.VIEW_CATEGORY_MODAL,
                });
              }}
            >
              View all category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
