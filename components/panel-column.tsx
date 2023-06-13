import clsx from "clsx";
import { useDrop } from "react-dnd";
import { PropsWithChildren } from "react";
import PanelItemCard from "./panel-item-card";
import { State, Ticket } from "./todo-pane";

const updateItemState = async (itemId: string, newStatus: string) => {
  try {
    const response = await fetch("/api/items/move", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId: itemId,
        newStatus:
          newStatus === "Todo" ? 1 : newStatus === "In Progress" ? 2 : 3,
      }),
    });

    if (response.ok) {
      const item = await response.json();
      console.log("Item updated:", item);
    } else {
      console.error("Failed to update item");
    }
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

const PanelColumn = ({
  columnState,
  allTickets,
}: PropsWithChildren<{
  columnState: State;
  allTickets: Ticket[];
}>) => {
  const tickets: Ticket[] = [];
  allTickets.map((ticket) => {
    if (ticket.state === columnState) tickets.push(ticket);
  });
  const [{ isOver, canDrop }, drop] = useDrop<
    Ticket,
    void,
    { canDrop: boolean; isOver: boolean }
  >(() => ({
    accept: "ticket",
    drop: (ticket) => {
      //moveTicket(ticket, columnState);
      ticket.state = columnState;
      updateItemState(ticket.id, columnState);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <div
      ref={drop}
      className={clsx(
        "h-full flex basis-full bg-slate-200 rounded-xl flex-col text-black overflow-hidden",
        {
          "bg-slate-300": isOver,
          "ring ring-blue-200": canDrop,
        }
      )}
    >
      <p className="h-10 flex items-center justify-center text-xl bg-slate-100 font-medium">
        {columnState}
      </p>
      <div className={clsx("rounded-xl flex flex-col gap-2 p-2")}>
        {tickets.map((ticket) => (
          <PanelItemCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default PanelColumn;
