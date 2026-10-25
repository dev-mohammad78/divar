import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  const { pathname } = useLocation();
  const isAuthPage = pathname.startsWith("/auth");
  return (
    <>
      {!isAuthPage && <Header />}
      {children}
      <Footer />
    </>
  );
}

export default Layout;
