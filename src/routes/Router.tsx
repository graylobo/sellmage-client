import * as Sentry from "@sentry/react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import PrivateRouterErrorFallBack from "src/components/pages/errors/PrivateRouterErrorFallBack";
import ProductFetch from "src/components/pages/product-fetch/ProductFetch";
import ProductManage from "src/components/pages/product-manage/ProductManage";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

function Router() {
  const handleError = (error: Error, info: React.ErrorInfo) => {
    console.error("Router :", error);
    Sentry.captureException(error, {
      extra: { componentStack: info.componentStack },
    });
  };
  const router = createHashRouter([
    {
      path: "/",
      element: <PrivateRouter />,
      errorElement: <PrivateRouterErrorFallBack />,
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
