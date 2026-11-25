export default function PageLayout({ title, description, children }) {
  return (
    <div className="min-h-[70vh] px-4 py-10 md:px-8">
      <header className="mx-auto mb-10 max-w-4xl text-center">
        <span className="vc-eyebrow">Acción Videoclub</span>
        <h1 className="vc-title mt-3 text-4xl font-black md:text-6xl">{title}</h1>
        <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
          {description}
        </p>
      </header>

      <section className="vc-panel mx-auto max-w-4xl p-6 md:p-10">{children}</section>
    </div>
  );
}
