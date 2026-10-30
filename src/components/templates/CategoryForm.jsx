import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdOutlineAttachment, MdOutlineInsertEmoticon } from "react-icons/md";
import { TbSubtitlesEdit } from "react-icons/tb";

import { addCategory } from "../../services/admin";

function CategoryForm() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
  });
  const queryClient = useQueryClient();
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-categories"],
      });

      setForm({ name: "", slug: "", icon: "" });
    },
    onError: (error) => console.log("Error:", error),
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    console.log("Form data:", form);

    if (!form.name || !form.slug || !form.icon) {
      console.log("Fields are empty");
      return;
    }

    console.log("Sending request...");
    mutate(form);
  };

  return (
    <form
      className="p-3 md:p-5 space-y-8"
      onChange={changeHandler}
      onSubmit={submitHandler}
    >
      {/* header */}
      <p className="hidden md:block md:my-4 text-lg">افزودن دسته‌بندی جدید</p>

      {/* error message */}
      {!!error && (
        <div className="bg-[var(--color-primary)] text-[var(--text-white)] p-4 rounded-md w-full md:max-w-lg text-center">
          خطایی رخ داده است.
        </div>
      )}

      {/* success message */}
      {data?.status === 201 && (
        <div className="bg-[var(--color-primary)] text-[var(--text-white)] p-4 rounded-md w-full md:max-w-lg text-center">
          دسته‌بندی با موفقیت اضافه شد.
        </div>
      )}

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
        disabled={isPending}
        type="submit"
        className={`bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--text-white)] p-3 rounded-md w-full md:max-w-lg transition-opacity ${
          isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {isPending ? "در حال ایجاد..." : "ایجاد دسته‌بندی"}
      </button>
    </form>
  );
}

export default CategoryForm;
