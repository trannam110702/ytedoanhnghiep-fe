import React, { useState } from "react";
import { Row, Col, Tree } from "antd";
import ClinicListWrapper from "./styled";

const ClinicList = () => {
  const [treeData, setTreeData] = useState([]);
  return (
    <ClinicListWrapper>
      <Row>
        <Col flex="200px">
          <Tree treeData={treeData} />
        </Col>
        <Col flex="auto">Cơ sở y tế</Col>
      </Row>
    </ClinicListWrapper>
  );
};

export default ClinicList;
