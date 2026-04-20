import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebaseConfig";
import { dataService } from "@/services/dataService";

const LOCAL_AUTH_KEY = "habitflow_local_auth";

/** Check if the user is "logged in" via the simple local-auth fallback */
export const isLocallyAuthenticated = (): boolean => {
  return localStorage.getItem(LOCAL_AUTH_KEY) === "true";
};

/** Log in using the local-auth fallback (no Firebase needed) */
export const localLogin = (email: string, _password: string): void => {
  localStorage.setItem(LOCAL_AUTH_KEY, "true");
  localStorage.setItem("habitflow_local_user", JSON.stringify({ email, name: email.split("@")[0] }));
};

/** Log out from the local-auth fallback */
export const localLogout = (): void => {
  localStorage.removeItem(LOCAL_AUTH_KEY);
  localStorage.removeItem("habitflow_local_user");
};

export const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // If Firebase is configured, use real auth listener
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserEmail(user.email);
          await dataService.syncFromCloud(user.uid);
          setIsAuthenticated(true);
        } else {
          setUserEmail(null);
          setIsAuthenticated(false);
        }
      });
      return () => unsubscribe();
    }

    // Otherwise fall back to localStorage-based auth
    setIsAuthenticated(isLocallyAuthenticated());
    const localUserStr = localStorage.getItem("habitflow_local_user");
    if (localUserStr) {
      try {
        const localUser = JSON.parse(localUserStr);
        setUserEmail(localUser.email);
      } catch(e) {}
    }

    // Listen for storage changes so multiple tabs stay in sync
    const onStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_AUTH_KEY) {
        setIsAuthenticated(e.newValue === "true");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { isAuthenticated, userEmail };
};
