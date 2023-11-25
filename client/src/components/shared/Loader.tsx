import './Loader.css';

const Loader = () => {
  return (
    <div className="bg-slate-700 w-screen h-screen flex justify-center items-center">
      <span className="loader">
        <span className="loader-inner"></span>
      </span>
    </div>
  );
};

export default Loader;
