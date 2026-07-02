import { Link } from "react-router-dom";

const NewAndPopular = () => {
  return (
    <>
      <div className=" min-h-screen bg-[#0B0B0F] text-[#F5F1E8]">
        <div className=" mt-20 flex flex-col items-center  mx-auto max-w-7xl px-6 pb-20 sm:px-6 lg:px-8">
          <h1 className="mt-20 text-3xl text-center">Comming Soon...</h1>
          <Link
            to="/"
            className="mt-10 border bg-purple-500/20 border-gray-500/10 rounded-full px-4 py-2 text-sm text-white hover:bg-purple-100/20 hover:text-purple-300 transition-colors duration-300"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewAndPopular;
