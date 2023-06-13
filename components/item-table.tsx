import React from "react";
import { Ticket } from "./tabs-elemet";

interface ItemTableProps {
  tickets: Ticket[];
}

const ItemTable = ({ tickets }: ItemTableProps) => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Task
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
              <th scope="col" className="px-6 py-3">
                Assignee
              </th>
              <th scope="col" className="px-6 py-3">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {ticket.title}
                    <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                      {ticket.description}
                    </p>
                  </th>
                  <td className="px-6 py-4">
                    {ticket.state === "Done" ? (
                      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                        <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                        {ticket.state}
                      </span>
                    ) : ticket.state === "In Progress" ? (
                      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <span className="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
                        {ticket.state}
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300">
                        <span className="w-2 h-2 mr-1 bg-gray-500 rounded-full"></span>
                        {ticket.state}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">{ticket.assignee}</td>
                  <td className="px-6 py-4">{ticket.dueDateTime + ""}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>{" "}
                    <br></br>
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemTable;
