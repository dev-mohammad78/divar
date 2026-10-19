import { Toaster } from "react-hot-toast";
import AuthPage from "./pages/AuthPage";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          className: "custom-toast",
        }}
      />
      <Router />
    </BrowserRouter>
    
    // <div className="bg-[var(--bg-tertiary)]">
    //   {/* <h1 className="text-3xl font-semibold">پروژه دیوار</h1> */}

    //   <AuthPage />
    // </div>
  );
}

export default App;
