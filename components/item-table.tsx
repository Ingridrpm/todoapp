"use client";
import React, { useState } from "react";
import { Ticket } from "./tabs-elemet";
import EditItem from "./edit-item";

interface ItemTableProps {
  tickets: Ticket[];
  reload: () => void;
  userName: string;
}

const ItemTable = ({ tickets, reload, userName }: ItemTableProps) => {
  const t: Ticket = {
    title: "",
    state: "Todo",
    id: "",
    description: null,
    assignee: "",
    dueDateTime: new Date(),
  };
  const [showModal, setShowModal] = useState(false);
  const [ticketModal, setTicketModal] = useState(t);

  const closeModal = () => {
    setShowModal(false);
    reload();
  };

  const editItem = (ticket: Ticket) => {
    setTicketModal(ticket);
    setShowModal(true);
  };

  const dateAndTime = (ticket: Ticket) => {
    const dueDate = new Date(ticket.dueDateTime);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric" as const,
    };
    const date = dueDate.toLocaleString("en-US", options);
    const time = dueDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    return [date, time];
  };

  const getColorClass = (dueDateTime: string, state: string) => {
    if (state === "Done") return "text-gray-900 dark:text-white";
    const now = new Date();
    const dueDate = new Date(dueDateTime);

    if (dueDate < now) {
      return "text-red-500";
    } else if (dueDate.getTime() - now.getTime() <= 24 * 60 * 60 * 1000) {
      return "text-orange-500";
    } else {
      return "text-green-600";
    }
  };

  return (
    <>
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
                  <td className="px-6 py-4">
                    <span
                      className={`${getColorClass(
                        ticket.dueDateTime + "",
                        ticket.state
                      )} text-sm`}
                    >
                      {dateAndTime(ticket)[0]}
                    </span>{" "}
                    <span
                      className={`${getColorClass(
                        ticket.dueDateTime + "",
                        ticket.state
                      )} text-sm`}
                    >
                      {dateAndTime(ticket)[1]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        editItem(ticket);
                      }}
                      type="button"
                      className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />{" "}
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                      <span className="sr-only">Icon description</span>
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <EditItem
          userName={userName}
          id={ticketModal.id}
          _title={ticketModal.title}
          _description={ticketModal.description || ""}
          _selectedAssignee={ticketModal.assignee}
          _dueDate={ticketModal.dueDateTime + ""}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default ItemTable;
