export const USER_ROLES = ["client", "trainer", "admin"] as const;

export type UserRole = (typeof USER_ROLES)[number];
