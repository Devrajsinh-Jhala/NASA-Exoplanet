import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";

interface DataTableProps {
  data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const headerMapping: { [key: string]: string } = {
    PL_NAME: "Planet Name",
    HOSTNAME: "Host name",
    DISCOVERYMETHOD: "Method of Discovery",
    DISC_YEAR: "Year of Discovery",
    DISC_FACILITY: "Discovery Facility",
  };

  const generatePlanetUrl = (planetName: string) => {
    const encodedPlanetName = encodeURIComponent(planetName);
    return `https://exoplanetarchive.ipac.caltech.edu/overview/${encodedPlanetName}`;
  };

  const handleAscending = () => {};
  const handleDescending = () => {};
  console.log(data.length);

  return (
    <div className="">
      {data.length > 0 ? (
        <div className="mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(headerMapping).map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {headerMapping[header]}
                    <div className="flex items-center my-2 space-x-3">
                      <IoCaretUp onClick={() => handleAscending()} />
                      <IoCaretDown onClick={() => handleDescending()} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.entries(row).map(([key, value]: any, index) => (
                    <td
                      key={index}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {key === "pl_name" ? (
                        <a
                          href={generatePlanetUrl(value)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center space-x-3"
                        >
                          <p>{value}</p>
                          <FaExternalLinkAlt className="hover:underline" />
                        </a>
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center my-5">
            This data is fetched from{" "}
            <span className="text-blue-500">
              <a
                href="/data/exoplanet_data.csv"
                target="_blank"
                rel="noopener noreferrer"
              >
                this table
              </a>
            </span>{" "}
            and you can read about it{" "}
            <span className="text-blue-500">
              <a
                href="https://exoplanetarchive.ipac.caltech.edu/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            </span>
            .
          </p>
        </div>
      ) : (
        <section className=" overflow-x-hidden flex flex-col space-y-1 items-center justify-center">
          <p className=" font-bold">
            Exoplanets are planets outside the Solar System.
          </p>
          <p className="font-bold">
            Here you can query{" "}
            <span className="text-blue-500">
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
    </div>
  );
};

export default DataTable;
