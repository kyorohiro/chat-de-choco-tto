import { useEffect, useState, type ReactNode } from "react";

type NoodlePhoneProps = {
  children: ReactNode;
};

const PHONE_WIDTH = 430;
const PHONE_HEIGHT = 860;
const PHONE_ASPECT = PHONE_WIDTH / PHONE_HEIGHT;
const DESKTOP_FRAME_PADDING_X = 48;
const DESKTOP_FRAME_PADDING_Y = 64;

function NoodlePhone({ children }: NoodlePhoneProps) {
  const [frameSize, setFrameSize] = useState(() => ({
    width: PHONE_WIDTH,
    height: PHONE_HEIGHT,
  }));
  const [isMobileViewport, setIsMobileViewport] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    const updateFrameSize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const isMobile = viewportWidth < 640;

      setIsMobileViewport(isMobile);

      if (isMobile) {
        setFrameSize({
          width: viewportWidth,
          height: viewportHeight,
        });
        return;
      }

      const availableWidth = Math.max(320, viewportWidth - DESKTOP_FRAME_PADDING_X);
      const availableHeight = Math.max(480, viewportHeight - DESKTOP_FRAME_PADDING_Y);
      const viewportAspect = availableWidth / availableHeight;

      if (viewportAspect > PHONE_ASPECT) {
        setFrameSize({
          width: availableHeight * PHONE_ASPECT,
          height: availableHeight,
        });
        return;
      }

      setFrameSize({
        width: availableWidth,
        height: availableWidth / PHONE_ASPECT,
      });
    };

    updateFrameSize();
    window.addEventListener("resize", updateFrameSize);

    return () => {
      window.removeEventListener("resize", updateFrameSize);
    };
  }, []);

  return (
    <main className="h-[100dvh] overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(244,193,93,0.16),_transparent_28%),linear-gradient(180deg,_#17120f_0%,_#161c28_48%,_#0d1517_100%)] px-0 py-0 text-[#fff8dc] sm:px-6 sm:py-8">
      <div className="mx-auto flex h-full items-center justify-center">
        <div
          className="h-full w-full shrink-0"
          style={{
            width: `${frameSize.width}px`,
            height: `${frameSize.height}px`,
          }}
        >
          <div className="h-full overflow-hidden bg-[#05070b] shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:rounded-[42px] sm:border sm:border-white/10 sm:p-3">
            <div
              className="safe-top-pad relative flex h-full flex-col overflow-hidden bg-[#091117] sm:rounded-[34px]"
              style={{
                height: isMobileViewport ? "100dvh" : "100%",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NoodlePhone;
