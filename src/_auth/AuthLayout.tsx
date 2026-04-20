import { HabitVisualization } from "@/components/shared/HabitVisualization";
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "@/hooks/useAuthStatus";

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStatus();

  if (isAuthenticated === null) {
    // While checking authentication status
    return (
      <div className="flex justify-center items-center min-h-screen text-muted-foreground">
        Checking authentication...
      </div>
    );
  }

  // If user is already authenticated → redirect to home page
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="dark min-h-screen w-full flex bg-background">
      {/* Left Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Brand Header */}
          <div className="lg:hidden text-center mb-4 space-y-2">
            <h1 className="text-4xl tracking-tight text-foreground">
              HabitFlow
            </h1>
            <p className="text-muted-foreground">
              Build better habits, one day at a time
            </p>
          </div>

          {/* Auth Form Section */}
          <section className="flex flex-1 justify-center items-center flex-col p-4">
            <Outlet />
          </section>
        </div>
      </div>

      {/* Right Side - Habit Visualization (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-white via-yellow-50 to-amber-100 dark:from-slate-900 dark:via-yellow-950/30 dark:to-slate-900 items-center justify-center border-l border-border/50">
        {/* Decorative Solar blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-72 h-72 rounded-full bg-yellow-400/40 blur-3xl mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 rounded-full bg-amber-500/30 blur-3xl mix-blend-multiply dark:mix-blend-screen" />
        <HabitVisualization />
      </div>
    </div>
  );
};

export default AuthLayout;