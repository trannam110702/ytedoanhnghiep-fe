import React, { useEffect, useState, useContext } from "react";
import ExamPackageWrapper, { FormWrapper } from "./styled";
import ExamCard from "../../ExamCard";
import img from "../../../assets/imgs/examcard.png";
import {
  Button,
  Col,
  Row,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Spin,
} from "antd";

import { getAllClinicResquest } from "../../../api/clinicRequest";
import {
  addExampackageResquest,
  getAllExampackageResquest,
} from "../../../api/examPackageRequest";
import { Store } from "../../../store/store";
const { Option } = Select;
const ExamPackages = () => {
  const [form] = Form.useForm();
  const { notifi } = useContext(Store);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [allPackage, setAllPackage] = useState([]);
  const [listClinic, setListClinic] = useState([]);
  useEffect(() => {
    setLoading(true);
    try {
      getAllClinicResquest().then((res) => {
        setListClinic(res?.data);
      });
      getAllExampackageResquest().then((res) => {
        setAllPackage(res?.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [addModal]);
  useEffect(() => {
    form.resetFields();
  }, [addModal]);
  const handleSubmit = async (value) => {
    try {
      setLoading1(true);
      const res = await addExampackageResquest(value);
      notifi({ type: "success", message: res.data.message });
    } catch (error) {
      console.log(error);
      notifi({ type: "error", message: "Có lỗi" });
    } finally {
      setLoading1(false);
    }
  };
  return (
    <ExamPackageWrapper>
      <Modal
        title="Thêm gói khám"
        open={addModal}
        width={900}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <FormWrapper>
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Cơ sở y tế"
              rules={[{ required: true, message: "Cần chọn trường này" }]}
              name="clinic"
            >
              <Select
                placeholder="Chọn Cơ sở y tế"
                showSearch
                filterOption={(input, option) => {
                  return (option?.children.toLowerCase() ?? "").includes(
                    input.toLowerCase()
                  );
                }}
                filterSort={(optionA, optionB) =>
                  (optionA?.children ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.children ?? "").toLowerCase())
                }
              >
                {listClinic.map((clinic) => {
                  return (
                    <Option key={clinic._id} value={clinic._id}>
                      {clinic.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="name"
              label="Tên gói khám"
              rules={[
                {
                  required: true,
                  message: "Cần nhập trường này",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="code"
              label="Mã gói khám"
              rules={[
                {
                  required: true,
                  message: "Cần nhập trường này",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Giá gói khám"
              rules={[
                {
                  required: true,
                  message: "Cần nhập trường này",
                },
              ]}
            >
              <InputNumber
                min={0}
                prefix="VND"
                style={{
                  width: "100%",
                }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                defaultValue={1000000}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả"
              rules={[
                {
                  required: true,
                  message: "Cần nhập trường này",
                },
              ]}
            >
              <Input.TextArea
                allowClear
                autoSize={{ minRows: 4, maxRows: 6 }}
              />
            </Form.Item>
            <Form.Item noStyle>
              <div className="footer">
                <Button key="back" onClick={() => setAddModal(false)}>
                  Hủy
                </Button>
                <Button
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  loading={loading1}
                >
                  Thêm
                </Button>
              </div>
            </Form.Item>
          </Form>
        </FormWrapper>
      </Modal>
      <Spin spinning={loading}>
        <Row className="taskbar-row">
          <Col span={4}>
            <Button
              className="add-btn"
              type="primary"
              onClick={() => {
                setAddModal(true);
              }}
            >
              Thêm
            </Button>
          </Col>
        </Row>
        <Row className="content" gutter={[12, 12]}>
          {allPackage.map((pack) => {
            const clinic = listClinic.find(
              (clinic) => clinic._id === pack.clinic
            );
            return (
              <ExamCard
                img={img}
                key={pack._id}
                title={pack.name}
                clinic={clinic?.name}
                price={pack.price}
              />
            );
          })}
        </Row>
      </Spin>
    </ExamPackageWrapper>
  );
};

export default ExamPackages;
