import { MODAL_TYPE_ENUM } from "@/constants/modal";
import { useModal } from "@/provider/modal-provider";
import { EventModal } from "./event-modal";
import { CategoryModal } from "./category-modal";
import { ViewCategoryModal } from "./view-category-modal";

const MODAL_COMPONENTS = {
  [MODAL_TYPE_ENUM.ADD_EVENT_MODAL]: EventModal,
  [MODAL_TYPE_ENUM.ADD_CATEGORY_MODAL]: CategoryModal,
  [MODAL_TYPE_ENUM.VIEW_CATEGORY_MODAL]: ViewCategoryModal,
};

export default function RootModal() {
  const { modalStack } = useModal();

  return (
    <>
      {modalStack.map((modal, index) => {
        const ModalComponent = MODAL_COMPONENTS[modal.modalType];
        return ModalComponent ? (
          <ModalComponent key={index} {...modal.props} />
        ) : null;
      })}
    </>
  );
}
