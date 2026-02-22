export default function HomeSectionHeader({
  preTitle,
  title,
  description,
  center = true,
  children,
}) {
  let classes = "flex flex-col gap-4 justify-center flex-1";
  let titleClasses = "font-outfit text-3xl sm:text-4xl lg:text-5xl/[1.1] font-semibold tracking-tight";
  let descriptionClasses = "text-base sm:text-lg text-gray-500";
  if (center) {
    classes += " items-center";
    titleClasses += " text-center";
    descriptionClasses += " text-center max-w-2xl";
  } else {
    classes += " items-baseline";
  }
  return (
    <div className={classes}>
      <p className="font-outfit text-sm font-semibold text-blue-600 uppercase tracking-wider">{preTitle}</p>
      <h2 className={titleClasses}>{title}</h2>
      <p className={descriptionClasses}>{description}</p>
      {children}
    </div>
  );
}
