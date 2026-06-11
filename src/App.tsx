import { useEffect, useMemo, useState } from "react";
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
  const [isUnlocked, setIsUnlocked] = useState(false);
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
      {isUnlocked ? (
        <GameScreen />
      ) : (
        <LockScreen
          dateText={dateText}
          onUnlock={() => setIsUnlocked(true)}
          timeText={timeText}
        />
      )}
    </NoodlePhone>
  );
}

function LockScreen({
  dateText,
  onUnlock,
  timeText,
}: {
  dateText: string;
  timeText: string;
  onUnlock: () => void;
}) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,_rgba(255,209,102,0.34),_transparent_20%),radial-gradient(circle_at_80%_18%,_rgba(110,213,255,0.18),_transparent_24%),linear-gradient(180deg,_rgba(28,17,14,0.18)_0%,_rgba(8,14,18,0.1)_34%,_rgba(4,8,11,0.55)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[58%] bg-[linear-gradient(180deg,_rgba(255,229,168,0.08)_0%,_transparent_100%)]" />

      <header className="safe-top-offset absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-3 text-[13px] font-medium text-white/90">
        <span>chat-de-choco-tto</span>
        <div className="flex items-center gap-2 text-[12px] text-white/80">
          <span>5G</span>
          <span>100%</span>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-between px-5 pb-6 pt-20 text-center">
        <div className="space-y-2">
          <p className="text-sm tracking-[0.18em] text-white/70">{dateText}</p>
          <h1 className="text-[5rem] font-black leading-none tracking-[-0.08em] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
            {timeText}
          </h1>
          <p className="text-sm text-white/70">ホーム画面を押してロック解除</p>
        </div>

        <div className="w-full max-w-[330px] space-y-4">
          <div className="rounded-[32px] border border-white/12 bg-black/25 px-5 py-5 text-left shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#ffd98f]">
              Noodle Game
            </p>
            <h2 className="mt-2 text-4xl font-black leading-none tracking-[-0.08em] text-[#fff7db]">
              chat
              <br />
              de choco-tto
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/78">
              3分で終わる、チャット画面を操作する短編ゲーム。
            </p>
          </div>

          <button
            className="flex w-full items-center justify-between rounded-[28px] border border-white/14 bg-white/10 px-5 py-4 text-left text-white shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-md transition hover:bg-white/14 active:scale-[0.99]"
            onClick={onUnlock}
            type="button"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#a8dfc4]">
                Start
              </p>
              <p className="mt-1 text-base font-semibold text-[#fff8dc]">
                ホーム画面を押す
              </p>
            </div>
            <span className="rounded-full bg-[#f4c15d] px-4 py-2 text-xs font-bold text-[#2b2210]">
              Unlock
            </span>
          </button>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="h-1.5 w-28 rounded-full bg-white/25" />
          <div className="h-14 w-14 rounded-full border border-white/20 bg-white/10 shadow-[inset_0_1px_10px_rgba(255,255,255,0.06)]" />
        </div>
      </div>
    </>
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
