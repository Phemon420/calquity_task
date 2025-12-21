// import { type ClassValue, clsx } from "clsx";
// import { twMerge } from "tailwind-merge";

type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];

/**
 * Merges class names.
 * Standard implementations use clsx and tailwind-merge.
 * This is a lightweight implementation for this standalone component
 * to avoid assuming dependencies are installed.
 */
export function cn(...inputs: ClassValue[]) {
  // Simple implementation that joins truthy values
  return inputs
    .flat()
    .filter(Boolean)
    .join(" ");
}
