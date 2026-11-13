import divar from "../../public/divar.svg";

const Loader = ({ size = 64, fullScreen = true }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen" : "min-h-[300px]"
      }`}
    >
      <img
        src={divar}
        alt="Loading..."
        style={{ width: size, height: size }}
        className="animate-divar-loader object-contain"
      />
    </div>
  );
};

export default Loader;
