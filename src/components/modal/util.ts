export const MODAL_SIZE = {
  sm: 200,
  md: 400,
  lg: 500,
};

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type modalType = "sm" | "md" | "lg";
