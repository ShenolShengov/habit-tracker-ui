import { useState } from "react";
import { Checkbox, Pagination, Table } from "@mantine/core";
import DashboardSection from "../ui/DashboardSection";
import AppLoader from "../loader/AppLoader";
import useUsers from "../../hooks/admin/useUsers";

const PAGE_SIZE = 20;

export default function AdminUsers() {
  const [page, setPage] = useState(0);
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const { data, isLoading, error } = useUsers({ includeDeleted, page, size: PAGE_SIZE });

  if (isLoading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <DashboardSection className="gap-8">
        <h1 className="text-3xl font-semibold">User Management</h1>
        <p className="text-red-600">Access denied. You do not have permission to view this page.</p>
      </DashboardSection>
    );
  }

  const users = data?.content ?? [];
  const totalPages = data?.page?.totalPages ?? data?.totalPages ?? 1;

  return (
    <DashboardSection className="gap-8">
      <div className="flex flex-col pb-4 border-b gap-4 border-gray-400">
        <h1 className="text-3xl font-semibold">User Management</h1>
      </div>

      <Checkbox
        label="Include deleted users"
        checked={includeDeleted}
        onChange={(e) => {
          setIncludeDeleted(e.currentTarget.checked);
          setPage(0);
        }}
      />

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Email</Table.Th>
            <Table.Th>First Name</Table.Th>
            <Table.Th>Last Name</Table.Th>
            <Table.Th>Age</Table.Th>
            <Table.Th>Time Zone</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users?.map((user) => (
            <Table.Tr key={user.email}>
              <Table.Td>{user.email}</Table.Td>
              <Table.Td>{user.firstName ?? "-"}</Table.Td>
              <Table.Td>{user.lastName ?? "-"}</Table.Td>
              <Table.Td>{user.age ?? "-"}</Table.Td>
              <Table.Td>{user.timeZone ?? "-"}</Table.Td>
              <Table.Td>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.deletedAt
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {user.deletedAt ? "Deleted" : "Active"}
                </span>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            total={totalPages}
            value={page + 1}
            onChange={(p) => setPage(p - 1)}
            withControls
            withEdges
          />
        </div>
      )}
    </DashboardSection>
  );
}
