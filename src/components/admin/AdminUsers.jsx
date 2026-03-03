import { useState } from "react";
import { Checkbox, Loader, Pagination, Table } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import DashboardSection from "../ui/DashboardSection";
import useUsers from "../../hooks/admin/useUsers";

const PAGE_SIZE = 20;

export default function AdminUsers() {
  const [page, setPage] = useState(0);
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const { t } = useTranslation();
  const { data, isLoading, error } = useUsers({ includeDeleted, page, size: PAGE_SIZE });

  const users = data?.content ?? [];
  const totalPages = data?.page?.totalPages ?? data?.totalPages ?? 1;

  if (error) {
    return (
      <DashboardSection className="gap-8">
        <h1 className="text-2xl sm:text-3xl font-semibold">{t("admin.title")}</h1>
        <p className="text-red-500 text-sm">{t("admin.accessDenied")}</p>
      </DashboardSection>
    );
  }

  return (
    <DashboardSection className="gap-8">
      <div className="flex flex-col pb-4 border-b gap-3 border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
            <IconUsers size={22} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold">{t("admin.title")}</h1>
            {!isLoading && (
              <p className="text-sm text-gray-400 mt-0.5">
                {t("admin.totalUsers", { count: data?.page?.totalElements ?? users.length })}
              </p>
            )}
          </div>
        </div>
      </div>

      <Checkbox
        label={t("admin.includeDeleted")}
        checked={includeDeleted}
        onChange={(e) => {
          setIncludeDeleted(e.currentTarget.checked);
          setPage(0);
        }}
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader size="lg" />
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto border border-gray-100 rounded-xl">
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>{t("admin.email")}</Table.Th>
                  <Table.Th>{t("admin.firstName")}</Table.Th>
                  <Table.Th>{t("admin.lastName")}</Table.Th>
                  <Table.Th>{t("admin.age")}</Table.Th>
                  <Table.Th>{t("admin.timeZone")}</Table.Th>
                  <Table.Th>{t("admin.status")}</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {users?.map((user) => (
                  <Table.Tr key={user.email}>
                    <Table.Td className="font-medium">{user.email}</Table.Td>
                    <Table.Td>{user.firstName ?? "-"}</Table.Td>
                    <Table.Td>{user.lastName ?? "-"}</Table.Td>
                    <Table.Td>{user.age ?? "-"}</Table.Td>
                    <Table.Td>{user.timeZone ?? "-"}</Table.Td>
                    <Table.Td>
                      <StatusBadge deletedAt={user.deletedAt} />
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>

          {/* Mobile card list */}
          <div className="sm:hidden flex flex-col gap-3">
            {users?.map((user) => (
              <div
                key={user.email}
                className="border border-gray-100 rounded-xl p-4 flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm truncate mr-2">{user.email}</p>
                  <StatusBadge deletedAt={user.deletedAt} />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-500">
                  <span>
                    {[user.firstName, user.lastName].filter(Boolean).join(" ") || "-"}
                  </span>
                  <span>{user.age ? t("admin.ageValue", { age: user.age }) : ""}</span>
                  <span className="col-span-2 text-xs text-gray-400">{user.timeZone ?? "-"}</span>
                </div>
              </div>
            ))}
          </div>

          {users.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-sm">{t("admin.noUsers")}</p>
          )}

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
        </>
      )}
    </DashboardSection>
  );
}

function StatusBadge({ deletedAt }) {
  const { t } = useTranslation();
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
        deletedAt
          ? "bg-red-50 text-red-600"
          : "bg-green-50 text-green-600"
      }`}
    >
      {deletedAt ? t("admin.deleted") : t("admin.active")}
    </span>
  );
}
