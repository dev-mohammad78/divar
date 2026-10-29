import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import CategoryForm from "../components/templates/CategoryForm";
import CategoryList from "../components/templates/CategoryList";

function AdminPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full md:flex-row md:p-4">
      {/* form */}
      <div className="w-full md:w-1/3">
        {/* mobile form */}
        <button
          type="button"
          onClick={() => setIsFormOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-lg p-3 text-right md:hidden"
          aria-expanded={isFormOpen}
        >
          <span className="my-8 md:my-4 text-lg">افزودن دسته‌بندی جدید</span>

          <FiChevronDown
            size={20}
            className={`transition-transform duration-200 ${
              isFormOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* desktop form */}
        <div className={`${isFormOpen ? "block" : "hidden"} md:block`}>
          <CategoryForm />
        </div>
      </div>

      {/* categories */}
      <div className="w-full md:w-2/3">
        <CategoryList />
      </div>
    </div>
  );
}

export default AdminPage;
