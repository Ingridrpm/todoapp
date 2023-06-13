"use client";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./column";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PanelColumn from "./panel-column";
import { List } from "@prisma/client";

export type State = "Todo" | "In Progress" | "Done";

export type Ticket = {
  title: string;
  state: State;
  id: string;
  description?: string | null;
  assignee: string;
  dueDateTime: Date;
};

const ToDoPanel = () => {
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

  const getItems = async () => {
    try {
      const response = await fetch("/api/items/read", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const items = await response.json();
        const tickets: Ticket[] = items.map((item: Item) => ({
          id: item.id + "",
          title: item.title,
          description: item.description ?? "",
          assignee: item.assignee + "",
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
        return [];
      }
    } catch (error) {
      console.error("Error reading items:", error);
      return [];
    }
  };

  getItems();

  //const { state, moveTicket } = useTicketManager(tickets);

  const columns = ["Todo", "In Progress", "Done"];
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={`p-2 flex min-h-screen bg-white gap-2`}>
        <button className="absolute bottom-4 left-4 rounded-lg bg-slate-950 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 px-4 py-2">
          Reset
        </button>
        <div className="flex w-full gap-4">
          {columns.map((columnState) => (
            <PanelColumn
              allTickets={tickets}
              key={columnState}
              columnState={columnState as State}
            />
          ))}
        </div>
      </main>
    </DndProvider>
  );
  /*
  console.log(items);
  const [tasks, setTasks] = useState<Task[]>(items);

  const onDragEnd = async (result: DropResult) => {
    const { draggableId, source, destination } = result;

    if (!destination) {
      return;
    }

    const updatedTasks = [...tasks];
    const movedTask = updatedTasks.find((task) => task.id === draggableId);

    if (movedTask) {
      movedTask.column = destination.droppableId;
      setTasks(updatedTasks);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-center py-8 bg-gray-100 dark:bg-gray-900">
        <div className="grid grid-cols-3 gap-8">
          <Column
            title="To-Do"
            tasks={tasks}
            column="todo"
            cardColor="bg-gray-300 dark:bg-gray-700"
            columnColor="bg-gray-300 dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50"
            titleColor="text-gray-700 dark:text-gray-300"
          />
          <Column
            title="In Process"
            tasks={tasks}
            column="inProcess"
            cardColor="bg-blue-300 dark:bg-blue-700"
            columnColor="bg-blue-300 dark:bg-blue-700 bg-opacity-50 dark:bg-opacity-50"
            titleColor="text-blue-700 dark:text-blue-300"
          />
          <Column
            title="Done"
            tasks={tasks}
            column="done"
            cardColor="bg-green-300 dark:bg-green-700"
            columnColor="bg-green-300 dark:bg-green-700 bg-opacity-50 dark:bg-opacity-50"
            titleColor="text-green-700 dark:text-green-300"
          />
        </div>
      </div>
    </DragDropContext>
  );*/
};

export default ToDoPanel;
