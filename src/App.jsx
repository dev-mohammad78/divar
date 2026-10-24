import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { Toaster } from "react-hot-toast";

import defaultOptions from "./configs/reactQuery";
import Router from "./router/Router";
import Layout from "./layouts/Layout";

const queryClient = new QueryClient({ defaultOptions });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          className: "custom-toast",
        }}
      />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
