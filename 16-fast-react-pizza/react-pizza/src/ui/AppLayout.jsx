import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  // below will work in any case becasue API will show "loading". It means Loader will appear anywhere, where API is loading.
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      {isLoading && <Loader />}

      <Header />

      <main>
        <h1>Content</h1>
        {/* OUTLET needs to be used in the parent component for routes, in order to render UI */}
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
