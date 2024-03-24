import { useTable, useSortBy } from "react-table";
import { COLUMNS } from "../utils/columns";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

type Props = {
  filteredData: any[];
};

const ReactDataTable = ({ filteredData }: Props) => {
  //   const columns = COLUMNS;
  const columns = React.useMemo(() => {
    return [
      {
        Header: "PLANET NAME",
        accessor: "pl_name",
        Cell: ({ row }: any) => (
          <a
            href={`https://exoplanetarchive.ipac.caltech.edu/overview/${encodeURIComponent(
              row.original.pl_name
            )}`} // Change example.com to your actual domain
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 flex items-center space-x-2 hover:underline"
          >
            {row.original.pl_name}
            <FaExternalLinkAlt className="ml-2" />
          </a>
        ),
      },
      ...COLUMNS.slice(1), // Adding rest of the columns
    ];
  }, []);
  const data = filteredData;
  //   console.log(filteredData);

  const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <section>
      {filteredData.length > 0 ? (
        <>
          <table
            {...getTableProps}
            className="max-w-7xl mx-auto border divide-y divide-gray-200"
          >
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <p>{column.render("Header")}</p>
                      <span className="ml-2">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <IoCaretDown />
                          ) : (
                            <IoCaretUp />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              className="bg-white divide-y divide-gray-200"
              {...getTableBodyProps}
            >
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-center text-sm my-5">
            This data is fetched from{" "}
            <span className="text-[#0D9298]">
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
        </>
      ) : (
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
  );
};
export default ReactDataTable;
