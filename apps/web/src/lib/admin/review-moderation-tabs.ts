import { MESSAGES } from "@/lib/messages";

export const REVIEW_TAB_VISIBLE = "visible" as const;
export const REVIEW_TAB_HIDDEN = "hidden" as const;

export type ReviewModerationTab =
  | typeof REVIEW_TAB_VISIBLE
  | typeof REVIEW_TAB_HIDDEN;

export type ReviewModerationTabConfig = {
  value: ReviewModerationTab;
  label: string;
  emptyMessage: string;
  isHidden: boolean;
};

export const REVIEW_MODERATION_TABS: ReviewModerationTabConfig[] = [
  {
    value: REVIEW_TAB_VISIBLE,
    label: MESSAGES.admin.reviews.tabs.visible,
    emptyMessage: MESSAGES.admin.reviews.emptyVisible,
    isHidden: false,
  },
  {
    value: REVIEW_TAB_HIDDEN,
    label: MESSAGES.admin.reviews.tabs.hidden,
    emptyMessage: MESSAGES.admin.reviews.emptyHidden,
    isHidden: true,
  },
];

export function resolveReviewTab(
  tabParam: string | undefined,
): ReviewModerationTab {
  return tabParam === REVIEW_TAB_HIDDEN
    ? REVIEW_TAB_HIDDEN
    : REVIEW_TAB_VISIBLE;
}
