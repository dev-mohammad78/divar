import { useState } from "react";
import { FiList, FiMenu, FiX } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";

import PostList from "../components/templates/PostList";

function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const isAdmin = profile?.data?.role === "ADMIN";
  const postsTitle = isAdmin ? "همه آگهی‌ها" : "آگهی‌های من";

  return (
    <div className="p-3 md:p-5 lg:p-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[250px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex w-full items-center justify-between p-4 text-[var(--text-primary)] md:hidden"
          >
            <span className="flex items-center gap-2 font-medium">
              {postsTitle}
            </span>

            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

          <nav
            className={`${menuOpen ? "flex" : "hidden"} flex-col gap-2 p-3 md:flex`}
          >
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white md:text-base"
            >
              <FiList size={19} />
              {postsTitle}
            </button>
          </nav>
        </aside>

        <main className="min-w-0">
          <section>
            <div className="p-2 md:p-4">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {postsTitle}
              </h2>

              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                مدیریت و مشاهده آگهی‌های منتشر شده
              </p>
            </div>

            <div className="p-2 md:px-4">
              <PostList />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
