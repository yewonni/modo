import { create } from "zustand";

interface ConfirmState {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;

  openConfirm: (params: {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
  }) => void;

  closeConfirm: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,

  openConfirm: ({ title, message, onConfirm, onCancel }) =>
    set({
      isOpen: true,
      title,
      message,
      onConfirm,
      onCancel,
    }),

  closeConfirm: () =>
    set({
      isOpen: false,
      title: undefined,
      message: undefined,
      onConfirm: undefined,
      onCancel: undefined,
    }),
}));
