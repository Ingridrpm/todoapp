import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./task-card";
import { Task } from "./todo-pane";

interface ColumnProps {
  title: string;
  tasks: Task[];
  column: string;
  cardColor: string;
  columnColor: string;
  titleColor: string;
}

const Column = ({
  title,
  tasks,
  column,
  cardColor,
  columnColor,
  titleColor,
}: ColumnProps) => {
  const columnTasks = tasks.filter((task) => task.column === column);

  return (
    <div className={`rounded-lg shadow ${columnColor} p-4`}>
      <h2 className={`text-lg font-semibold mb-4 ${titleColor}`}>{title}</h2>
      <Droppable droppableId={column}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {columnTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                cardColor={cardColor}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
