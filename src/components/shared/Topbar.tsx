import { ThemeToggle } from "@/theme/theme-provider";
import { Sparkles } from "lucide-react";

const Topbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="flex items-center justify-between px-6 py-4 w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shadow-md shadow-violet-200 dark:shadow-violet-900/40">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <h1 className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent text-xl font-bold tracking-tight">
              HabitFlow
            </h1>
            <p className="text-xs text-muted-foreground/80 font-medium">
              Build better habits
            </p>
          </div>
        </div>
        <ThemeToggle showLabel={true} />
      </div>
    </header>
  );
};

export default Topbar;