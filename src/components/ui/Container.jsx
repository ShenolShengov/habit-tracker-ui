export default function Container({ children, className }) {
  let classes = "flex w-full max-w-[1360px] px-4 sm:px-8 mx-auto";
  if (className) {
    classes += ` ${className}`;
  }
  return <div className={classes}>{children}</div>;
}
