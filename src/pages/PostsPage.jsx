import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getCategory } from "../services/admin";
import { getPosts } from "../services/post";
import Loader from "../components/Loader";
import PostItems from "../components/templates/PostItems";
import PostFilters from "../components/common/PostFilters";
import { FiSearch } from "react-icons/fi";

const PostsPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["posts", sort, category, debouncedSearch],
    queryFn: () => getPosts({ sort, category, search: debouncedSearch }),
  });

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  const posts = data?.posts || [];
  const postsCount = posts.length;
  const categories = (categoryData?.data || []).map((item) => ({
    ...item,
    _id: item.slug,
  }));

  const handleCategoryChange = (value) => {
    setCategory(value);

    if (value) {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <main className="min-h-screen px-4 py-10 lg:px-10">
      <h1 className="mb-8 text-2xl font-bold text-[var(--text-primary)]">
        همه آگهی‌ها
      </h1>

      <div className="mb-6 flex flex-col lg:justify-between gap-3 lg:flex-row lg:items-center bg-[var(--bg-tertiary)] p-3 rounded-lg">
        {/* search */}
        <div className="relative w-full lg:max-w-xl">
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جست‌وجو در آگهی‌ها..."
            className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] py-3 pl-4 pr-11 text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)]"
          />
        </div>
        {/* sort */}
        <PostFilters
          sort={sort}
          setSort={setSort}
          category={category}
          setCategory={handleCategoryChange}
          categories={categories}
        />
      </div>

      <p className="mb-5 text-sm text-[var(--text-secondary)]">
        {postsCount.toLocaleString("fa-IR")} آگهی پیدا شد
      </p>

      {isPending ? (
        <Loader fullScreen={false} />
      ) : isError ? (
        <p className="py-10 text-center text-[var(--text-secondary)]">
          دریافت آگهی‌ها ناموفق بود.
        </p>
      ) : posts.length === 0 ? (
        <p className="py-10 text-center text-[var(--text-secondary)]">
          آگهی‌ای پیدا نشد.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostItems key={post._id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
};

export default PostsPage;
