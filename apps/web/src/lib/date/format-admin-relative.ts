import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function formatAdminRelativeDate(iso: string): string {
  return formatDistanceToNow(new Date(iso), {
    addSuffix: true,
    locale: ru,
  });
}
