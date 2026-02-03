"use client";

import { useConfirmStore } from "@/app/store/confirmStore";
import Button from "@/app/components/common/Button";

export default function ConfirmModal() {
  const { isOpen, title, message, onConfirm, onCancel, closeConfirm } =
    useConfirmStore();

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm?.();
    closeConfirm();
  };

  const handleCancel = () => {
    onCancel?.();
    closeConfirm();
  };

  const handleOverlayClick = () => {
    onCancel?.();
    closeConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl w-[90%] max-w-sm p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg text-foreground">{title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" size="sm" onClick={handleCancel}>
            취소
          </Button>
          <Button size="sm" onClick={handleConfirm}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
