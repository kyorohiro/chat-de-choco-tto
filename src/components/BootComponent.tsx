import { useRef, type PointerEvent } from "react";

export type BootNotification = {
  iconSrc?: string;
  iconAlt?: string;
  title: string;
  timeLabel: string;
  message: string;
};

type BootComponentProps = {
  appName: string;
  dateText: string;
  timeText: string;
  onStart: () => void;
  imageSrc?: string;
  imageAlt?: string;
  notifications?: BootNotification[];
};

function BootComponent({
  appName,
  dateText,
  timeText,
  onStart,
  imageSrc,
  imageAlt,
  notifications,
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
      {imageSrc ? (
        <img
          alt={imageAlt ?? `${appName} boot artwork`}
          className="absolute inset-0 h-full w-full object-cover"
          src={imageSrc}
        />
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,_rgba(255,209,102,0.34),_transparent_20%),radial-gradient(circle_at_80%_18%,_rgba(110,213,255,0.18),_transparent_24%),linear-gradient(180deg,_rgba(28,17,14,0.18)_0%,_rgba(8,14,18,0.1)_34%,_rgba(4,8,11,0.55)_100%)]" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.16)_0%,_rgba(0,0,0,0.04)_34%,_rgba(0,0,0,0.36)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[52%] bg-[linear-gradient(180deg,_rgba(255,255,255,0.08)_0%,_transparent_100%)]" />

      <header className="safe-top-offset absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-3 text-[13px] font-medium text-white/90">
        <span>{appName}</span>
        <div className="flex items-center gap-2 text-[12px] text-white/80">
          <span>5G</span>
          <span>100%</span>
        </div>
      </header>

      <div
        className="relative z-10 flex flex-1 touch-pan-y flex-col px-5 pb-6 pt-20 text-center"
        onClick={onStart}
        onPointerCancel={resetPointer}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={resetPointer}
      >
        <div className="pointer-events-none mx-auto space-y-1">
          <p className="text-sm tracking-[0.18em] text-white/72 drop-shadow-[0_6px_24px_rgba(0,0,0,0.32)]">
            {dateText}
          </p>
          <h1 className="text-[5rem] font-black leading-none tracking-[-0.08em] text-white/92 drop-shadow-[0_10px_36px_rgba(0,0,0,0.48)]">
            {timeText}
          </h1>
        </div>

        {notifications ? (
          <div className="mt-6 flex justify-center">
            <div className="flex w-full max-w-[344px] flex-col gap-2">
              {notifications.map((notification, index) => (
                <div
                  key={`${notification.title}-${notification.timeLabel}-${index}`}
                  className="rounded-[24px] border border-white/12 bg-black/30 p-3 text-left shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-white/10">
                      {notification.iconSrc ? (
                        <img
                          alt={notification.iconAlt ?? `${notification.title} icon`}
                          className="h-full w-full object-cover"
                          src={notification.iconSrc}
                        />
                      ) : (
                        <span className="text-lg text-white/80">N</span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-semibold text-white/92">
                          {notification.title}
                        </p>
                        <p className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-white/55">
                          {notification.timeLabel}
                        </p>
                      </div>
                      <p className="mt-1 text-sm leading-5 text-white/72">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="pointer-events-none mt-auto flex flex-col items-center gap-3 pb-1">
          <p className="text-xs text-white/60 drop-shadow-[0_4px_18px_rgba(0,0,0,0.4)]">
            Tap anywhere or swipe up to start
          </p>
          <div className="flex flex-col items-center gap-2 rounded-full border border-white/12 bg-white/10 px-5 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
            <div className="h-1.5 w-16 rounded-full bg-white/60" />
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">
              Swipe Up
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BootComponent;
