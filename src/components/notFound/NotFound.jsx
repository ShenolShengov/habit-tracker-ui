import { Button } from "@mantine/core";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col justify-center items-center font-outfit gap-4 px-4">
      <h1 className="text-6xl sm:text-8xl font-bold text-blue-600">404</h1>
      <p className="text-2xl sm:text-3xl text-center font-semibold">
        Page not found
      </p>
      <p className="text-sm sm:text-base text-center text-gray-400 max-w-sm">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Button
        component={Link}
        to="/"
        variant="filled"
        size="md"
        radius="md"
        className="mt-2"
      >
        Go to homepage
      </Button>
    </div>
  );
}
