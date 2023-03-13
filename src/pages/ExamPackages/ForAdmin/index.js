import React, { useEffect, useState, useContext } from "react";
import ExamPackageWrapper, { FormWrapper } from "./styled";

import {
  Button,
  Col,
  Row,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Table,
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
  const [listLoading, setListLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [allPackage, setAllPackage] = useState([]);
  const [listClinic, setListClinic] = useState([]);
  useEffect(() => {
    const run = async () => {
      setListLoading(true);
      let res1, res2;
      try {
        res1 = await getAllClinicResquest();
        res2 = await getAllExampackageResquest();
        setListClinic(res1?.data);
        setAllPackage(res1?.data);
        setAllPackage((pre) => validate(res2?.data, pre));
        setListLoading(false);
      } catch (error) {
        notifi("error", error);
      } 
    };
    run();
  }, [addModal]);
  useEffect(() => {
    form.resetFields();
  }, [addModal]);
  const handleSubmit = async (value) => {
    try {
      setLoading(true);
      const res = await addExampackageResquest(value);
      notifi({ type: "success", message: res.data.message });
    } catch (error) {
      console.log(error);
      notifi({ type: "error", message: "Có lỗi" });
    } finally {
      setLoading(false);
    }
  };
  const validate = (datas, clinics) => {
    return datas.map((data) => {
      const date = new Date(data.postDate);
      const clinic = clinics.find((clinic) => {
        return clinic._id === data.clinic;
      });
      return {
        ...data,
        postDate: date.toLocaleDateString(),
        clinic: clinic?.name,
      };
    });
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => <>{index + 1}</>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Cơ sở y tế",
      dataIndex: "clinic",
      key: "clinic",
    },
    {
      title: "Mã gói khám",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Giá (VND)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Ngày đăng",
      dataIndex: "postDate",
      key: "postDate",
    },
  ];
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
                  loading={loading}
                >
                  Thêm
                </Button>
              </div>
            </Form.Item>
          </Form>
        </FormWrapper>
      </Modal>
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
      <Row className="content">
        <Col span={24}>
          <Table
            loading={listLoading}
            columns={columns}
            dataSource={allPackage}
            pagination={false}
            bordered
          ></Table>
        </Col>
      </Row>
    </ExamPackageWrapper>
  );
};

export default ExamPackages;
