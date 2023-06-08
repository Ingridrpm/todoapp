"use client";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./column";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDateTime: string;
  column: string;
}

interface ToDoPanelProps {
  items: Task[]; // Define the tasks prop of type Task[]
}

const ToDoPanel: React.FC<ToDoPanelProps> = ({ items }) => {
  console.log(items);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task1",
      title: "Task 1",
      description: "Description for Task 1",
      assignee: "John Doe",
      dueDateTime: "2023-06-30T12:00:00",
      column: "todo",
    },
    {
      id: "task2",
      title: "Task 2",
      description: "Description for Task 2",
      assignee: "Jane Smith",
      dueDateTime: "2023-06-30T14:00:00",
      column: "todo",
    },
    // Add more tasks here...
  ]);

  const dragEnd = (result: any) => {
    //point
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const updatedTasks = [...tasks];
    const movedTask = updatedTasks.splice(source.index, 1)[0];
    movedTask.column = destination.droppableId; // Update the column attribute
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={dragEnd}>
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
  );
};

export default ToDoPanel;
