import { GiAstronautHelmet } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section className="w-full h-[10vh]">
      <nav className="bg-slate-50 p-4 px-5 sm:px-10 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center text-base space-x-3">
            <GiAstronautHelmet className="text-2xl" />
            <p className="sm:text-base text-sm font-semibold">
              NASA Exoplanet Data
            </p>
          </div>
        </Link>
        <Link to={"/query"}>
          <button className="px-4 py-2 bg-[#0D9298] text-white rounded-md hover:bg-[#476c6e] focus:outline-none focus:bgt-[#0D9298] text-xs sm:text-sm">
            Go to query search
          </button>
        </Link>
      </nav>
    </section>
  );
};
export default Navbar;
0;
