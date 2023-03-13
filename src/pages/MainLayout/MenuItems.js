import React from "react";
import { Link } from "react-router-dom";
import QuanlykhamIcon from "../../assets/imgs/quanlykhamicon.svg";
import QuantrihethongIcon from "../../assets/imgs/quantrihethongicon.svg";

const ListMenuItems = [
  {
    key: "quanlykham",
    label: "Quản lý khám sức khỏe",
    icon: <img src={QuanlykhamIcon} alt="" />,
    children: [
      {
        key: "phieuyeucau",
        label: <Link to={"/requestforms"}>Danh sách phiếu yêu cầu</Link>,
      },
      {
        key: "goikham",
        label: <Link to={"/exampackages"}>Danh sách gói khám</Link>,
      },
    ],
  },
  {
    key: "quantrihethong",
    label: "Quản trị hệ thống",
    icon: <img src={QuantrihethongIcon} alt="" />,
    children: [
      {
        key: "enterprise",
        label: <Link to={"/enterprise"}>Danh bạ Doanh nghiệp</Link>,
      },
      {
        key: "clinic",
        label: <Link to={"/clinic"}>Danh bạ Cơ sở y tế</Link>,
      },
    ],
  },
];
const getMenuItems = (menuItemKeys) => {
  return menuItemKeys.map((key) => {
    return ListMenuItems.find((listItem) => listItem.key === key);
  });
};
const MenuItems = (accountType) => {
  switch (accountType) {
    case "admin":
      return getMenuItems(["quanlykham", "quantrihethong"]);
    default:
      break;
  }
};
export default MenuItems;
