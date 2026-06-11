import { useRef, type PointerEvent, type ReactNode } from "react";

type BootComponentProps = {
  appName: string;
  dateText: string;
  timeText: string;
  onStart: () => void;
  brandLabel: string;
  title: ReactNode;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
};

function BootComponent({
  appName,
  dateText,
  timeText,
  onStart,
  brandLabel,
  title,
  description,
  imageSrc,
  imageAlt,
}: BootComponentProps) {
  const pointerStartYRef = useRef<number | null>(null);
  const hasSwipedRef = useRef(false);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartYRef.current = event.clientY;
    hasSwipedRef.current = false;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartYRef.current === null || hasSwipedRef.current) {
      return;
    }

    const deltaY = pointerStartYRef.current - event.clientY;

    if (deltaY > 64) {
      hasSwipedRef.current = true;
      onStart();
    }
  };

  const resetPointer = () => {
    pointerStartYRef.current = null;
    hasSwipedRef.current = false;
  };

  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,_rgba(255,209,102,0.34),_transparent_20%),radial-gradient(circle_at_80%_18%,_rgba(110,213,255,0.18),_transparent_24%),linear-gradient(180deg,_rgba(28,17,14,0.18)_0%,_rgba(8,14,18,0.1)_34%,_rgba(4,8,11,0.55)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[58%] bg-[linear-gradient(180deg,_rgba(255,229,168,0.08)_0%,_transparent_100%)]" />

      <header className="safe-top-offset absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-3 text-[13px] font-medium text-white/90">
        <span>{appName}</span>
        <div className="flex items-center gap-2 text-[12px] text-white/80">
          <span>5G</span>
          <span>100%</span>
        </div>
      </header>

      <div
        className="relative z-10 flex flex-1 touch-pan-y flex-col items-center justify-between px-5 pb-6 pt-20 text-center"
        onClick={onStart}
        onPointerCancel={resetPointer}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={resetPointer}
      >
        <div className="space-y-2">
          <p className="text-sm tracking-[0.18em] text-white/70">{dateText}</p>
          <h1 className="text-[5rem] font-black leading-none tracking-[-0.08em] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
            {timeText}
          </h1>
          <p className="text-sm text-white/70">タップ または 上にスワイプして開始</p>
        </div>

        <div className="w-full max-w-[330px] space-y-4">
          <div className="overflow-hidden rounded-[32px] border border-white/12 bg-black/25 text-left shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            {imageSrc ? (
              <img
                alt={imageAlt ?? `${appName} boot artwork`}
                className="block aspect-[4/5] w-full object-cover"
                src={imageSrc}
              />
            ) : null}

            <div className="px-5 py-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#ffd98f]">
                {brandLabel}
              </p>
              <div className="mt-2 text-4xl font-black leading-none tracking-[-0.08em] text-[#fff7db]">
                {title}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/78">{description}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-2 rounded-full border border-white/12 bg-white/8 px-5 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.2)] backdrop-blur-md">
            <div className="h-1.5 w-16 rounded-full bg-white/60" />
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">
              Swipe Up
            </p>
          </div>
          <p className="text-xs text-white/55">Tap anywhere to start</p>
        </div>
      </div>
    </>
  );
}

export default BootComponent;
