"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { DemoRolePanel } from "@/components/auth/DemoRolePanel.client";
import { useLoginCredentials } from "@/components/auth/LoginCredentialsProvider.client";
import {
  DEMO_CREDENTIALS,
  isDemoRole,
  type DemoRole,
} from "@/lib/demo/demo-credentials";

export function LoginDemoSection() {
  const searchParams = useSearchParams();
  const demoParam = searchParams.get("demo");
  const { demoRole, setDemoRole, setCredentials } = useLoginCredentials();

  useEffect(() => {
    if (!isDemoRole(demoParam)) {
      return;
    }
    setDemoRole(demoParam);
    setCredentials(DEMO_CREDENTIALS[demoParam]);
  }, [demoParam, setCredentials, setDemoRole]);

  const handleRoleSelect = (role: DemoRole) => {
    setDemoRole(role);
    setCredentials(DEMO_CREDENTIALS[role]);
  };

  return (
    <DemoRolePanel activeRole={demoRole} onRoleSelect={handleRoleSelect} />
  );
}
