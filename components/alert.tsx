type AlertProps = {
  children: React.ReactNode;
};
export const Alert = ({ children }: AlertProps) => {
  return <div className="p-2 rounded bg-red-500">{children}</div>;
};
export const GreenAlert = ({ children }: AlertProps) => {
  return <div className="p-2 rounded bg-green-500">{children}</div>;
};
