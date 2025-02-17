import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  addYears,
  addMonths,
  format,
} from "date-fns";

export function formatRelativeDifference(fromDate: string | Date, compareDate?: Date): string {
  const startDate = new Date(fromDate);
  const now = compareDate ?? new Date();

  const years = differenceInYears(now, startDate);
  const afterYears = addYears(startDate, years);

  const months = differenceInMonths(now, afterYears);
  const afterMonths = addMonths(afterYears, months);
  const days = differenceInDays(now, afterMonths);

  return `${years}y - ${months}m - ${days}d`;
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), "MMM d, yyyy");
}
