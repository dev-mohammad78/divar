function PostFilters({ sort, setSort, category, setCategory, categories }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full sm:w-52 px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)]"
      >
        <option value="">همه دسته‌بندی‌ها</option>

        {categories?.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full sm:w-52 px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)]"
      >
        <option value="newest">جدیدترین</option>
        <option value="oldest">قدیمی‌ترین</option>
        <option value="cheapest">ارزان‌ترین</option>
        <option value="expensive">گران‌ترین</option>
      </select>
    </div>
  );
}

export default PostFilters;
