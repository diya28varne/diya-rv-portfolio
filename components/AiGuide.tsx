"use client";

import { jotformAgentConfigured } from "@/lib/jotformAgent";
import { JotformGuide } from "./JotformGuide";
import { PortfolioGuide } from "./PortfolioGuide";

/** Jotform when an agent ID is set; otherwise the built-in working Diya AI chat. */
export function AiGuide() {
  if (jotformAgentConfigured) return <JotformGuide />;
  return <PortfolioGuide />;
}
