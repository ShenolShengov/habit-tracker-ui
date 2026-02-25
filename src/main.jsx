import { createRoot } from "react-dom/client";
import "./i18n/i18n";
import "./index.css";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { AuthProvider } from "./store/authContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <Notifications position="top-right" autoClose={2500} />
      <AuthProvider>
        <App />
      </AuthProvider>
    </MantineProvider>
  </QueryClientProvider>
);
