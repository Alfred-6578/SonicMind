"use client";

import { toast as sonnerToast } from "sonner";

type ToastInput = string | { title: string; description?: string };

function split(input: ToastInput): {
  title: string;
  description?: string;
} {
  return typeof input === "string" ? { title: input } : input;
}

export const toast = {
  success(input: ToastInput) {
    const { title, description } = split(input);
    return sonnerToast.success(title, { description });
  },
  error(input: ToastInput) {
    const { title, description } = split(input);
    return sonnerToast.error(title, { description });
  },
  info(input: ToastInput) {
    const { title, description } = split(input);
    return sonnerToast.info(title, { description });
  },
  loading(input: ToastInput) {
    const { title, description } = split(input);
    return sonnerToast.loading(title, { description });
  },
};
