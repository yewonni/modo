import { useAuthStore } from "@/store/authStore";
import { refreshAccessToken } from "@/lib/api";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const { accessToken, setAccessToken, clearAccessToken } =
    useAuthStore.getState();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  let response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401 && !isRefreshing) {
    isRefreshing = true;

    try {
      const newAccessToken = await refreshAccessToken();
      setAccessToken(newAccessToken);
      processQueue(null, newAccessToken);

      response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
        credentials: "include",
      });
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearAccessToken();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw refreshError;
    } finally {
      isRefreshing = false;
    }
  } else if (response.status === 401 && isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({
        resolve: async (token: string) => {
          try {
            const retryResponse = await fetch(url, {
              ...options,
              headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            });

            if (!retryResponse.ok) {
              throw new Error("재시도 실패");
            }

            const data = await retryResponse.json();
            resolve(data);
          } catch (err) {
            reject(err);
          }
        },
        reject,
      });
    });
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "요청 실패");
  }

  return response.json();
}
