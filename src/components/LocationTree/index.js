import provinces from "../../assets/json/hanhchinhvn/tinh_tp.json";
import districts from "../../assets/json/hanhchinhvn/quan_huyen.json";
import wards from "../../assets/json/hanhchinhvn/xa_phuong.json";

let treeData = [],
  districtsArray = [],
  wardsArray = [];
for (const id in wards) {
  wardsArray.push({
    key: id,
    title: wards[id].name_with_type,
    ...wards[id],
  });
}
for (const id in districts) {
  let children = wardsArray.filter((ward) => ward.parent_code === id);
  districtsArray.push({
    key: id,
    title: districts[id].name_with_type,
    ...districts[id],
    children,
  });
}
for (const id in provinces) {
  let children = districtsArray.filter(
    (district) => district.parent_code === id
  );
  treeData.push({
    key: id,
    title: provinces[id].name_with_type,
    ...provinces[id],
    children,
  });
}

export { treeData, districtsArray, wardsArray };
