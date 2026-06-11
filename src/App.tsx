import { useEffect, useMemo, useState } from "react";
import appChatIconSrc from "./assets/app-chat-de-choco-tto.svg";
import bootArtworkSrc from "./assets/boot-chat-de-choco-tto.svg";
import BootComponent from "./components/BootComponent";
import LauncherComponent from "./components/LauncherComponent";
import NoodlePhone from "./components/NoodlePhone";

const messages = [
  {
    id: 1,
    author: "Manager",
    text: "3分だけ。配信前のチャットをいい感じに整えて。",
    side: "left",
  },
  {
    id: 2,
    author: "Fan_204",
    text: "カップヌードルできる前に返事ほしい",
    side: "left",
  },
  {
    id: 3,
    author: "Idol",
    text: "ちょこっと待って。今ここ、直してる。",
    side: "right",
  },
  {
    id: 4,
    author: "System",
    text: "候補: 伏字 / 並べ替え / スタンプ差し替え",
    side: "left",
  },
] as const;

function App() {
  const [screen, setScreen] = useState<"boot" | "launcher" | "game">("boot");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  const timeText = useMemo(
    () =>
      new Intl.DateTimeFormat("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(now),
    [now],
  );

  const dateText = useMemo(
    () =>
      new Intl.DateTimeFormat("ja-JP", {
        month: "long",
        day: "numeric",
        weekday: "long",
      }).format(now),
    [now],
  );

  return (
    <NoodlePhone>
      {screen === "game" ? (
        <GameScreen />
      ) : screen === "launcher" ? (
        <LauncherComponent
          apps={[
            {
              id: "chat-de-choco-tto",
              iconSrc: appChatIconSrc,
              title: "chat-de-choco-tto",
              notificationCount: 2,
            },
          ]}
          onLaunch={(appId) => {
            console.log("launch app", appId);
            if (appId === "chat-de-choco-tto") {
              setScreen("game");
            }
          }}
        />
      ) : (
        <BootComponent
          appName="chat-de-choco-tto"
          dateText={dateText}
          imageAlt="chat-de-choco-tto title artwork"
          imageSrc={bootArtworkSrc}
          notifications={[
            {
              id: "manager-unread",
              title: "NOODLE",
              timeLabel: "5分前",
              message: "配信前チャンネルで1件の未読メッセージがあります。",
            },
            {
              id: "fan-reply",
              title: "Fan_204",
              timeLabel: "12:00",
              message: "カップヌードルできる前に返事ほしい",
            },
          ]}
          onStart={(action) => {
            console.log("boot action", action);
            setScreen("launcher");
          }}
          timeText={timeText}
        />
      )}
    </NoodlePhone>
  );
}

function GameScreen() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,193,93,0.22),_transparent_32%),linear-gradient(180deg,_#161310_0%,_#1b2332_48%,_#0f1a1d_100%)]" />

      <div className="relative z-10 flex min-h-full flex-col gap-3 px-3 pb-3 pt-4">
        <section className="rounded-[28px] border border-white/10 bg-black/20 px-4 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#9fd5bc]">
                Portrait Chat Game
              </p>
              <h1 className="text-3xl font-black leading-none tracking-[-0.05em]">
                chat-de-choco-tto
              </h1>
              <p className="text-sm leading-6 text-[#d8e7dd]">
                スマホ縦型で遊ぶ、3分で終わるチャット操作ゲーム。
              </p>
            </div>
            <div className="rounded-full border border-[#f4c15d]/25 bg-[#f4c15d]/12 px-3 py-1 text-[11px] text-[#ffe09a]">
              02:59
            </div>
          </div>
        </section>

        <section className="flex flex-1 flex-col overflow-hidden rounded-[32px] border border-white/12 bg-[#0e171d]/88 shadow-[0_32px_100px_rgba(0,0,0,0.36)]">
          <header className="flex items-center justify-between border-b border-white/8 px-4 py-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#83b9a0]">
                Live Chat
              </p>
              <h2 className="truncate text-base font-semibold text-[#fff7db]">
                配信前チャンネル
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              <span className="text-xs text-[#b7d7ca]">online</span>
            </div>
          </header>

          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="space-y-3 overflow-y-auto px-3 py-4">
              {messages.map((message) => (
                <article
                  key={message.id}
                  className={`flex ${message.side === "right" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-[24px] px-4 py-3 text-sm leading-6 shadow-lg ${
                      message.side === "right"
                        ? "bg-[#f4c15d] text-[#2d2410]"
                        : "bg-[#1b2a30] text-[#f5f0dc]"
                    }`}
                  >
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">
                      {message.author}
                    </p>
                    <p>{message.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="border-t border-white/8 bg-black/10 px-3 py-3">
              <div className="mb-3 grid grid-cols-3 gap-2 text-[11px] text-[#d6eadf]">
                <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2">
                  伏字
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2">
                  並べ替え
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2">
                  スタンプ
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-[22px] border border-white/10 bg-white/5 p-2">
                <button className="shrink-0 rounded-full bg-[#28443d] px-3 py-2 text-[11px] font-semibold text-[#d7efe1] transition hover:bg-[#33564c]">
                  + Stamp
                </button>
                <input
                  className="min-w-0 flex-1 bg-transparent px-1 text-sm text-[#fff8dc] outline-none placeholder:text-[#8ba399]"
                  placeholder="入力欄もあとでゲーム化する"
                  readOnly
                />
                <button className="shrink-0 rounded-full bg-[#f4c15d] px-4 py-2 text-[11px] font-bold text-[#2a2212] transition hover:bg-[#ffd97d]">
                  Send
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-[24px] border border-white/10 bg-white/6 p-4 backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#9fd5bc]">
              Goal
            </p>
            <p className="mt-2 text-sm leading-6 text-[#ebf2ea]">
              会話をいじって、3分以内に望む流れへ着地させる。
            </p>
          </div>

          <div className="rounded-[24px] border border-[#f4c15d]/18 bg-[#f4c15d]/8 p-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#ffe09a]">
              Touch First
            </p>
            <p className="mt-2 text-sm leading-6 text-[#fff4cf]">
              片手でも触りやすい縦UIを基準に作る。
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
