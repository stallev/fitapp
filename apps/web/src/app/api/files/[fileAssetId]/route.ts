import { NextResponse } from "next/server";

import { createPresignedReadUrlForFileAsset } from "@/data/file-asset/presign-read.server";

type RouteContext = {
  params: Promise<{ fileAssetId: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<NextResponse> {
  const { fileAssetId } = await context.params;

  const presignedUrl = await createPresignedReadUrlForFileAsset(fileAssetId);
  if (!presignedUrl) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  return NextResponse.redirect(presignedUrl, { status: 307 });
}
