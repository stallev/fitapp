import "server-only";

import { TRAINER_STATUSES } from "@pulse/domain";
import { getPrisma } from "@pulse/db";

import type { AdminNavBadges } from "@/lib/nav/nav-config";

const PENDING_TRAINER_STATUS = TRAINER_STATUSES[0];

export async function getAdminNavBadges(): Promise<AdminNavBadges> {
  try {
    const prisma = getPrisma();
    const [pendingTrainers, openComplaints, pendingRefunds] = await Promise.all([
      prisma.trainerProfile.count({
        where: { status: PENDING_TRAINER_STATUS },
      }),
      prisma.complaint.count({
        where: { status: "open" },
      }),
      prisma.refundRequest.count({
        where: { status: "pending" },
      }),
    ]);

    return {
      pendingTrainers,
      openComplaints,
      pendingRefunds,
    };
  } catch {
    return {};
  }
}
