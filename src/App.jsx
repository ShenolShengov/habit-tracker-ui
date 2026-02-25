import { BrowserRouter, Route, Routes } from "react-router";
import GuestGuard from "./guards/GuestGuard";
import GuestLayout from "./layouts/GuestLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import AuthGuard from "./guards/AuthGuard";
import AdminGuard from "./guards/AdminGuard";
import Home from "./components/home/Home";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./components/dashboard/Dashboard";
import AddHabit from "./components/habits/addHabit/AddHabit";
import HabitDetails from "./components/habits/habitDetails/HabitDetails";
import Profile from "./components/profile/Profile";
import AdminUsers from "./components/admin/AdminUsers";
import "./config/dayjsSetup";
import NotFound from "./components/notFound/NotFound";
import QA from "./components/qa/QA";
import Help from "./components/help/Help";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestGuard />}>
          <Route element={<GuestLayout />}>
            <Route index element={<Home />} />
            <Route path="/qa" element={<QA />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
        <Route element={<AuthGuard />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/habits/create" element={<AddHabit />} />
            <Route path="/habits/edit/:id" element={<AddHabit />} />
            <Route path="/habits/details/:id" element={<HabitDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/help" element={<Help />} />
            <Route element={<AdminGuard />}>
              <Route path="/admin" element={<AdminUsers />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
