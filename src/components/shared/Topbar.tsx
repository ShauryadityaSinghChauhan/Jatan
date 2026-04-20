import { Sparkles } from "lucide-react";
import { useAuthStatus } from "@/hooks/useAuthStatus";

const Topbar = () => {
  const { userEmail } = useAuthStatus();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="flex items-center justify-between px-6 py-4 w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-md shadow-yellow-200 dark:shadow-yellow-900/40">
            <Sparkles className="w-5 h-5 text-amber-950" />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <h1 className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent text-xl font-bold tracking-tight">
              HabitFlow
            </h1>
            <p className="text-xs text-muted-foreground/80 font-medium">
              Build better habits
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="text-sm font-medium text-muted-foreground hidden sm:block">
              {userEmail}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;