"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { jotformAgentConfigured, jotformAgentId } from "@/lib/jotformAgent";

declare global {
  interface Window {
    AgentInitializer?: {
      init: (config: Record<string, unknown>) => void;
    };
  }
}

function initJotformAgent(id: string) {
  if (!window.AgentInitializer || !id) return;
  // Avoid double-init on Fast Refresh.
  if (document.getElementById(`JotformAgent-${id}`)?.childElementCount) return;

  window.AgentInitializer.init({
    agentRenderURL: `https://agent.jotform.com/${id}`,
    rootId: `JotformAgent-${id}`,
    formID: id,
    queryParams: ["skipWelcome=1", "maximizable=1"],
    domain: "https://www.jotform.com",
    isInitialOpen: false,
    isDraggable: false,
    // Match portfolio shade (dark glass / ivory), not lavender.
    background: "linear-gradient(180deg, #141821 0%, #0a0c12 100%)",
    buttonBackgroundColor: "#0a0c12",
    buttonIconColor: "#f7f8fc",
    variant: false,
    customizations: {
      greeting: "Yes",
      greetingMessage: "Hi! How can I assist you?",
      openByDefault: "No",
      pulse: "Yes",
      position: "right",
    },
    isVoice: true,
  });
}

export function JotformGuide() {
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!jotformAgentConfigured || !scriptReady) return;
    initJotformAgent(jotformAgentId);
  }, [scriptReady]);

  if (!jotformAgentConfigured) return null;

  return (
    <>
      <div id={`JotformAgent-${jotformAgentId}`} />
      <Script
        src="https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
    </>
  );
}
