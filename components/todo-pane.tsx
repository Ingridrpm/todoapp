import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PanelColumn from "./panel-column";
import { Ticket, State } from "./tabs-elemet";

interface ToDoPanelProps {
  tickets: Ticket[];
  reload: () => void;
  userName: string;
}

const ToDoPanel = ({ tickets, reload, userName }: ToDoPanelProps) => {
  const columns = ["Todo", "In Progress", "Done"];
  return (
    <DndProvider backend={HTML5Backend}>
      <main
        className={`p-2 flex min-h-screen bg-white dark:bg-slate-950 gap-2`}
      >
        <div className="flex w-full gap-4">
          {columns.map((columnState) => (
            <PanelColumn
              allTickets={tickets}
              key={columnState}
              columnState={columnState as State}
              reload={reload}
              userName={userName}
            />
          ))}
        </div>
      </main>
    </DndProvider>
  );
};

export default ToDoPanel;
