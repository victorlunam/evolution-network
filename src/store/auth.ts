import { Session } from "@models/session";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
  user: Session | null;
  signIn: (user: Session) => void;
  signOut: () => void;
};

const useAuth = create<AuthState, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      user: null,
      signIn: (user) => {
        set({
          user,
        });
      },
      signOut: () => {
        set({
          user: null,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuth;
