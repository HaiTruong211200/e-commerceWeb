import { Suspense, lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";

// Redux Toolkit
import { useDispatch } from "react-redux";
import { setHeaderTheme, setIsTransference } from "shared/header/headerSlice";
import { setNaviToBackHome } from "shared/navi/navigateSlice";
import { setHideNavBar } from "shared/navi/navigateSlice";

// Components
import Header from "./shared/header/newHeader";
import Navigation from "./shared/navi/Navigate";
import { Loading } from "./shared/components";
import Toast from "shared/components/toast/Toast";
import Auth from "pages/SignIn/Auth";
import UserProfile from "./pages/Member/UserProfile";

// Pages - lazy loading.
const Women = lazy(() => import("./pages/AD/Women/Women"));
const Men = lazy(() => import("./pages/AD/Men/Men"));
const Member = lazy(() => import("./pages/Member/UserProfile"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const Wishlist = lazy(() => import("./pages/Wishlist/Wishlist"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Layout = lazy(() => import("./pages/Layout/Layout"));
const Product = lazy(() => import("./pages/Products/Product"));
const Order = lazy(() => import("./pages/Order/MyOrder"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const Statistic = lazy(() => import("./pages/Admin/statistic/Statistic"));
const ForgotPassword = lazy(() => import("./pages/Password/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/Password/ResetPassword"));
const Footer = lazy(() => import("./shared/footer/Footer"));

const RouteChangeHandler = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    switch (location.pathname) {
      case "/men":
      case "/women":
        dispatch(setHeaderTheme("dark"));
        dispatch(setNaviToBackHome(false));
        break;
      default:
        dispatch(setHeaderTheme("light"));
        dispatch(setNaviToBackHome(false));
        dispatch(setHideNavBar(false));
        dispatch(setIsTransference(true));
    }
  }, [location, dispatch]);

  return null;
};

function LayoutWraper() {
  const { section, category } = useParams();
  if (!category) {
    return section === "men" ? <Men /> : <Women />;
  }

  return <Layout />;
}

function App() {
  const location = useLocation();
  const hideHeaderPaths = ["/signin", "/forgotPassword", "/resetPassword"];

  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);
  return (
    <>
      {!shouldHideHeader && <Header />}
      <Toast />
      <RouteChangeHandler />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/women" />} />
          <Route path="/member" element={<UserProfile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/statistic" element={<Statistic />} />

          <Route path="/:section" element={<LayoutWraper />} />
          <Route path="/:section/:category" element={<LayoutWraper />} />

          <Route path="/product/:productId" element={<Product />} />
          <Route path="/auth" element={<Auth />} />

          <Route path="*" element={<Navigate to="/women" />} />
        </Routes>
      </Suspense>
      <Navigation />
      <Footer />
    </>
  );
}

export default App;
