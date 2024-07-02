import React, { Fragment, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import "./Table.css";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { clearErrors, deleteTeacher } from "../../actions/teacherAction";

const Table = ({ pageSize, dataArray, headersArray }) => {
  // const data = React.useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       name: "sakshi",
  //       department: "Computer Science Engineering",
  //       subject: "graphics",
  //       subjectCode: "BTCOC123",
  //       action: ["edit", "delete"],
  //     },
  //     {
  //       id: 2,
  //       name: "vaishnavi",
  //       department: "Artificial Intelligence",
  //       subject: "AML",
  //       subjectCode: "BTAOC123",
  //       action: ["edit", "delete"],
  //     },
  //     {
  //       id: 3,
  //       name: "sayali",
  //       department: "Electronics",
  //       subject: "ECM",
  //       subjectCode: "BTEOC123",
  //       action: ["edit", "delete"],
  //     },
  //     {
  //       id: 4,
  //       name: "suru",
  //       department: "Computer Science Engineering",
  //       subject: "physics",
  //       subjectCode: "BTCOC124",
  //       action: ["edit", "delete"],
  //     },
  //     {
  //       id: 5,
  //       name: "rami",
  //       department: "Computer Science Engineering",
  //       subject: "maths",
  //       subjectCode: "BTCOC125",
  //       action: ["edit", "delete"],
  //     },

  //   ],
  //   []
  // );

  const data = dataArray;

  const dispatch = useDispatch();
  const columns = React.useMemo(() => headersArray, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: pageSize },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="table-main-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, headerGroupIndex) => (
            <tr key={headerGroupIndex} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={columnIndex}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}

                  {column.isSorted && (
                    <span>
                      {column.isSortedDesc ? (
                        <BsArrowDownSquareFill />
                      ) : (
                        <BsArrowUpSquareFill />
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr key={rowIndex} {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td key={cellIndex} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {data.length < 9 ? (
        <></>
      ) : (
        <Fragment>
          {" "}
          <div className="btn-table-container">
            <button disabled={pageIndex === 0} onClick={() => gotoPage(0)}>
              First
            </button>
            <button disabled={!canPreviousPage} onClick={previousPage}>
              Prev
            </button>
            <span>
              {pageIndex + 1} of {pageCount}
            </span>
            <button disabled={!canNextPage} onClick={nextPage}>
              Next
            </button>
            <button
              disabled={pageIndex >= pageCount - 1}
              onClick={() => gotoPage(pageCount - 1)}
            >
              Last
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Table;
