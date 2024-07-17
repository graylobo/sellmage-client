import { UserOutlined } from "@ant-design/icons";

export const menuList = {
  productFetch: {
    name: "상품수집",
    route: "/product-fetch",
    icon: UserOutlined,
  },
  productManage: {
    name: "상품관리",
    route: "/product-manage",
    icon: UserOutlined,
    submenu: {
      zentrade: {
        name: "젠트레이드",
        route: "/product-manage/zentrade",
      },
    },
  },
  orderManage: {
    name: "주문관리",
    route: "/order-manage",
    icon: UserOutlined,
  },
  extension: {
    name: "확장기능",
    route: "/extension",
    icon: UserOutlined,
  },
  setting: {
    name: "설정",
    route: "/setting",
    icon: UserOutlined,
  },
};
