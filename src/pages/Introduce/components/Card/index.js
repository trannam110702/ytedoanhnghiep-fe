import React from "react";
import CardWrapper from "./styled";
import Frame1 from "../../../../assets/imgs/cards/Frame 1.svg";
import Frame2 from "../../../../assets/imgs/cards/Frame 2.svg";
import Frame3 from "../../../../assets/imgs/cards/Frame 3.svg";
import Frame4 from "../../../../assets/imgs/cards/Frame 4.svg";
import Frame5 from "../../../../assets/imgs/cards/Frame 5.svg";
const index = (props) => {
  let bg;
  const title = [
    "Nâng cao hiệu quả",
    "Doanh nghiệp",
    "Phòng khám",
    "Cá nhân nhân viên khám",
    "Báo cáo thống kê",
  ];
  const text = [
    "Hệ thống xây dựng nhằm mục đích tạo ra sàn điều phối việc khám sức khỏe định kỳ một cách minh...",
    "Dễ dàng quản lý khám sức khỏe của nhân viên, lựa chọn CSYT khám phù hợp. Thống kê, phân loại tình...",
    "Tiếp cận, hợp tác với nhiều doanh nghiệp hơn, có được lịch trình khám cụ thể. Thống kê nhu cầu...",
    "Xem các kết quả khám sức khỏe qua từng đợt khám, lịch sử bệnh và hồ sơ cá nhân. Có thể đăng ký th...",
    "Theo dõi, thống kê theo nhiều tiêu chí: địa phương, doanh nghiệp, phòng khám, loại sức khỏe, gói...",
  ];
  switch (props.type) {
    case "1":
      bg = Frame1;
      break;
    case "2":
      bg = Frame2;
      break;
    case "3":
      bg = Frame3;
      break;
    case "4":
      bg = Frame4;
      break;
    case "5":
      bg = Frame5;
      break;
    default:
      bg = Frame1;
      break;
  }
  return (
    <CardWrapper>
      <div className="background" style={{ backgroundImage: `url('${bg}')` }}>
        <h3 className="title">{title[props.type - 1]}</h3>
        <span className="text">{text[props.type - 1]}</span>
      </div>
    </CardWrapper>
  );
};

export default index;
