"use client";
import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useTheme } from "next-themes";
import { Alert } from "./alert";

import clsx from "clsx";

export interface Assignee {
  id: number;
  name: string;
}

interface AddItemProps {
  state: string;
  userName: string;
  reload: () => void;
}

const AddItemCard = ({ state, userName, reload }: AddItemProps) => {
  const [showModal, setShowModal] = useState(false);
  const [assignees, setAssignees] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("0");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { setTheme, theme } = useTheme();

  const getAssignees = async () => {
    try {
      const response = await fetch("/api/assignees/read", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const assignee = await response.json();
        setAssignees(assignee);
      } else {
        console.error("Failed to read assignees");
        return [];
      }
    } catch (error) {
      console.error("Error reading assignees:", error);
      return [];
    }
  };

  useEffect(() => {
    getAssignees();
  }, []);

  function getCurrentDateTime() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  }
  const dateChange = (date: any) => {
    if (date && date.format && date.isValid()) {
      const formattedDate = date.format("YYYY-MM-DD HH:mm:ss");
      setDueDate(formattedDate);
    } else {
      setDueDate("");
    }
    //setDueDate(momentObj.format("YYYY-MM-DD HH:mm:ss"));
  };

  const changeAssignee = async (e: any) => {
    setSelectedAssignee(e.target.value);
  };

  const refreshShowModal = () => {
    setSuccess(null);
    setError(null);
    getAssignees();
    setShowModal(true);
  };

  const saveItem = async () => {
    if (title.trim() !== "" && dueDate.trim() !== "") {
      try {
        const response = await fetch("/api/items/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            selectedAssignee,
            dueDate,
            state: state === "Done" ? 3 : state === "Not Started" ? 1 : 2,
          }),
        });

        if (response.ok) {
          const item = await response.json();
          setSuccess("Task created");
          saved();
        } else {
          console.error("Failed to create item", response);
          setError("Failed to create new task.");
        }
      } catch (error) {
        console.error("Error creating item:", error);
        setError("Failed to create new task.");
      }
    } else {
      if (title.trim() !== "") {
        //Due date missing
        setError("Pick a due date for your new task.");
      } else {
        setError("Insert a title for your new task");
      }
    }
  };

  const saved = () => {
    reload();
    setTitle("");
    setDescription("");
    setDueDate("");
    setSelectedAssignee("");
    setShowModal(false);
  };
  const save = async () => {
    setError(null);
    await saveItem();
  };

  return (
    <>
      <div
        onClick={refreshShowModal}
        className={`${
          state === "Not Started"
            ? "bg-gray-400 dark:bg-gray-800"
            : state === "In Progress"
            ? "bg-blue-200 dark:bg-blue-700"
            : "bg-green-200 dark:bg-green-700"
        } cursor-pointer rounded-xl p-2 text-sm text-center flex flex-col justify-around text-black dark:text-white min-h-[40px]`}
      >
        <span className="w-full">+ New</span>
      </div>

      {showModal && (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                    Add To-do Task
                  </h3>

                  {error && <Alert>{error}</Alert>}
                  <form className="space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Title"
                        required={true}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        id="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Description"
                        required={false}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="assignee"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Assignee
                      </label>
                      <select
                        id="assignee"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={changeAssignee}
                      >
                        <option value={0} key={0}>
                          {userName}
                        </option>
                        {assignees.map((assignee: Assignee) => (
                          <option value={assignee.id} key={assignee.id}>
                            {assignee.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="dueDateTime"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Due date
                      </label>
                      <div>
                        {theme === "dark" && (
                          <style>{`
                              .rdtPicker {
                                background: #333333;
                                color: #ffffff;
                              }

                              .rdtPicker td {
                                color: #ffffff;
                              }

                              .rdtPicker td.rdtToday:before {
                                border-bottom-color: #ffffff;
                              }

                              .rdtPicker td.rdtActive,
                              .rdtPicker td.rdtActive:hover {
                                background-color: #428bca;
                                color: #ffffff;
                                text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
                              }
                            `}</style>
                        )}
                        <Datetime
                          onChange={dateChange}
                          inputProps={{
                            className:
                              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                            placeholder: "Select due date and time",
                          }}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                    type="button"
                    onClick={save}
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Save
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddItemCard;
