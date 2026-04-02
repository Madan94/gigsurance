const ADMIN_SESSION_KEY = "gigsurance_admin_session";

export type AdminSession = {
  email: string;
  token: string;
  expiresAt: number;
};

export const getAdminSession = (): AdminSession | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(ADMIN_SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as AdminSession;
    if (!parsed?.email || !parsed?.token || !parsed?.expiresAt) {
      return null;
    }

    const isExpired = Date.now() > parsed.expiresAt;
    if (isExpired) {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }

    return parsed;
  } catch {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    return null;
  }
};

export const isAdminAuthenticated = () => Boolean(getAdminSession());

export const setAdminSession = (session: AdminSession) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
};

export const clearAdminSession = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ADMIN_SESSION_KEY);
};

export const getAdminToken = () => getAdminSession()?.token ?? "";
