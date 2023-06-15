"use client";
import React, { useState } from "react";
import { Alert } from "./alert";

export interface Assignee {
  id: number;
  name: string;
}

const EditAssignees = ({
  assignees,
}: {
  assignees: { id: string; name: string; listId: string }[];
}) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(
    assignees.map(({ id, name }) => ({ id, name }))
  );
  const [error, setError] = useState<string | null>(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setError(null);
    setShowModal(false);
  };

  const editItem = async (id: string) => {
    const n = name.find((na) => na.id === id);
    const newName = n ? n.name : "";
    try {
      const response = await fetch("/api/assignees/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assigneeId: id, name: newName }),
      });

      if (response.ok) {
        const assignee = await response.json();
        console.log("Assignee created:", assignee);
      } else {
        console.error("Failed to create assignee");
        setError("Failed to create assignee");
        return;
      }
    } catch (error) {
      console.error("Error creating assignee:", error);

      setError("Failed to create assignee");
      return;
    }
    closeModal();
  };

  const setNewName = (id: string, newName: string) => {
    name.map((assignee) => {
      if (assignee.id === id) {
        assignee.name = newName;
        setName(name);
      }
    });
  };

  return (
    <>
      <a
        onClick={() => setShowModal(true)}
        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        Edit collaborators
      </a>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="dark:bg-gray-800 dark:text-white bg-white rounded-lg shadow-lg">
              <div className="flex flex-col p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Edit Collaborators</h3>
                  <button
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>

                {error && <Alert>{error}</Alert>}
                <div className="mb-4">
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignees.map((assignee) => (
                          <>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <input
                                  id="name"
                                  type="text"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                  value={
                                    name.find((n) => n.id === assignee.id)
                                      ? name.find((n) => n.id === assignee.id)
                                          ?.name
                                      : ""
                                  }
                                  onChange={(e) =>
                                    setNewName(assignee.id, e.target.value)
                                  }
                                />
                              </th>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => {
                                    editItem(assignee.id);
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
                                  <span className="sr-only">
                                    Icon description
                                  </span>
                                </button>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAssignees;
