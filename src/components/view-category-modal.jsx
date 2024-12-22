import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MODAL_TYPE_ENUM } from "@/constants/modal";
import { useData } from "@/provider/data-provider";
import { useModal } from "@/provider/modal-provider";
import { Plus } from "lucide-react";

export function ViewCategoryModal() {
  const { modalStack, hideModal, showModal } = useModal();
  const { categories } = useData();

  return (
    <Dialog
      open={modalStack.some(
        (modal) => modal.modalType === MODAL_TYPE_ENUM.VIEW_CATEGORY_MODAL
      )}
      onOpenChange={hideModal}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Manage Categories</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Categories</DialogTitle>
          <DialogDescription>
            View and manage your categories here.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <Button
            onClick={() =>
              showModal({
                modalType: MODAL_TYPE_ENUM.ADD_CATEGORY_MODAL,
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
          <div className="grid gap-4 sm:grid-cols-2">
            {categories?.map((category) => (
              <Card key={category.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {category.title}
                  </CardTitle>
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {category.description || "No description"}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
