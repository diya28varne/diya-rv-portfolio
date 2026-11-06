"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/lib/content";

type Tab = "chat" | "voice" | "history";

type HistoryItem = {
  id: string;
  preview: string;
  at: number;
  messages: UIMessage[];
};

const STORAGE_KEY = "diya-ai-history-v1";

type SpeechRec = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: { results?: ArrayLike<ArrayLike<{ transcript?: string }>> }) => void) | null;
  onerror: ((event?: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function messageText(m: UIMessage) {
  if (!m?.parts?.length) return "";
  return m.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("")
    .trim();
}

function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HistoryItem[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(items: HistoryItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 20)));
}

export function PortfolioGuide() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("chat");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [listening, setListening] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [voiceHint, setVoiceHint] = useState("Tap the mic, allow the browser mic, then ask anything about the portfolio.");
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "listening" | "talking">("idle");
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);
  const timerRef = useRef<number | null>(null);
  const speakAfterRef = useRef(false);
  const wasBusyRef = useRef(false);
  const savedSigRef = useRef("");

  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, setMessages, error: chatError } = useChat({
    transport,
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    if (!open || tab !== "chat") return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, [open, tab]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, tab, busy]);

  useEffect(() => {
    if (chatError) setError(chatError.message || "Something went wrong. Try again.");
  }, [chatError]);

  useEffect(() => {
    const finished = wasBusyRef.current && !busy;
    wasBusyRef.current = busy;
    if (!finished || messages.length < 2) return;
    const firstUser = messages.find((m) => m.role === "user");
    const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
    if (!firstUser || !lastAssistant || !messageText(lastAssistant)) return;
    const sig = `${messageText(firstUser)}::${messageText(lastAssistant)}`;
    if (sig === savedSigRef.current) return;
    savedSigRef.current = sig;
    const item: HistoryItem = {
      id: `h-${Date.now()}`,
      preview: messageText(firstUser).slice(0, 72) || "Chat",
      at: Date.now(),
      messages: structuredClone(messages),
    };
    setHistory((prev) => {
      const next = [item, ...prev].slice(0, 20);
      saveHistory(next);
      return next;
    });
  }, [busy, messages]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      if (timerRef.current) window.clearInterval(timerRef.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  async function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setError("");
    setTab("chat");
    setInput("");
    try {
      await sendMessage({ text: trimmed });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send. Try again.");
    }
  }

  function jump(hash: string, prompt: string) {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    void ask(prompt);
  }

  function startVoice() {
    const w = window as Window & {
      SpeechRecognition?: new () => SpeechRec;
      webkitSpeechRecognition?: new () => SpeechRec;
    };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      setVoiceHint("Voice needs Chrome or Edge. Use Chat and type instead.");
      setTab("chat");
      void ask("Tell me about your projects");
      return;
    }

    window.speechSynthesis?.cancel();
    const rec = new SR();
    recognitionRef.current = rec;
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.continuous = false;
    setListening(true);
    setVoiceStatus("listening");
    setVoiceHint("Listening… speak now.");
    setVoiceSeconds(0);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => setVoiceSeconds((s) => s + 1), 1000);

    rec.onresult = (event) => {
      const said = event.results?.[0]?.[0]?.transcript?.trim();
      if (!said) return;
      speakAfterRef.current = true;
      setVoiceStatus("talking");
      setVoiceHint(`You said: “${said}”`);
      setTab("chat");
      void ask(said);
    };
    rec.onerror = (event) => {
      setListening(false);
      setVoiceStatus("idle");
      if (timerRef.current) window.clearInterval(timerRef.current);
      const code = event?.error || "error";
      if (code === "not-allowed") {
        setVoiceHint("Mic blocked. Allow microphone for this site, then try again.");
      } else if (code === "no-speech") {
        setVoiceHint("No speech heard. Tap the mic and try again.");
      } else {
        setVoiceHint("Voice failed. Tap the mic again, or use Chat.");
      }
    };
    rec.onend = () => {
      setListening(false);
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (voiceStatus === "listening") setVoiceStatus("idle");
    };

    try {
      rec.start();
    } catch {
      setListening(false);
      setVoiceStatus("idle");
      setVoiceHint("Could not start the mic. Refresh and try again.");
    }
  }

  function stopVoice() {
    recognitionRef.current?.stop();
    setListening(false);
    setVoiceStatus("idle");
    speakAfterRef.current = false;
    if (timerRef.current) window.clearInterval(timerRef.current);
    window.speechSynthesis?.cancel();
    setVoiceHint("Stopped. Tap the mic to ask again.");
  }

  useEffect(() => {
    if (!speakAfterRef.current || busy) return;
    const last = [...messages].reverse().find((m) => m.role === "assistant");
    const text = last ? messageText(last) : "";
    if (!text || !window.speechSynthesis) {
      speakAfterRef.current = false;
      setVoiceStatus("idle");
      return;
    }
    speakAfterRef.current = false;
    const utter = new SpeechSynthesisUtterance(text);
    utter.onend = () => setVoiceStatus("idle");
    setVoiceStatus("talking");
    window.speechSynthesis.speak(utter);
  }, [busy, messages]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 bottom-4 z-[70] flex items-center gap-2 rounded-full border border-white/15 bg-[rgba(8,11,16,0.92)] px-3.5 py-2.5 text-sm text-ivory shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:border-white/30 sm:right-6 sm:bottom-6"
        aria-label="Open Diya AI portfolio guide"
      >
        <img src="/me/diya.jpg?v=7" alt="" className="size-8 rounded-full object-cover" />
        <span className="pr-1 font-medium tracking-tight">
          Diya AI
          <span className="ml-1.5 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-[#0a0c12]">
            AI
          </span>
        </span>
      </button>

      {open ? (
        <div className="pointer-events-none fixed inset-0 z-[80] flex items-end justify-end p-3 sm:p-6">
          <button
            type="button"
            className="pointer-events-auto absolute inset-0 bg-black/50"
            aria-label="Close guide backdrop"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-label="Diya AI portfolio guide"
            className="panel pointer-events-auto relative flex h-[min(34rem,86vh)] w-full max-w-[22.5rem] flex-col overflow-hidden bg-[rgba(8,11,16,0.94)] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-3.5 py-3">
              <img src="/me/diya.jpg?v=7" alt="" className="size-11 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-[0.95rem] font-semibold tracking-tight text-ivory">
                  Diya AI
                  <span className="rounded-md bg-white px-1.5 py-0.5 text-[9px] font-bold tracking-[0.1em] text-[#0a0c12]">
                    AI
                  </span>
                </p>
                <p className="text-xs text-ivory/55">Portfolio guide</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-ivory"
                aria-label="Close"
              >
                ×
              </button>
            </header>

            <div className="flex min-h-0 flex-1 flex-col">
              {tab === "chat" ? (
                <div className="flex min-h-0 flex-1 flex-col">
                  <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3.5 py-4">
                    {messages.length === 0 ? (
                      <div className="space-y-3 text-[0.95rem] leading-relaxed text-ivory/85">
                        <p>
                          Hi! I&apos;m <strong className="text-white">Diya</strong>, an{" "}
                          <strong className="text-white">AI Agent</strong> and{" "}
                          <strong className="text-white">Portfolio Guide</strong>. How may I assist you?
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-ivory transition hover:border-white/45 hover:bg-white/5"
                            onClick={() => jump("#work", "Explore projects")}
                          >
                            Explore projects
                          </button>
                          <button
                            type="button"
                            className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-ivory transition hover:border-white/45 hover:bg-white/5"
                            onClick={() => void ask("Learn more about Diya")}
                          >
                            Learn more
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {messages.map((m) => {
                      const text = messageText(m);
                      if (!text && m.role === "assistant" && busy) return null;
                      return (
                        <div
                          key={m.id}
                          className={`max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                            m.role === "user"
                              ? "ml-auto border border-white/15 bg-white text-[#0a0c12]"
                              : "border border-white/10 bg-white/[0.06] text-ivory/90"
                          }`}
                        >
                          {text || (m.role === "assistant" ? "…" : "")}
                        </div>
                      );
                    })}
                    {busy ? <p className="text-xs text-signal-deep">Thinking…</p> : null}
                    {error ? <p className="text-xs text-red-300">{error}</p> : null}
                  </div>

                  <form
                    className="border-t border-white/10 px-3 py-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      void ask(input);
                    }}
                  >
                    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-2.5 py-1.5">
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type here"
                        autoComplete="off"
                        className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm text-white caret-white outline-none placeholder:text-ivory/40"
                      />
                      <button
                        type="submit"
                        disabled={!input.trim() || busy}
                        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0a0c12] disabled:opacity-35"
                        aria-label="Send"
                      >
                        ↗
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}

              {tab === "voice" ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                  <p className="kicker">Voice</p>
                  <div className="relative">
                    <div className="absolute inset-[-10px] rounded-full border border-white/15" />
                    <img
                      src="/me/diya.jpg?v=7"
                      alt=""
                      className="size-28 rounded-full object-cover ring-2 ring-white/25"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {profile.name.split(" ")[0]}{" "}
                      <span className="ml-1 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-bold tracking-[0.08em] text-[#0a0c12]">
                        AI
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-ivory/55">Portfolio guide</p>
                  </div>
                  <p className="text-sm text-ivory/70">
                    {voiceStatus === "listening"
                      ? `Listening… 00:${String(voiceSeconds).padStart(2, "0")}`
                      : voiceStatus === "talking"
                        ? "Talking…"
                        : voiceHint}
                  </p>
                  <button
                    type="button"
                    onClick={listening ? stopVoice : startVoice}
                    className={`flex size-14 items-center justify-center rounded-full text-[#0a0c12] ${
                      listening ? "bg-signal-deep" : "bg-white"
                    }`}
                    aria-label={listening ? "Stop listening" : "Start voice"}
                  >
                    {listening ? "■" : "≋"}
                  </button>
                </div>
              ) : null}

              {tab === "history" ? (
                <div className="min-h-0 flex-1 overflow-y-auto px-3.5 py-4">
                  {history.length === 0 ? (
                    <p className="text-sm text-ivory/55">
                      No chats yet. Send a message in Chat, then it will show up here.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {history.map((h) => (
                        <li key={h.id}>
                          <button
                            type="button"
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left transition hover:border-white/25"
                            onClick={() => {
                              setMessages(h.messages);
                              setTab("chat");
                            }}
                          >
                            <p className="truncate text-sm text-ivory">{h.preview}</p>
                            <p className="mt-1 text-[11px] text-ivory/40">
                              {new Date(h.at).toLocaleString()}
                            </p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null}
            </div>

            <nav className="grid grid-cols-3 border-t border-white/10 bg-black/30 px-2 pt-2 pb-2 text-center text-[11px] text-ivory/55">
              {(
                [
                  ["chat", "Chat", "💬"],
                  ["voice", "Voice", "≋"],
                  ["history", "History", "◔"],
                ] as const
              ).map(([id, label, icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`relative flex flex-col items-center gap-1 rounded-lg py-2 ${
                    tab === id ? "text-ivory" : "hover:text-ivory/80"
                  }`}
                >
                  {tab === id ? (
                    <span className="absolute top-0 h-0.5 w-8 rounded-full bg-white" />
                  ) : null}
                  <span aria-hidden>{icon}</span>
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
