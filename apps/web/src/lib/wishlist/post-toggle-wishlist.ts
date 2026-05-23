import type { MutationResult, ToggleWishlistInput } from "@pulse/domain";

import { resilientPostFetch } from "@/lib/ui/resilient-post-fetch";

export type ToggleWishlistResponse = MutationResult<{ isWishlisted: boolean }>;

export async function postToggleWishlist(
  input: ToggleWishlistInput,
): Promise<ToggleWishlistResponse> {
  const response = await resilientPostFetch("/api/client/wishlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`Wishlist toggle failed with status ${response.status}`);
  }

  return (await response.json()) as ToggleWishlistResponse;
}
