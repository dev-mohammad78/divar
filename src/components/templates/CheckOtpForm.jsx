import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IoIosArrowBack } from "react-icons/io";

import divar from "../../../public/divar.svg";
import checking from "../../assets/img/checking.webp";

import ThemeToggle from "../ThemeToggle";
import OtpInput from "./OtpInput";
import { checkOtp } from "../../services/auth";
import { setCookie } from "../../utils/cookies";

function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (code.length !== 5 || isPending) return;

    setIsPending(true);

    try {
      const { response, error } = await checkOtp(mobile, code);

      if (error) {
        toast.error(error?.response?.data?.message || "خطا در تأیید کد");
        return;
      }

      if (response) {
        setCookie(response.data);

        queryClient.removeQueries({
          queryKey: ["my-post-list"],
        });

        await queryClient.invalidateQueries({
          queryKey: ["profile"],
        });
      }
    } catch {
      toast.error("خطایی در ورود رخ داد");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="relative p-2 md:p-0 flex flex-col md:flex-row justify-center gap-4 md:gap-2 rounded-lg bg-[var(--bg-secondary)] shadow-lg">
      {/* ThemeToggle */}
      <div className="absolute top-4 left-auto right-4 z-10">
        <ThemeToggle />
      </div>
      {/* form */}
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center sm:w-full md:w-1/2 md:p-10 md:mx-2 order-1 sm:order-2"
      >
        {/* Logo */}
        <div className="my-4 md:my-12">
          <img src={divar} alt="لوگوی دیوار" className="w-20 h-20" />
        </div>
        {/* details */}
        <div className="pt-2 md:pt-4 text-center">
          <p className="text-lg font-bold">کد تایید را وارد کنید</p>
          <p className="text-sm text-[var(--text-secondary)] mt-4">
            کد تایید ارسال شده به شماره {mobile} را وارد کنید
          </p>
        </div>

        {/* number box */}
        <OtpInput code={code} setCode={setCode} />

        <button
          type="submit"
          disabled={isPending || code.length !== 5}
          className="min-w-[350px] mt-8 p-3 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--text-white)]"
        >
          {isPending ? "در حال بررسی..." : "تایید کد"}
        </button>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex items-center gap-x-2 mt-4 p-3 text-sm text-[var(--text-secondary)] cursor-pointer"
        >
          ویرایش شماره موبایل
          <span>
            <IoIosArrowBack />
          </span>
        </button>
      </form>
      {/* image */}
      <div className="max-w-[400px] order-1 sm:order-2">
        <img
          src={checking}
          alt="تأیید کد ورود"
          className="md:rounded-l-lg inset-0 h-full w-full object-center"
        />
      </div>
    </div>
  );
}

export default CheckOtpForm;
