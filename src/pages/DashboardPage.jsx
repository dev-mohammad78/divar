import AddPost from "../components/templates/AddPost";

function DashboardPage() {
  return (
    <div className="p-2 md:p-4 lg:p-8">
      <div className="mt-4 md:mt-0">
        <h3 className="text-xl font-bold text-[var(--text-primary)]">
          ثبت آگهی جدید
        </h3>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          اطلاعات آگهی خود را وارد کنید
        </p>
      </div>

      <AddPost />
    </div>
  );
}

export default DashboardPage;
