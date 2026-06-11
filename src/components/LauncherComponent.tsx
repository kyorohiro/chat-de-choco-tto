export type LauncherApp = {
  id: string;
  iconSrc?: string;
  iconAlt?: string;
  title: string;
  notificationCount?: number;
};

type LauncherComponentProps = {
  apps: LauncherApp[];
  onLaunch: (appId: string) => void;
};

function LauncherComponent({ apps, onLaunch }: LauncherComponentProps) {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,193,93,0.16),_transparent_28%),linear-gradient(180deg,_#18110f_0%,_#17202d_48%,_#0b1316_100%)]" />

      <div className="relative z-10 flex min-h-full flex-col px-4 pb-6 pt-6 text-[#fff8dc]">
        <header className="px-2">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#9fd5bc]">
            Noodle Launcher
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[#fff7db]">
            Home
          </h1>
        </header>

        <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 px-1">
          {apps.map((app) => (
            <button
              key={app.id}
              className="group flex flex-col items-center gap-2 text-center"
              onClick={() => onLaunch(app.id)}
              type="button"
            >
              <div className="relative flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-white/8 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-md transition group-hover:scale-[1.03] group-hover:bg-white/12">
                {app.iconSrc ? (
                  <img
                    alt={app.iconAlt ?? `${app.title} icon`}
                    className="h-full w-full object-cover"
                    src={app.iconSrc}
                  />
                ) : (
                  <span className="text-2xl font-bold text-white/85">N</span>
                )}

                {app.notificationCount && app.notificationCount > 0 ? (
                  <span className="absolute right-1.5 top-1.5 flex min-h-6 min-w-6 items-center justify-center rounded-full bg-[#ff6b6b] px-1.5 text-[11px] font-bold text-white shadow-[0_8px_24px_rgba(255,107,107,0.45)]">
                    {app.notificationCount > 99 ? "99+" : app.notificationCount}
                  </span>
                ) : null}
              </div>

              <span className="max-w-[88px] text-xs leading-4 text-[#f5f0dc]">
                {app.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default LauncherComponent;
