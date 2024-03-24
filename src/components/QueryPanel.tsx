import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import DataTable from "./DataTable";
import toast, { Toaster } from "react-hot-toast";

interface DropdownOptions {
  [key: string]: string[];
}

interface Query {
  year: string;
  method: string;
  hostname: string;
  facility: string;
}

const QueryPanel: React.FC = ({}) => {
  const [query, setQuery] = useState<Query>({
    year: "",
    method: "",
    hostname: "",
    facility: "",
  });

  const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [queryData, setQueryData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [emptySearch, setEmptySearch] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/exoplanet_data.csv");
        const text = await response.text();
        const parsedData = Papa.parse(text, { header: true });

        const options: DropdownOptions = {};
        parsedData.data.forEach((row: any) => {
          Object.keys(row).forEach((key: string) => {
            if (!options[key]) {
              options[key] = [];
            }
            if (row[key] && !options[key].includes(row[key])) {
              options[key].push(row[key]);
            }
          });
        });

        setDropdownOptions(options);
        setLoading(false);
        setQueryData(parsedData.data); // Store the entire data
      } catch (error) {
        console.error("Error fetching CSV data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    if (
      query.year === "" &&
      query.method === "" &&
      query.hostname === "" &&
      query.facility === ""
    ) {
      // Filter data based on selected options
      setEmptySearch(false);
      toast.error("Enter something to search");
      return;
    }
    setEmptySearch(true);
    const filteredData = queryData.filter((item) => {
      if (query.year && item.disc_year !== query.year) return false;
      if (query.method && item.discoverymethod !== query.method) return false;
      if (query.hostname && item.hostname !== query.hostname) return false;
      if (query.facility && item.disc_facility !== query.facility) return false;
      return true;
    });
    const uniqueFilteredData = Array.from(
      new Set(filteredData.map((item) => JSON.stringify(item)))
    ).map((itemStr) => JSON.parse(itemStr));

    // console.log(uniqueFilteredData);
    setFilteredData(uniqueFilteredData); // Log filtered data to the console
  };

  const handleClear = () => {
    // Reset all state values to their initial state
    setQuery({
      year: "",
      method: "",
      hostname: "",
      facility: "",
    });

    setFilteredData([]);
  };

  if (loading) {
    return (
      <div
        role="status"
        className="v-screen h-screen text-7xl flex items-center justify-center"
      >
        <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
      </div>
    );
  }

  return (
    <section className="">
      <div>
        <Toaster />
      </div>
      <section className="w-full flex text-sm items-center flex-col justify-center border">
        <div className="p-4  items-center space-x-10 rounded-md flex flex-col md:flex-row">
          {/* Hostname Dropdown */}
          <div className="flex flex-col">
            <label
              htmlFor="hostname"
              className="block font-medium text-base text-gray-700"
            >
              Host Name
            </label>
            <select
              id="hostname"
              name="hostname"
              value={query.hostname}
              onChange={(e) => setQuery({ ...query, hostname: e.target.value })}
              className="mt-1  border-gray-500 rounded-md w-[185px] shadow-sm border"
            >
              <option value="">Host Name</option>
              {dropdownOptions.hostname &&
                dropdownOptions.hostname.map(
                  (option: string, index: number) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  )
                )}
            </select>
          </div>

          {/* Method Dropdown */}
          <div className="flex flex-col">
            <label
              htmlFor="method"
              className="block text-base font-medium text-gray-700"
            >
              Discovery Method
            </label>
            <select
              id="method"
              name="method"
              value={query.method}
              onChange={(e) => setQuery({ ...query, method: e.target.value })}
              className="mt-1 border-gray-500 w-[185px] rounded-md shadow-sm border"
            >
              <option value="">Discovery Method</option>
              {dropdownOptions.discoverymethod &&
                dropdownOptions.discoverymethod.map(
                  (option: string, index: number) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  )
                )}
            </select>
          </div>

          {/* Year Dropdown */}
          <div className="flex flex-col">
            <label
              htmlFor="year"
              className="block text-base font-medium text-gray-700"
            >
              Year of Discovery
            </label>
            <select
              id="year"
              name="year"
              value={query.year}
              onChange={(e) => setQuery({ ...query, year: e.target.value })}
              className="mt-1 border-gray-500 w-[185px] rounded-md shadow-sm border"
            >
              <option value="">Select Year</option>
              {dropdownOptions.disc_year &&
                dropdownOptions.disc_year
                  .slice()
                  .sort((a: string, b: string) => parseInt(a) - parseInt(b))
                  .map((option: string, index: number) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
            </select>
          </div>

          {/* Facility Dropdown */}
          <div className="flex flex-col">
            <label
              htmlFor="facility"
              className="block font-medium text-base text-gray-700"
            >
              Discovery Facility
            </label>
            <select
              id="facility"
              name="facility"
              value={query.facility}
              onChange={(e) => setQuery({ ...query, facility: e.target.value })}
              className="mt-1 border-gray-500 w-[185px] rounded-md shadow-sm border"
            >
              <option value="">Discovery Facility</option>
              {dropdownOptions.disc_facility &&
                dropdownOptions.disc_facility.map(
                  (option: string, index: number) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  )
                )}
            </select>
          </div>

          {/* Buttons */}
          <div className="ml-auto text-sm md:ml-4 mt-4 md:mt-0">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-[#0D9298] text-white rounded-md hover:bg-[#476c6e] focus:outline-none focus:bgt-[#0D9298]"
            >
              Search
            </button>
            <button
              onClick={handleClear}
              className="px-4 ml-2 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            >
              Clear
            </button>
          </div>
        </div>
      </section>
      <section className="my-10">
        {emptySearch && <DataTable data={filteredData} />}
        {!emptySearch && (
          <section className=" overflow-x-hidden flex flex-col space-y-1 items-center justify-center">
            <p className=" font-bold">
              Exoplanets are planets outside the Solar System.
            </p>
            <p className="font-bold">
              Here you can query{" "}
              <span className="text-[#0D9298]">
                <a
                  href="https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PS"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NASA&apos;s Exoplanet Archive
                </a>
              </span>{" "}
              and find the one you love the most.
            </p>
          </section>
        )}
      </section>
    </section>
  );
};

export default QueryPanel;
