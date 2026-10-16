import divar from "../../../public/divar.svg";
import intro from "../../assets/img/intro.webp";
import { FiPhoneCall } from "react-icons/fi";

function SendOtpForm({ setStep, mobile, setMobile }) {

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="p-2 flex flex-col sm:flex-row gap-4 md:gap-0 bg-[var(--bg-secondary)] rounded-lg">
      {/* form */}
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center md:p-10 order-2 sm:order-1"
      >
        {/* Logo */}
        <div className="my-12">
          <img src={divar} className="w-20 h-20" />
        </div>
        {/* details */}
        <div className="pt-4 text-center">
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
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="شماره موبایل (09xxxxxxxxx)"
            className="outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-8 p-3 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--text-white)]"
        >
          ارسال کد
        </button>
      </form>
      {/* image */}
      <div className="max-w-[600px] order-1 sm:order-2">
        <img src={intro} className="md:rounded-l-lg" />
      </div>
    </div>
  );
}

export default SendOtpForm;
