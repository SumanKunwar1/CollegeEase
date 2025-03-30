"use client";

import { useToast } from "./use-toast";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export function Toaster() {
  const { toasts, dismiss } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-[420px] w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white border rounded-md shadow-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-1"
        >
          <div className="flex-1">
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            {toast.description && (
              <div className="text-sm text-gray-500">{toast.description}</div>
            )}
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
