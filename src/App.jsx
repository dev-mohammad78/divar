import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import defaultOptions from "./configs/reactQuery";
import Router from "./router/Router";
import Layout from "./layouts/Layout";
import ScrollToTop from "./layouts/ScrollToTop";

const queryClient = new QueryClient({ defaultOptions });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
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
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}{" "}
    </QueryClientProvider>
  );
}

export default App;
