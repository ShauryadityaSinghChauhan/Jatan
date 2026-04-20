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
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 items-center justify-center">
        {/* Decorative blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 rounded-full bg-purple-400/20 blur-3xl" />
        <HabitVisualization />
      </div>
    </div>
  );
};

export default AuthLayout;