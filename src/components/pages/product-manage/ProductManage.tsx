import { Spin } from "antd";
import React, { Suspense } from "react";
import ProductManageLayout from "src/components/layout/product-manage/ProductManageLayout";

function ProductManage() {
  return (
    <Suspense fallback={<Spin tip="Loading..." size="large" />}>
      <ProductManageLayout />
    </Suspense>
  );
}

export default ProductManage;
