import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ExpensesType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// utils/formatUrl.ts
export function removeHttpsPrefix(url: string): string {
  return url.replace(/^https?:\/\//, "");
}

export function calculateTotals(transactions: ExpensesType[] = []) {
  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);

  const balance = totalIncome -totalExpenses;

  return { totalIncome, totalExpenses, balance };
}
