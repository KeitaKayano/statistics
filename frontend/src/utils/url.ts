// src/utils/url.ts

export const buildQueryString = (
  params: Record<string, string | number | boolean | null | undefined>
): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    // null や undefined はクエリに含めないようにガードすると安全です
    if (value !== null && value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  return queryParams.toString();
};
