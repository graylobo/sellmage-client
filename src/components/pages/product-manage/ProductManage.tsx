import { DataGrid } from "@mui/x-data-grid";
import { Button, Spin } from "antd";
import { saveAs } from "file-saver";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { BrowserPopup } from "src/components/common/browser-popup/BrowserPopup";
import ProductInsertModal from "src/components/common/modeless/ProductInsertModal";
import { productColumns } from "src/const/product-column";
import { useGetProducts } from "src/hooks/useProducts";
import useProductStore from "src/store/product/store";
import * as XLSX from "xlsx";
function ProductManage() {
  const { vendor } = useParams();
  const { data: initialProducts, isError, error } = useGetProducts(vendor);
  const { products, setProductData, getSelectedRows, setSelectedRows } =
    useProductStore();
  const handleExport = () => {
    const selectedRows = getSelectedRows("productKey");
    const selectedData = initialProducts.filter((row) =>
      selectedRows.includes(row.id)
    );

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "products.xlsx");
  };

  const handleRowSelection = (newSelection: number[]) => {
    setSelectedRows("productKey", newSelection);
    const selectedData = initialProducts.filter((product) =>
      newSelection.includes(product.id)
    );
    setProductData("productKey", selectedData);
  };

  const isProductEmpty =
    !products["productKey"]?.data || products["productKey"].data.length === 0;
  return (
    <Suspense fallback={<Spin tip="Loading..." size="large" />}>
      <div>
        <Button
          type="primary"
          onClick={handleExport}
          style={{ marginBottom: 16 }}
        >
          Export to Excel
        </Button>
        <BrowserPopup
          disabled={isProductEmpty}
          name={"선택 상품등록"}
          element={<ProductInsertModal products={products} />}
        ></BrowserPopup>

        <DataGrid
          rows={initialProducts}
          columns={productColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[20]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection) => {
            handleRowSelection(newSelection as number[]);
          }}
          onProcessRowUpdateError={(error) => {
            console.log("에러발생:", error);
          }}
        />
      </div>
    </Suspense>
  );
}

export default ProductManage;
