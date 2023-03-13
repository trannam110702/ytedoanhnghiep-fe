import React from "react";
import ExamCardWrapper, { DesWrapper } from "./styled";
import { Card, Button } from "antd";
import Building from "../../assets/imgs/Buildings.png";
const ExamCard = ({ img, title, clinic, price }) => {
  return (
    <ExamCardWrapper>
      <Card
        style={{ width: "100%" }}
        cover={<img src={img}></img>}
        actions={[<div>Đăng kí ngay</div>]}
      >
        <Card.Meta
          title={title}
          description={
            <DesWrapper>
              <img src={Building}></img>
              <span>{clinic}</span>
            </DesWrapper>
          }
        ></Card.Meta>
        <span className="price">Chi phí: {price} đồng</span>
      </Card>
    </ExamCardWrapper>
  );
};

export default ExamCard;
