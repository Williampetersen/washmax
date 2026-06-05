const skeletonCards = ["one", "two", "three", "four"];

export default function AdminLoading() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_18%_0%,rgba(91,111,255,0.22),transparent_28rem),linear-gradient(135deg,#07111f_0%,#101a2b_42%,#172338_100%)] px-3 pb-8 pt-3 sm:px-5 sm:pb-10">
      <section className="mx-auto grid max-w-[1480px] gap-4 xl:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden rounded-[1.5rem] border border-white/12 bg-white/[0.075] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl xl:block">
          <div className="h-14 rounded-2xl bg-white/10" />
          <div className="mt-6 grid gap-3">
            {skeletonCards.map((item) => (
              <div key={item} className="h-10 rounded-xl bg-white/8" />
            ))}
          </div>
        </aside>

        <div className="space-y-4">
          <div className="rounded-[1.35rem] border border-white/12 bg-white/[0.08] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
            <div className="h-10 max-w-lg rounded-xl bg-white/10" />
            <div className="mt-4 h-16 rounded-xl bg-white/8" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {skeletonCards.map((item) => (
              <div
                key={item}
                className="h-28 rounded-[1.35rem] border border-white/12 bg-white/[0.08] shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl"
              />
            ))}
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
            <div className="h-72 rounded-[1.35rem] border border-white/12 bg-white/[0.08] shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl" />
            <div className="h-72 rounded-[1.35rem] border border-white/12 bg-white/[0.08] shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl" />
          </div>
        </div>
      </section>
    </main>
  );
}
