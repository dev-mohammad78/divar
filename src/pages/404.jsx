import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex min-h-[50vh] md:min-h-[70vh] items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <span className="text-8xl font-black tracking-tight text-[var(--color-primary)]">
          404
        </span>

        <h1 className="mt-4 text-xl font-bold text-[var(--text-primary)]">
          صفحه مورد نظر پیدا نشد!
        </h1>

        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
          متأسفانه صفحه‌ای که دنبالش هستید وجود نداره یا ممکنه حذف شده باشه.
        </p>

        <Link
          to="/"
          className="mt-7 rounded-lg bg-[var(--color-primary)] px-6 py-3
          text-sm font-medium text-[var(--text-white)] transition-colors
          hover:bg-[var(--color-primary-hover)]"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
