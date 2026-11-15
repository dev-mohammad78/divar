
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const HomeCTA = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 md:p-10">

        <div className="flex flex-col items-start gap-5">
          <span className="text-sm font-semibold text-[var(--color-primary)]">
            فرصت جدید برای خرید و فروش
          </span>

          <h2 className="text-2xl font-extrabold leading-relaxed text-[var(--text-primary)] md:text-4xl">
            وسیله‌ای داری که دیگه بهش نیاز نداری؟
          </h2>

          <p className="text-sm leading-8 text-[var(--text-secondary)]">
            آگهی خودت رو ثبت کن و خیلی راحت به خریدارهای جدید برسونش.
          </p>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-3 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            ثبت رایگان آگهی
            <FiArrowLeft size={20} />
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <img
            src="https://atollmart.com/uploads/banners/explore_1_6a1658e95b8309.18098328.png"
            alt="مجموعه‌ای از محصولات مختلف"
            className="h-64 w-full object-cover md:h-80"
          />
        </div>

      </div>
    </section>
  );
};

export default HomeCTA;
