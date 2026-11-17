import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-10">
      <div
        className="relative overflow-hidden rounded-3xl bg-cover bg-center px-6 py-4 md:py-8 max-h-[300px]"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--bg-primary) 82%, transparent)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold leading-relaxed text-[var(--text-primary)]">
            هر چیزی که دنبالش هستی،
            <span className="text-[var(--color-primary)]"> همین‌جاست</span>
          </h1>

          <p className="mt-2 text-sm leading-8 text-[var(--text-secondary)] md:text-base">
            به‌راحتی آگهی مورد نظرت رو پیدا کن یا وسایلی که دیگه نیاز نداری رو
            برای فروش بذار.
          </p>
          <Link
            to="/posts"
            className="mx-auto mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-[var(--color-primary)] px-8 py-4 font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            <FiSearch size={20} />
            مشاهده همه آگهی‌ها
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
