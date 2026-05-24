"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import type { TrainerClientListItem } from "@/data/trainer/list-trainer-clients.server";
import { MESSAGES } from "@/lib/messages";

import { ClientListCard } from "./ClientListCard";

export type TrainerClientsListProps = {
  clients: TrainerClientListItem[];
};

export function TrainerClientsList({ clients }: TrainerClientsListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return clients;
    }

    return clients.filter((client) =>
      client.displayName.toLowerCase().includes(normalized),
    );
  }, [clients, query]);

  return (
    <div className="space-y-4">
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={MESSAGES.trainer.clients.searchPlaceholder}
        aria-label={MESSAGES.trainer.clients.searchAriaLabel}
        className="rounded-full md:max-w-md"
      />
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((client) => (
          <ClientListCard key={client.clientId} client={client} />
        ))}
      </div>
    </div>
  );
}
