import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "./todo-pane";

interface TaskCardProps {
  task: Task;
  index: number;
  cardColor: string;
}

const TaskCard = ({ task, index, cardColor }: TaskCardProps) => {
  const getColorClass = (dueDateTime: string) => {
    const now = new Date();
    const dueDate = new Date(dueDateTime);

    if (dueDate < now) {
      return "text-red-500";
    } else if (dueDate.getTime() - now.getTime() <= 24 * 60 * 60 * 1000) {
      return "text-orange-500";
    } else {
      return "text-green-500";
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-lg shadow p-4 mb-4 ${cardColor}`}
        >
          <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
          <p className="text-gray-500 mb-2">{task.description}</p>
          <p className="text-gray-500 mb-2">Assignee: {task.assignee}</p>
          <p className={`mb-0 ${getColorClass(task.dueDateTime)}`}>
            Due Date: {task.dueDateTime}
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
