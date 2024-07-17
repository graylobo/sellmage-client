import { GridColDef } from "@mui/x-data-grid";

export const productColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "GPI001", headerName: "마켓명", width: 150, editable: false },
  { field: "GPI002", headerName: "상품코드", width: 150, editable: false },
  {
    field: "GPI003",
    headerName: "상품명",
    width: 200,
  },
  { field: "GPI004", headerName: "원산지", width: 150, editable: false },
  { field: "GPI005", headerName: "브랜드", width: 150, editable: false },
  { field: "GPI006", headerName: "제조사", width: 150, editable: false },
  {
    field: "GPI007",
    headerName: "공급가",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "GPI008",
    headerName: "소비자준수 여부",
    width: 180,
    editable: false,
  },
  { field: "GPI009", headerName: "소비자준수가", width: 150, editable: false },
  { field: "GPI010", headerName: "배송비", width: 100, editable: false },
  { field: "GPI011", headerName: "배송출고지", width: 150, editable: false },
  {
    field: "GPI012",
    headerName: "해외배송여부(국내/해외)",
    width: 200,
    editable: false,
  },
  { field: "GPI013", headerName: "배송비 선착불", width: 150, editable: false },
  { field: "GPI014", headerName: "배송마감", width: 100, editable: false },
  { field: "GPI015", headerName: "배송기간", width: 100, editable: false },
  { field: "GPI016", headerName: "등록일", width: 150, editable: false },
  { field: "GPI017", headerName: "썸네일이미지1", width: 200, editable: false },
  { field: "GPI018", headerName: "썸네일이미지2", width: 200, editable: false },
  { field: "GPI019", headerName: "썸네일이미지3", width: 200, editable: false },
  { field: "GPI020", headerName: "썸네일이미지4", width: 200, editable: false },
  { field: "GPI021", headerName: "썸네일이미지5", width: 200, editable: false },
  { field: "GPI022", headerName: "상세이미지", width: 200, editable: false },
  { field: "GPI023", headerName: "옵션명", width: 100, editable: false },
  { field: "GPI024", headerName: "옵션값", width: 100, editable: false },
  { field: "GPI025", headerName: "옵션가", width: 100, editable: false },
  { field: "GPI026", headerName: "키워드", width: 150, editable: false },
  { field: "GPI027", headerName: "성인전용", width: 100, editable: false },
  { field: "GPI028", headerName: "베스트상품", width: 100, editable: false },
  { field: "GPI029", headerName: "환불/반품불가", width: 150, editable: false },
  { field: "GPI030", headerName: "과세", width: 100, editable: false },
  {
    field: "GPI031",
    headerName: "묶음배송여부(상품동일시)",
    width: 200,
    editable: false,
  },
  { field: "GPI032", headerName: "품절여부", width: 100, editable: false },
  {
    field: "GPI033",
    headerName: "솔루션 상품상태",
    width: 200,
    editable: false,
  },
  {
    field: "GPI034",
    headerName: "고도몰 상품상태",
    width: 200,
    editable: false,
  },
  {
    field: "GPI035",
    headerName: "고도몰 등록코드",
    width: 200,
    editable: false,
  },
  { field: "GPI036", headerName: "등록 결과", width: 150, editable: false },
  { field: "GPI037", headerName: "재고", width: 100, editable: false },
  { field: "GPI038", headerName: "등록 후 비고", width: 200, editable: false },
  {
    field: "GPI039",
    headerName: "배송타입(무료/고정/조건부 등)",
    width: 200,
    editable: false,
  },
  { field: "GPI040", headerName: "수정일", width: 150, editable: false },
  { field: "GPI041", headerName: "옵션품절", width: 150, editable: false },
  { field: "GPI042", headerName: "가공여부", width: 100, editable: false },
  { field: "GPI043", headerName: "변경내용", width: 200, editable: false },
  {
    field: "GPI044",
    headerName: "묶음배송 가능수량",
    width: 200,
    editable: false,
  },
  {
    field: "GPI045",
    headerName: "업체 카테고리 명",
    width: 200,
    editable: false,
  },
  {
    field: "GPI046",
    headerName: "업체 카테고리 코드",
    width: 200,
    editable: false,
  },
  { field: "GPI047", headerName: "원카테", width: 100, editable: false },
  { field: "GPI048", headerName: "공란1", width: 100, editable: false },
  { field: "GPI049", headerName: "공란2", width: 100, editable: false },
  { field: "GPI050", headerName: "공란3", width: 100, editable: false },
  {
    field: "GPI051",
    headerName: "샵앤 카테고리 코드",
    width: 200,
    editable: false,
  },
  {
    field: "GPI052",
    headerName: "쿠팡 카테고리 코드",
    width: 200,
    editable: false,
  },
  {
    field: "GPI053",
    headerName: "플레이오토 카테고리코드",
    width: 200,
    editable: false,
  },
  {
    field: "GPI054",
    headerName: "이셀러스 카테고리코드",
    width: 200,
    editable: false,
  },
];

const visibleFields = ["GPI001", "GPI002", "GPI003", "GPI007", "GPI034"];

const invisibleColumns = productColumns.reduce((acc, column: GridColDef) => {
  if (!visibleFields.includes(column.field)) {
    acc[column.field] = false;
    return acc;
  }
  return acc;
}, {});
export const productColumnVisibilityModel = invisibleColumns;
