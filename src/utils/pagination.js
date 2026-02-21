function toPositiveInt(value) {
  const num = Number(value);
  return Number.isInteger(num) && num > 0 ? num : null;
}

function getFromCandidates(source, candidates) {
  for (const key of candidates) {
    const value = source?.[key];
    if (value !== undefined && value !== null) {
      return value;
    }
  }
  return undefined;
}

export function normalizePaginatedData(raw, fallbackSize = 20) {
  const payload = raw?.data ?? raw ?? {};
  const content = Array.isArray(payload.content)
    ? payload.content
    : Array.isArray(payload.items)
      ? payload.items
      : Array.isArray(payload.results)
        ? payload.results
        : [];

  const topLevelTotalPages = toPositiveInt(
    getFromCandidates(payload, ["totalPages", "total_pages", "pages", "pageCount", "totalPage"])
  );
  const nestedTotalPages = toPositiveInt(
    getFromCandidates(payload?.page, ["totalPages", "total_pages", "pages", "pageCount", "totalPage"])
  );

  let totalPages = topLevelTotalPages ?? nestedTotalPages;
  if (!totalPages) {
    const totalElements = Number(
      getFromCandidates(payload, ["totalElements", "total", "totalCount", "count"])
    );
    const pageSize =
      toPositiveInt(getFromCandidates(payload, ["size", "pageSize"])) ??
      toPositiveInt(getFromCandidates(payload?.pageable, ["pageSize"])) ??
      fallbackSize;

    if (Number.isFinite(totalElements) && totalElements >= 0 && pageSize > 0) {
      totalPages = Math.max(1, Math.ceil(totalElements / pageSize));
    }
  }

  return {
    content,
    totalPages: totalPages ?? 1,
  };
}
