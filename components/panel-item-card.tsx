"use client";
import clsx from "clsx";
import { useDrag } from "react-dnd";
import { Ticket } from "./tabs-elemet";
import EditItem from "./edit-item";
import { useState } from "react";

const PanelItemCard = ({
  ticket,
  reload,
  userName,
  assignees,
}: {
  ticket: Ticket;
  reload: () => void;
  userName: string;
  assignees: { id: string; name: string; listId: string }[];
}) => {
  const as = assignees;

  const [{ isDragging }, drag, dragPreview] = useDrag<
    Ticket,
    void,
    { isDragging: boolean; didDrop: boolean }
  >(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "ticket",

    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    item: ticket,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      didDrop: monitor.didDrop(),
    }),
  }));
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

  const foundAssignee = assignees.find(
    (assignee) => assignee.id + "" === ticket.assignee
  );

  const [assigneeName, setAssigneeName] = useState(
    foundAssignee
      ? foundAssignee.name
      : ticket.assignee === "0"
      ? userName
      : null
  );

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    reload();
  };

  const editItem = () => {
    setShowModal(true);
  };

  const getAssigneeNameById = (id: string) => {
    if (id === "0") return userName;
    const foundAssignee = assignees.find((assignee) => assignee.id + "" === id);
    return foundAssignee ? foundAssignee.name : null;
  };

  return (
    <>
      <div
        ref={drag}
        className={clsx(
          `${
            ticket.state === "Not Started"
              ? "bg-gray-400 dark:bg-gray-800"
              : ticket.state === "In Progress"
              ? "bg-blue-200 dark:bg-blue-700"
              : "bg-green-200 dark:bg-green-700"
          } cursor-pointer rounded-xl p-2 text-lg flex flex-col justify-around text-black min-h-[80px]`,
          {
            hidden: isDragging,
          }
        )}
        onClick={editItem}
      >
        <p className="text-lg font-bold text-gray-900 dark:text-white">
          {isDragging ? "dragging" : ticket.title}
        </p>
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
        <span className="inline-flex mt-2 xs:mt-0">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-circle text-xs text-gray-900 dark:text-white"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </span>
          <p className="text-xs text-gray-900 dark:text-white">
            {getAssigneeNameById(ticket.assignee)}
          </p>
        </span>
        <span
          className={`${getColorClass(
            ticket.dueDateTime + "",
            ticket.state
          )} text-sm`}
        >
          {date}
        </span>
        <span
          className={`${getColorClass(
            ticket.dueDateTime + "",
            ticket.state
          )} text-sm`}
        >
          {time}
        </span>
      </div>
      {showModal && (
        <EditItem
          userName={userName}
          id={ticket.id}
          _title={ticket.title}
          _description={ticket.description || ""}
          _selectedAssignee={ticket.assignee}
          _dueDate={ticket.dueDateTime + ""}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default PanelItemCard;
