import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import astronaut from "/src/assets/astronaut.png";

const Home = () => {
  return (
    <section>
      <section>
        <Navbar />
      </section>
      <section className="h-[85vh] flex flex-col px-5 space-y-3 items-center justify-center">
        <img
          className="w-72 h-72"
          loading="lazy"
          src={astronaut}
          alt="Hero Astronaut"
        />
        <div className="max-w-lg text-center">
          <p className="sm:text-3xl text-xl font-bold">
            Welcome to Exoplanet Data Portal
          </p>
          <p className="mt-1 text-sm">
            Click on <b>Go to query search</b> to search for all the exoplanets
            compiled by National Aeronautics and Space Administration (NASA) and
            Caltech.
          </p>
          <Link to={"/query"}>
            <button className="px-4 py-2 bg-[#0D9298] mt-5 text-white rounded-md hover:bg-[#476c6e] focus:outline-none focus:bgt-[#0D9298] text-sm sm:text-base w-fit">
              Go to query search
            </button>
          </Link>
        </div>
      </section>
      <p className="text-center ">Made with ♥ by Devrajsinh Jhala</p>
    </section>
  );
};
export default Home;
