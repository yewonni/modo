import toast from "react-hot-toast";

const activeToasts = new Set<string>();

export const showToast = (message: string, id: string, duration = 3000) => {
  if (activeToasts.has(id)) return;
  activeToasts.add(id);

  toast(message, {
    duration,
    position: "bottom-center",
    style: { background: "#333", color: "#fff", fontWeight: "normal" },
  });

  setTimeout(() => {
    activeToasts.delete(id);
  }, duration + 100);
};
