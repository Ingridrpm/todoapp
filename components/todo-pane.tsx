"use client";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
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
  items: Task[];
}

const ToDoPanel: React.FC<ToDoPanelProps> = ({ items }) => {
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
  );
};

export default ToDoPanel;
