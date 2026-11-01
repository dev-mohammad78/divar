import AddPost from "../components/templates/AddPost";

function DashboardPage() {
  return (
    <div className="md:p-4">
      <h3>ثبت آگهی جدید</h3>
      <p>اطلاعات آگهی خود را وارد کنید</p>
      <AddPost />
    </div>
  );
}

export default DashboardPage;
