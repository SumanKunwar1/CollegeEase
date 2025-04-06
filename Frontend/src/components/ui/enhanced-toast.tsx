"use client";

import type React from "react";
import { useState } from "react";

type ToastVariant = "default" | "destructive" | "success";

type EnhancedToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
  id?: string;
  variant?: ToastVariant;
};

export function useEnhancedToast() {
  const [toasts, setToasts] = useState<EnhancedToastProps[]>([]);

  const toast = (props: EnhancedToastProps) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { variant: "default" as ToastVariant, ...props, id };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    if (props.duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id)
        );
      }, props.duration || 5000);
    }

    return {
      id,
      dismiss: () =>
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id)
        ),
      update: (props: EnhancedToastProps) => {
        setToasts((prevToasts) =>
          prevToasts.map((toast) =>
            toast.id === id ? { ...toast, ...props } : toast
          )
        );
      },
    };
  };

  return {
    toast,
    toasts,
    dismiss: (toastId?: string) => {
      if (toastId) {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== toastId)
        );
      } else {
        setToasts([]);
      }
    },
  };
}

export type { EnhancedToastProps };