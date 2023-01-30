import React from "react";

import IntroduceWrapper, { Cards, Footer, Images, Intro } from "./styled";
import Navbar from "../../components/Navbar";
import Poster from "../../assets/imgs/Poster.png";
import Laptops from "../../assets/imgs/3laptops.svg";
import Laptop from "../../assets/imgs/laptop.svg";
import Ellipse from "../../assets/imgs/Ellipse.png";
import Tick from "../../assets/imgs/check-circle.svg";
import Card from "../Introduce/components/Card";
const Introduce = () => {
  const listFunction = [
    "Tạo ra sàn khám sức khỏe giúp các doanh nghiệp và phòng khám có thể kết nối một cách minh bạch, chuyên nghiệp.",
    "Giúp doanh nghiệp theo dõi quản lý,  phân loại dễ dàng sức khỏe nhân viên. Theo dõi tiến độ, kết quả khám bệnh. Tiếp cận với những phòng khám có dịch vụ tốt.",
    "Giúp phòng khám tiếp cận được với các doanh nghiệp mới trên địa bàn, tối ưu được quy trình khám, giảm thao tác nhập liệu.",
    "Giúp sở ban ngành, các khu công nghiệp.. quản lý được tình hình sức khỏe doanh nghiệp, cơ quan trên địa bàn mình quản lý.",
    "Số hóa các quy trình, số liệu, lịch sử khám bệnh, giảm thiểu việc sử dụng tài liệu giấy.",
  ];
  return (
    <IntroduceWrapper>
      <Navbar />
      <Images>
        <div
          className="posterImg"
          style={{ backgroundImage: `url(${Poster})` }}
        >
          <h1>
            Hệ thống quản lý <br /> Sức khỏe doanh nghiệp
          </h1>
          <p>Kết nối doanh nghiệp và phòng khám</p>
        </div>
        <div
          className="posterImg"
          style={{ backgroundImage: `url(${Laptops})` }}
        ></div>
      </Images>
      <Intro>
        <h1>Sàn giao dịch thương mại điện tử</h1>
        <p>Giữa Doanh nghiệp và Nhà cung cấp, khách hàng</p>
        <img id="ellipse" src={Ellipse} alt=""></img>
        <div className="main">
          <img id="laptop" src={Laptop} alt=""></img>
          <div className="content">
            <h2>
              Hệ thống Quản lý <br /> Sức khỏe doanh nghiệp
            </h2>
            {listFunction.map((text, i) => {
              return (
                <div key={i} className="use">
                  <img src={Tick} alt=""></img>
                  <div>{text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Intro>
      <Cards>
        <div className="content">
          <Card type="1" />
          <Card type="2" />
          <Card type="3" />
          <Card type="4" />
          <Card type="5" />
        </div>
      </Cards>
      <Footer>
        <div className="content">
          <h1>©2023 - Bản quyền thuộc Trần Nam</h1>
        </div>
      </Footer>
    </IntroduceWrapper>
  );
};

export default Introduce;
