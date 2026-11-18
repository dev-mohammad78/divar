import AddPost from "../components/templates/AddPost";

function CreatePostPage() {
  return (
    <main className="p-3 md:p-5 lg:p-8">
      <section className="mx-auto max-w-4xl">
        <div className="p-2 md:p-4">
          <h1 className="text-lg font-bold text-[var(--text-primary)]">
            ثبت آگهی جدید
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            اطلاعات آگهی خود را وارد کنید
          </p>
        </div>

        <div className="p-2 md:px-4">
          <AddPost />
        </div>
      </section>
    </main>
  );
}

export default CreatePostPage;
