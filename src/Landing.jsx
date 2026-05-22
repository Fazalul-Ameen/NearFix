import { useNavigate } from "react-router-dom";
function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600  to-black flex flex-col justify-center items-center w-full h-screen gap-8">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight">
          Near<span className="text-blue-500">Fix</span>
        </h1>

        <div className="flex flex-row gap-2">
          <button
            onClick={() => navigate("/login")}
            className="group relative px-8 py-3 rounded-lg font-semibold bg-blue-500 border-2 border-blue-500 text-white overflow-hidden transition-colors duration-300 hover:text-blue-500"
          >
            <span className="absolute inset-0 bg-white origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>

            <span className="relative z-10">Login</span>
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="group relative px-8 py-3 rounded-lg font-bold border-2 border-black bg-black text-white overflow-hidden transition-colors duration-300 hover:text-black"
          >
            <span className="absolute inset-0 bg-white origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>

            <span className="relative z-10">Signup</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Landing;