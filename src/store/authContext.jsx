import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
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

  const withCredentials = async (endpoint, body = {}) => {
    const res = await api.post(endpoint, body, { withCredentials: true });
    const token = res.data.accessToken;
    setAccessToken(token || null);    
    return res;
  };

  const refresh = useCallback(
    async () => withCredentials(endpoints.auth.refresh, {}),
    []
  );

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

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (!config.retryRefresh && accessToken) {
        config.headers.Authorization = "Bearer " + accessToken;
      }
      return config;
    });
    return () => api.interceptors.request.eject(authInterceptor);
  }, [accessToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest.retryRefresh) {
          originalRequest.retryRefresh = true;
          try {
            const response = await refresh();
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return api(originalRequest);
          } catch(e) {
            return Promise.reject(e);
          }
        }

        return Promise.reject(err);
      }
    );

    return () => api.interceptors.response.eject(refreshInterceptor);
  }, [refresh, accessToken]);

  useLayoutEffect(() => {
    const handleRefresh = async () => {
      try {
        await refresh();
      } catch {
        console.log("No refresth token on app load");
      } finally {
        setIsAuthLoading(false);
      }
    };
    handleRefresh();
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
