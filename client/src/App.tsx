import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import UIElements from "@/components/ui/ui-elements";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Admin from "@/pages/admin";
import OrderPage from "@/pages/order";
import { FormProvider } from "./context/form-context";
import { ThemeProvider } from "./context/theme-context";
import { UIProvider } from "./context/ui-context";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/order" component={OrderPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <FormProvider>
        <UIProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              {/* Global UI elements like loaders and alerts */}
              <UIElements />
              <Toaster />
              <Router />
            </TooltipProvider>
          </QueryClientProvider>
        </UIProvider>
      </FormProvider>
    </ThemeProvider>
  );
}

export default App;
