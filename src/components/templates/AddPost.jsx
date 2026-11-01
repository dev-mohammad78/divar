import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/admin";
import { useState } from "react";

function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: "",
    city: "",
    category: "",
    images: [],
  });

  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const changeHandler = (event) => {
    const { name, value, files } = event.target;

    if (name === "images") {
      setForm((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addHandler = (event) => {
    event.preventDefault();
    console.log("sent");
  };

  return (
    <form onChange={changeHandler} className="bg-red-300">
      {/* title */}
      <label htmlFor="title">عنوان</label>
      <input type="text" id="title" name="title" />

      {/* description */}
      <label htmlFor="content">توضیحات</label>
      <textarea id="content" name="content" />

      {/* price */}
      <label htmlFor="amount">قیمت</label>
      <input type="text" id="amount" name="amount" />

      {/* city */}
      <label htmlFor="city">شهر</label>
      <input type="text" id="city" name="city" />

      {/* category */}
      <label htmlFor="category">دسته بندی</label>
      <select name="category" id="category">
        {data?.data?.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>

      {/* images */}
      <label htmlFor="images">تصاویر آگهی</label>
      <input type="file" name="images" id="images" multiple accept="image/*" />
      {/* btn */}
      <button onClick={addHandler}>ثبت آگهی</button>
    </form>
  );
}
export default AddPost;
