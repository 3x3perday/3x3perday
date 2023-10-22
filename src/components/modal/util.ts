export const MODAL_SIZE = {
  sm: 200,
  md: 300,
  lg: 400,
} as const;

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type modalType = "sm" | "md" | "lg";
