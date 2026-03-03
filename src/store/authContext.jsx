import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import api from "../api/api";
import endpoints from "../api/endpoints";
import AppLoader from "../components/loader/AppLoader";

const AuthContext = createContext({});

function deriverUser(accessToken) {
  if (!accessToken) return null;
  const payload = jwtDecode(accessToken);
  return {
    id: payload.sub,
    email: payload.email,
    isAdmin: payload.isAdmin === "true",
    timeZone: payload.timeZone,
  };
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const user = deriverUser(accessToken);

  // Use a ref so interceptors always read the latest token without
  // needing to re-register on every token change.
  const tokenRef = useRef(accessToken);
  useEffect(() => {
    tokenRef.current = accessToken;
  }, [accessToken]);

  const refresh = useCallback(async () => {
    const res = await api.post(endpoints.auth.refresh, {}, {
      skipAuthRefresh: true,
    });
    const token = res.data.accessToken;
    setAccessToken(token || null);
    return token;
  }, []);

  // Keep refresh in a ref so the response interceptor always calls
  // the latest version without needing to re-register.
  const refreshRef = useRef(refresh);
  useEffect(() => {
    refreshRef.current = refresh;
  }, [refresh]);

  const withCredentials = async (endpoint, body = {}) => {
    const res = await api.post(endpoint, body);
    const token = res.data.accessToken;
    setAccessToken(token || null);
    return res;
  };

  const login = (email, password) =>
    withCredentials(endpoints.auth.login, { email, password });

  const register = (email, password) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return withCredentials(endpoints.auth.register, {
      email,
      password,
      timeZone,
    });
  };

  const logout = useCallback(async () => {
    setIsAuthLoading(true);
    await withCredentials(endpoints.auth.logout, {});
    setIsAuthLoading(false);
  }, []);

  // Request interceptor — attach token from ref (always fresh).
  // Registered once, never re-registered.
  useLayoutEffect(() => {
    const id = api.interceptors.request.use((config) => {
      if (!config.retryRefresh && !config.skipAuthRefresh && tokenRef.current) {
        config.headers.Authorization = "Bearer " + tokenRef.current;
      }
      return config;
    });
    return () => api.interceptors.request.eject(id);
  }, []);

  // Response interceptor — on 401, attempt one token refresh then retry.
  // Registered once, never re-registered.
  useLayoutEffect(() => {
    let isRefreshing = false;
    let refreshQueue = [];

    const id = api.interceptors.response.use(
      (response) => response,
      async (err) => {
        const originalRequest = err.config;

        if (
          err.response?.status === 401 &&
          originalRequest &&
          !originalRequest.retryRefresh &&
          !originalRequest.skipAuthRefresh
        ) {
          originalRequest.retryRefresh = true;

          // If a refresh is already in progress, queue this request
          // so we don't fire multiple concurrent refreshes.
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              refreshQueue.push({ resolve, reject, config: originalRequest });
            });
          }

          isRefreshing = true;

          try {
            const newToken = await refreshRef.current();
            // Retry queued requests with the new token
            refreshQueue.forEach(({ resolve, config }) => {
              config.headers.Authorization = `Bearer ${newToken}`;
              resolve(api(config));
            });
            refreshQueue = [];

            // Retry the original request
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            // Refresh failed — reject all queued requests
            refreshQueue.forEach(({ reject }) => reject(refreshError));
            refreshQueue = [];
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(err);
      }
    );

    return () => api.interceptors.response.eject(id);
  }, []);

  // On app load, try to refresh the token from the httpOnly cookie.
  useLayoutEffect(() => {
    const handleRefresh = async () => {
      try {
        await refresh();
      } catch {
        console.log("No refresh token on app load");
      } finally {
        setIsAuthLoading(false);
      }
    };
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthLoading) {
    return <AppLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refresh,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
