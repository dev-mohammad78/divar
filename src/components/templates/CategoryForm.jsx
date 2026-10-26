import { MdOutlineAttachment, MdOutlineInsertEmoticon } from "react-icons/md";
import { TbSubtitlesEdit } from "react-icons/tb";

function CategoryForm() {
  const [form, setForm] = {
    name: "",
    slug: "",
    icon: "",
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(form);
  };
  
  return (
    <form
      className="p-3 md:p-5 space-y-8"
      onChange={changeHandler}
      onSubmit={submitHandler}
    >
      {/* header */}
      <p className="my-8 text-lg">افزودن دسته‌بندی جدید</p>
      {/* name */}
      <div className="flex flex-col gap-y-4">
        <label htmlFor="name">نام دسته‌بندی</label>
        <div className="border border-[var(--border-color)] rounded-md bg-[var(--bg-primary)] md:max-w-lg flex items-center">
          <span>
            <TbSubtitlesEdit className="text-xl mx-2" />
          </span>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="مثال: املاک"
            className="w-full p-2 md:p-3 outline-none focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      {/* slug */}
      <div className="flex flex-col gap-y-4">
        <label htmlFor="slug">اسلاگ</label>
        <div className="border border-[var(--border-color)] rounded-md bg-[var(--bg-primary)] md:max-w-lg flex items-center">
          <span>
            <MdOutlineAttachment className="text-xl mx-2" />
          </span>
          <input
            type="text"
            name="slug"
            id="slug"
            placeholder="حروف انگلیسی و - مجاز است : home-decor"
            className="w-full p-2 md:p-3 outline-none focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      {/* icon */}
      <div className="flex flex-col gap-y-4">
        <label htmlFor="icon">آیکون</label>
        <div className="border border-[var(--border-color)] rounded-md bg-[var(--bg-primary)] md:max-w-lg flex items-center">
          <span>
            <MdOutlineInsertEmoticon className="text-xl mx-2" />
          </span>
          <input
            type="text"
            name="icon"
            id="icon"
            className="w-full p-2 md:p-3 outline-none focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      {/* btn */}
      <button
        type="submit"
        className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover) p-3 rounded-md w-full md:max-w-lg cursor-pointer"
      >
        ایجاد دسته‌بندی
      </button>
    </form>
  );
}

export default CategoryForm;
