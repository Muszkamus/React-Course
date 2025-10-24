import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";

import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/* ----------- React Query Configuration ----------- */
// Create one QueryClient instance for the entire app
// - `staleTime`: data remains "fresh" for 5 seconds (prevents unnecessary refetches)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 1000 },
  },
});

function App() {
  return (
    // Provide React Query client to all components in the app
    <QueryClientProvider client={queryClient}>
      {/* Devtools allow inspecting cache, queries, and mutations */}
      <ReactQueryDevtools initialIsOpen={false} />

      {/* Global CSS variables, typography, layout reset */}
      <GlobalStyles />

      {/* ----------- Routing Structure ----------- */}
      <BrowserRouter>
        <Routes>
          {/* Shared layout for authenticated pages (sidebar/topbar, etc.) */}
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          {/* Default redirect to dashboard */}
          <Route index element={<Navigate replace to="dashboard" />} />

          {/* Public routes */}
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      {/* ----------- Global Toast Notifications ----------- */}
      {/* Displays messages triggered by toast.success(), toast.error(), etc. */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 3000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
