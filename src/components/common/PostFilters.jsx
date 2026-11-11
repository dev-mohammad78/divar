function PostFilters({ sort, setSort }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
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
