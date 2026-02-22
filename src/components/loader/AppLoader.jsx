import { Loader } from "@mantine/core";

export default function AppLoader({ size = "xl" } = {}) {
  return (
    <div className="flex min-h-dvh justify-center items-center w-full">
      <Loader size={size} />
    </div>
  );
}
