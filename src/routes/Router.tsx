import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GlobalErrorFallBack from "src/components/pages/errors/GlobalErrorFallBack";
import ProductFetch from "src/components/pages/product-fetch/ProductFetch";
import ProductManage from "src/components/pages/product-manage/ProductManage";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRouter />,
      errorElement: <GlobalErrorFallBack />,
      children: [
        {
          path: "/product-fetch",
          element: <ProductFetch />,
        },
        {
          path: "/product-manage/:vendor",
          element: <ProductManage />,
        },
      ],
    },
    {
      element: <PublicRouter />,
      children: [],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
