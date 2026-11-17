import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../services/admin";

const Footer = () => {
  const { data } = useQuery({
    queryKey: ["footer-categories"],
    queryFn: getCategory,
  });

  const categories = data?.data?.slice(0, 5) || [];

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/divar.svg" alt="لوگو" className="h-10 w-10" />
            </Link>

            <p className="mt-5 max-w-md text-sm leading-8 text-[var(--text-secondary)]">
              اینجا می‌تونی هر چیزی که نیاز نداری رو آگهی کنی یا چیزی که دنبالش
              هستی رو به‌راحتی پیدا کنی.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-bold text-[var(--text-primary)]">
              دسترسی سریع
            </h3>

            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li>
                <Link
                  to="/"
                  className="transition hover:text-[var(--color-primary)]"
                >
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link
                  to="/posts"
                  className="transition hover:text-[var(--color-primary)]"
                >
                  همه آگهی‌ها
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="transition hover:text-[var(--color-primary)]"
                >
                  داشبورد من
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 font-bold text-[var(--text-primary)]">
              دسته‌بندی آگهی‌ها
            </h3>

            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    to={`/posts?category=${category.slug}`}
                    className="transition hover:text-[var(--color-primary)]"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--border-color)] pt-6 text-center">
          <p className="text-xs text-[var(--text-secondary)]">
            © تمامی حقوق این وب‌سایت محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
