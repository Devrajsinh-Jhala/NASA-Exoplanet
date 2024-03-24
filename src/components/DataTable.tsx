import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

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
  // console.log(data.length);

  return (
    <div className="scrollbar-hide">
      {data.length > 0 ? (
        <div className="mt-4">
          <table className="max-w-7xl mx-auto border divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(headerMapping).map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {headerMapping[header]}
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
            <span className="text-[#0D9298]">
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
        <section className=" overflow-x-hidden flex flex-col space-y-10 items-center justify-center">
          <section>
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
          <section className="my-10">
            <section className="max-w-3xl rounded-lg p-4 border border-gray-500 mx-auto">
              <p className="text-lg text-center font-bold">
                Features and Directions
              </p>
              <hr className="border-gray-800 border" />
              <ul className="list-disc p-2">
                <li>Select one or more options to view data.</li>
                <li>Click on the table header to sort the data.</li>
                <li>Click on the Search to view your queried data.</li>
                <li>Click on clear button to restart again!.</li>
                <li>Click on the hyperlinks to view more information!.</li>
              </ul>
            </section>
          </section>
        </section>
      )}
    </div>
  );
};

export default DataTable;
