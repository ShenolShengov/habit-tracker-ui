export default function Section({
  children,
  image,
  direction = "column",
  ...props
}) {
  let classes = "w-full flex justify-between items-center gap-8 sm:gap-12 lg:gap-16";
  if (direction === "column") {
    classes += " flex-col";
  } else {
    classes += " flex-col lg:flex-row";
  }
  return (
    <div className={classes} {...props}>
      {children}
      {image && (
        <div className="w-full">
          <img src={image} alt="Steps to manage habit" className="w-full" />
        </div>
      )}
    </div>
  );
}
