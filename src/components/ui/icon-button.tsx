"use client";

import { Button, type ButtonProps } from "./button";

export type IconButtonProps = Omit<ButtonProps, "variant" | "size"> & {
  "aria-label": string;
};

export function IconButton(props: IconButtonProps) {
  return <Button variant="ghost" size="icon" {...props} />;
}
