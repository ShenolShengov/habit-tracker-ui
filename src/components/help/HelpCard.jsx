export default function HelpCard({ Icon, title, description, steps }) {
  return (
    <div className="flex flex-col gap-4 p-5 border border-gray-200 border-solid rounded-xl">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600">
          <Icon size={20} stroke={1.5} />
        </div>
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
      <ol className="flex flex-col gap-2 pl-5 m-0 list-decimal">
        {steps.map((step, index) => (
          <li key={index} className="text-sm text-gray-600">
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
