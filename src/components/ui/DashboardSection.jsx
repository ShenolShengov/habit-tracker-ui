export default function DashboardSection({ children, className }) {
  const classes = `flex-1 flex flex-col p-6 sm:p-10 lg:p-16 font-outfit ${className ?? ""}`;
  return <div className={classes}>{children}</div>;
}
