import { GridRowModel } from "@mui/x-data-grid";

export function createXmlFromRowData(rowData: GridRowModel) {
  const doc = document.implementation.createDocument(null, "data", null);
  const root = doc.documentElement;

  const goodsData = doc.createElement("goods_data");
  root.appendChild(goodsData);

  // Helper function to create and append elements
  const createElement = (
    name: string,
    value: string,
    isCData: boolean = false
  ) => {
    const element = doc.createElement(name);
    if (isCData) {
      element.appendChild(doc.createCDATASection(value));
    } else {
      element.textContent = value;
    }
    goodsData.appendChild(element);
  };

  // Add elements based on the row data
  createElement("goodsNmFl", "d");
  createElement("goodsNm", rowData.GPI003, true);
  createElement("soldOutFl", rowData.GPI032 === "Y" ? "y" : "n");
  createElement("goodsDisplayFl", "y");
  createElement("goodsDisplayMobileFl", "y");
  createElement("goodsSellFl", "y");
  createElement("goodsSellMobileFl", "y");
  createElement("scmNo", "1");
  createElement("goodsCd", rowData.GPI002);
  createElement("cateCd", rowData.GPI046 || "001");
  createElement("allCateCd", rowData.GPI046 || "001");
  createElement("goodsSearchWord", rowData.GPI026, true);
  createElement("imageStorage", "url");
  createElement("makerNm", rowData.GPI006, true);
  createElement("originNm", rowData.GPI004, true);
  createElement("taxFreeFl", rowData.GPI030 === "Y" ? "t" : "n");
  createElement("goodsPrice", rowData.GPI007);
  createElement("costPrice", rowData.GPI007);
  createElement("goodsOpenDt", "0000-00-00");
  createElement("goodsState", "n");
  createElement("deliverySno", "1"); // Assuming a default value, adjust as needed

  // Add thumbnail images
  for (let i = 1; i <= 5; i++) {
    const thumbnail = rowData[`GPI0${16 + i}` as keyof GridRowModel];
    if (thumbnail) {
      createElement(`magnifyImageData${i}`, thumbnail);
      createElement(`detailImageData${i}`, thumbnail);
    }
  }

  // Add main image
  createElement("listImageData1", rowData.GPI017);
  createElement("mainImageData1", rowData.GPI017);

  // Handle options
  const hasOptions = rowData.GPI023 && rowData.GPI024;
  createElement("optionFl", hasOptions ? "y" : "n");
  createElement("optionDisplayFl", hasOptions ? "d" : "s");

  if (hasOptions) {
    createElement("optionName", rowData.GPI023, true);

    const optionValues = (rowData.GPI024 as string).split(",");
    const optionPrices = (rowData.GPI025 as string).split(",");

    optionValues.forEach((value, index) => {
      const optionData = doc.createElement("optionData");
      optionData.setAttribute("idx", (index + 1).toString());

      const optionElements = [
        { name: "optionNo", value: (index + 1).toString() },
        { name: "optionValue1", value: value.trim(), isCData: true },
        {
          name: "optionPrice",
          value: optionPrices[index] || "0",
          isCData: true,
        },
        { name: "optionViewFl", value: "y" },
        { name: "optionSellFl", value: "y" },
        { name: "stockCnt", value: "0" },
      ];

      optionElements.forEach((elem) => {
        const element = doc.createElement(elem.name);
        if (elem.isCData) {
          element.appendChild(doc.createCDATASection(elem.value));
        } else {
          element.textContent = elem.value;
        }
        optionData.appendChild(element);
      });

      goodsData.appendChild(optionData);
    });
  }

  const serializer = new XMLSerializer();
  return serializer.serializeToString(doc);
}
