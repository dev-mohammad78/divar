import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/admin";

const getCategoryIcon = (name) => {
  const icons = {
    املاک: "🏠",
    "وسایل نقلیه": "🚗",
    خودرو: "🚗",
    "موبایل و تبلت": "📱",
    "لوازم الکترونیکی": "💻",
    "خانه و آشپزخانه": "🛋️",
    "لوازم خانگی": "🧺",
    "استخدام و کاریابی": "💼",
    خدمات: "🛠️",
    "وسایل شخصی": "👕",
    "سرگرمی و فراغت": "🎮",
    ورزش: "⚽",
  };

  return icons[name] || "📦";
};

const HomeCategories = () => {
  const { data, isPending } = useQuery({
    queryKey: ["home-categories"],
    queryFn: getCategory,
  });

  const categories = data?.data?.slice(0, 5) || [];

  if (isPending) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-10">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)] md:text-2xl">
          دسته‌بندی‌های محبوب
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          آگهی‌ها رو بر اساس دسته‌بندی موردنظرت پیدا کن.
        </p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-3 sm:grid sm:grid-cols-5 sm:overflow-visible">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex justify-center items-center gap-3 whitespace-nowrap rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-2xl">{getCategoryIcon(category.name)}</span>

            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeCategories;
