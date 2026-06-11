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
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,193,93,0.2),_transparent_35%),linear-gradient(160deg,_#101718_0%,_#20303a_45%,_#13211b_100%)] px-5 py-6 text-[#fff8dc] md:px-8 md:py-8">
      <div className="mx-auto grid max-w-6xl gap-6">
        <section className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[#9fd5bc]">
            Tauri + React + Tailwind v4
          </p>
          <h1 className="text-5xl font-black leading-none tracking-[-0.05em] md:text-7xl">
            chat-de-choco-tto
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-[#d8e7dd] md:text-base">
            チャット画面をそのまま遊び場にする、3分で終わるヌードルゲーム。
            React で UI をそのまま育てられるように、最初の画面もチャット寄りで置いてあります。
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-[28px] border border-white/12 bg-black/25 p-3 shadow-[0_28px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-4">
            <div className="rounded-[22px] border border-white/10 bg-[#101b1f]/90">
              <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#8ebca7]">
                    Live Chat
                  </p>
                  <h2 className="text-lg font-semibold text-[#fff7db]">
                    配信前チャンネル
                  </h2>
                </div>
                <div className="rounded-full border border-[#f4c15d]/30 bg-[#f4c15d]/15 px-3 py-1 text-xs text-[#ffe5a3]">
                  02:59
                </div>
              </header>

              <div className="space-y-4 px-4 py-4">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={`flex ${message.side === "right" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-lg ${
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

              <footer className="border-t border-white/10 px-4 py-4">
                <div className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/5 p-3">
                  <button className="rounded-full bg-[#28443d] px-3 py-2 text-xs font-semibold text-[#d7efe1] transition hover:bg-[#33564c]">
                    + Stamp
                  </button>
                  <input
                    className="min-w-0 flex-1 bg-transparent text-sm text-[#fff8dc] outline-none placeholder:text-[#8ba399]"
                    placeholder="ここが入力欄。あとでゲーム操作に変える"
                    readOnly
                  />
                  <button className="rounded-full bg-[#f4c15d] px-4 py-2 text-xs font-bold text-[#2a2212] transition hover:bg-[#ffd97d]">
                    Send
                  </button>
                </div>
              </footer>
            </div>
          </div>

          <aside className="space-y-4">
            <section className="rounded-[24px] border border-white/12 bg-white/6 p-4 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-[#9fd5bc]">
                Core Loop
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#ebf2ea]">
                <li>並べ替えで会話の流れを変える</li>
                <li>伏字や候補変換で意味をずらす</li>
                <li>3分以内にゴール会話へ着地させる</li>
              </ul>
            </section>

            <section className="rounded-[24px] border border-[#f4c15d]/18 bg-[#f4c15d]/8 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[#ffe09a]">
                Why React
              </p>
              <p className="mt-3 text-sm leading-6 text-[#fff4cf]">
                チャット UI、状態分岐、テキスト改ざん、通知演出をコンポーネント単位で組みやすい。
              </p>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default App;
