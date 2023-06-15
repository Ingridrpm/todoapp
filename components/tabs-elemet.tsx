"use client";
import { useState, useEffect } from "react";
import ToDoPanel from "./todo-pane";
import ItemTable from "./item-table";
import { List } from "@prisma/client";
import AddAssignee from "./add-assignee";
import AddItem from "./add-item";

export type State = "Todo" | "In Progress" | "Done";

export type Ticket = {
  title: string;
  state: State;
  id: string;
  description?: string | null;
  assignee: string;
  dueDateTime: Date;
};

function TabsElement({ userName }: { userName: string }) {
  const [selectedTab, setSelectedTab] = useState("board");

  const [assignees, setAssignees] = useState([]);
  /*useEffect(() => {
    
  }, []);*/
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

  getAssignees();

  const tabChange = (tab: any) => {
    setSelectedTab(tab);
  };

  const tks: Ticket[] = [];
  const [items, setItems] = useState([]);
  const [tickets, setTickets] = useState(tks);

  interface Item {
    id: number;
    title: string;
    description?: string | null;
    assignee: string;
    dueDateTime: Date;
    status: number;
    listId: number;
    list: List;
  }

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch("/api/items/read");
        if (response.ok) {
          const items = await response.json();
          const tickets = items.map((item: Item) => ({
            id: item.id.toString(),
            title: item.title,
            description: item.description || "",
            assignee: item.assignee.toString(),
            dueDateTime: item.dueDateTime,
            state:
              item.status === 1
                ? "Todo"
                : item.status === 2
                ? "In Progress"
                : "Done",
          }));
          setItems(items);
          setTickets(tickets);
        } else {
          console.error("Failed to read items");
        }
      } catch (error) {
        console.error("Error reading items:", error);
      }
    };
    getItems();
  }, []);

  const reload = async () => {
    const getItems = async () => {
      try {
        const response = await fetch("/api/items/read");
        if (response.ok) {
          const items = await response.json();
          const tickets = items.map((item: Item) => ({
            id: item.id.toString(),
            title: item.title,
            description: item.description || "",
            assignee: item.assignee.toString(),
            dueDateTime: item.dueDateTime,
            state:
              item.status === 1
                ? "Todo"
                : item.status === 2
                ? "In Progress"
                : "Done",
          }));
          setItems(items);
          setTickets(tickets);
        } else {
          console.error("Failed to read items");
        }
      } catch (error) {
        console.error("Error reading items:", error);
      }
    };

    getItems();
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

    getAssignees();
  };

  function reloadContent(): void {
    reload();
  }

  return (
    <>
      {" "}
      <AddAssignee assignees={assignees} reload={reloadContent} />
      {"   "}
      <AddItem userName={userName} reload={reload} />
      <>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="mr-2">
              <a
                href="#"
                className={`${
                  selectedTab === "board"
                    ? "inline-flex p-4 text-sky-600 border-b-2 border-sky-600 rounded-t-lg active dark:text-sky-500 dark:border-sky-500 group"
                    : "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                }`}
                onClick={() => tabChange("board")}
              >
                <svg
                  aria-hidden="true"
                  className={`w-5 h-5 mr-2 ${
                    selectedTab === "board"
                      ? "w-5 h-5 mr-2 text-sky-600 dark:text-sky-500"
                      : "w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13zM1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H5V1H1.5zM10 15V1H6v14h4zm1 0h3.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H11v14z"
                    clipRule="evenodd"
                  />
                </svg>
                Board
              </a>
            </li>
            <li className="mr-2">
              <a
                href="#"
                className={`${
                  selectedTab === "allTasks"
                    ? "inline-flex p-4 text-sky-600 border-b-2 border-sky-600 rounded-t-lg active dark:text-sky-500 dark:border-sky-500 group"
                    : "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                }`}
                onClick={() => tabChange("allTasks")}
              >
                <svg
                  aria-hidden="true"
                  className={`w-5 h-5 mr-2 ${
                    selectedTab === "allTasks"
                      ? "w-5 h-5 mr-2 text-sky-600 dark:text-sky-500"
                      : "w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
                </svg>
                All Tasks
              </a>
            </li>
          </ul>

          <br />
          {selectedTab === "board" ? (
            <>
              <ToDoPanel
                assignees={assignees}
                reload={reload}
                userName={userName}
                tickets={tickets}
              />
            </>
          ) : (
            <>
              <ItemTable
                tickets={tickets}
                reload={reload}
                userName={userName}
                assignees={assignees}
              />
            </>
          )}
        </div>
      </>
    </>
  );
}

export default TabsElement;
