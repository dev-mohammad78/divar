import divar from "../../public/divar.svg";

const Loader = ({ size = 64 }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
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
