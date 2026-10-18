import divar from "../../../public/divar.svg";
import intro from "../../assets/img/intro.webp";
import { FiPhoneCall } from "react-icons/fi";

import ThemeToggle from "../ThemeToggle";
import { sendOtp } from "../../services/auth";
import toast from "react-hot-toast";

function SendOtpForm({ setStep, mobile, setMobile }) {
  
  const submitHandler = async (event) => {
    event.preventDefault();

    if (!/^09\d{9}$/.test(mobile)) {
      toast.error("شماره موبایل معتبر نیست.");
      return;
    }

    const { response, error } = await sendOtp(mobile);

    if (response) {
      toast.success("کد تأیید ارسال شد.");
      setStep(2);
    }

    if (error) {
      toast.error(
        error.response?.data?.message || "ارسال کد تأیید ناموفق بود.",
      );
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
          <img src={divar} className="w-20 h-20" />
        </div>
        {/* details */}
        <div className="pt-2 md:pt-4 text-center">
          <p className="text-lg font-bold">خوش آمدید!</p>
          <p className="text-sm text-[var(--text-secondary)] mt-4">
            برای ادامه، شماره موبایل خود را وارد کنید.
          </p>
        </div>
        {/* number box */}
        <div className="flex items-center gap-5 border border-[var(--border-color)] rounded-lg p-2 mt-4 min-w-[350px]">
          <span>
            <FiPhoneCall className="text-[var(--text-secondary)]" />
          </span>
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, "").slice(0, 11))
            }
            pattern="09[0-9]{9}"
            maxLength={11}
            required
            placeholder="(09xxxxxxxxx) شماره موبایل"
            className="outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <button
          type="submit"
          className="min-w-[350px] mt-8 p-3 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--text-white)]"
        >
          ارسال کد
        </button>
      </form>
      {/* image */}
      <div className="max-w-[600px] order-1 sm:order-2">
        <img
          src={intro}
          className="md:rounded-l-lg inset-0 h-full w-full object-center"
        />
      </div>
    </div>
  );
}

export default SendOtpForm;
