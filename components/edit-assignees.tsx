"use client";
import React, { useState } from "react";
import { Alert } from "./alert";

export interface Assignee {
  id: number;
  name: string;
}

const EditAssignees = ({
  assignees,
  closeEditModal,
  reloadAssignees,
}: {
  assignees: { id: string; name: string; listId: string }[];
  closeEditModal: () => void;
  reloadAssignees: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingAssignee, setEditingAssignee] = useState(false);
  const [editingName, setEditingName] = useState("");
  const [editingId, setEditingId] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setError(null);
    setSuccess(null);
    setShowModal(false);
    closeEditModal();
    //reload();
  };

  const fetchEditAssignee = async (id: string) => {
    try {
      const response = await fetch("/api/assignees/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assigneeId: id, name: editingName }),
      });

      if (response.ok) {
        const assignee = await response.json();
        setSuccess("Collaborator updated");
        setEditingAssignee(false);
      } else {
        console.error("Failed to update assignee");
        setError("Failed to update assignee");
      }
    } catch (error) {
      console.error("Error updating assignee:", error);

      setError("Failed to update assignee");
    }
  };

  const editAssignee = async (id: string) => {
    if (editingName !== "") {
      await fetchEditAssignee(id);
      reloadAssignees();
    } else {
      setError("Enter assignee name");
    }
  };

  function goToEdit(id: string, name: string) {
    setEditingId(id);
    setEditingName(name);
    setEditingAssignee(true);
  }

  function cancelEdit() {
    setError(null);
    setEditingId("");
    setEditingName("");
    setEditingAssignee(false);
  }

  async function deleteAssignee() {
    try {
      const response = await fetch("/api/assignees/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assigneeId: editingId }),
      });

      if (response.ok) {
        const assignee = await response.json();
        setSuccess("Collaborator deleted");

        setEditingAssignee(false);
      } else {
        console.error("Failed to delete assignee");
        setError("Failed to delete assignee");
      }
    } catch (error) {
      console.error("Error deleting assignee:", error);

      setError("Failed to delete assignee");
    }
  }

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
                {!editingAssignee && (
                  <>
                    {error && <Alert>{error}</Alert>}
                    <div className="mb-4">
                      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                Name
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
                                    onClick={() => {
                                      goToEdit(assignee.id, assignee.name);
                                    }}
                                  >
                                    {assignee.name}
                                  </th>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
                {editingAssignee && (
                  <>
                    {error && <Alert>{error}</Alert>}
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md hover:bg-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500"
                        onClick={() => editAssignee(editingId)}
                      >
                        Save
                      </button>
                    </div>
                    {/*
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                    <h3 className="text-lg font-medium">Delete Collaborator</h3>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                        onClick={() => deleteAssignee()}
                      >
                        Delete collaborator
                      </button>
                    </div>
                    */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAssignees;
