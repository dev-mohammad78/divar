import { useState } from "react";
import { FiPlusSquare, FiList, FiMenu, FiX } from "react-icons/fi";

import AddPost from "../components/templates/AddPost";
import PostList from "../components/templates/PostList";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState("add");
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    {
      id: "add",
      title: "ثبت آگهی جدید",
      icon: <FiPlusSquare size={19} />,
    },
    {
      id: "posts",
      title: "آگهی‌های من",
      icon: <FiList size={19} />,
    },
  ];

  const selectTab = (id) => {
    setActiveTab(id);
    setMenuOpen(false);
  };

  return (
    <div className="p-3 md:p-5 lg:p-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[250px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside>
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex w-full items-center justify-between p-4 text-[var(--text-primary)] md:hidden"
          >
            <span className="flex items-center gap-2 font-medium">
              {menuItems.find((item) => item.id === activeTab)?.title}
            </span>

            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

          {/* Menu items */}
          <nav
            className={`${menuOpen ? "flex" : "hidden"} flex-col gap-2 p-3 md:flex`}
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectTab(item.id)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm md:text-base font-medium transition ${
                  activeTab === item.id
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item.icon}
                {item.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="min-w-0">
          {activeTab === "add" && (
            <section>
              <div className="p-2 md:p-4">
                <h2 className="text-lg font-bold text-[var(--text-primary)]">
                  ثبت آگهی جدید
                </h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  اطلاعات آگهی خود را وارد کنید
                </p>
              </div>

              <div className="p-2 md:px-4">
                <AddPost />
              </div>
            </section>
          )}

          {activeTab === "posts" && <PostList />}
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
