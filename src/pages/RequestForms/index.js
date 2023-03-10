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
  Spin,
  Table,
} from "antd";

import { getAllEnterpriseResquest } from "../../api/enterpriseRequest";
import {
  addRequestformResquest,
  getAllRequestformResquest,
} from "../../api/requestFormRequest";
import { Store } from "../../store/store";
const { Option } = Select;
const ExamPackages = () => {
  const [form] = Form.useForm();
  const { notifi } = useContext(Store);
  const [listLoading, setListLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [allRequestForm, setAllRequestForm] = useState([]);
  const [listEnterprise, setListEnterprise] = useState([]);
  useEffect(() => {
    setListLoading(true);
    try {
      getAllEnterpriseResquest().then((res) => {
        setListEnterprise(res?.data);
      });
      getAllRequestformResquest().then((res) => {
        setAllRequestForm(validate(res?.data));
      });
    } catch (error) {
      console.log(error);
    }
    setListLoading(false);
  }, [addModal]);
  useEffect(() => {
    form.resetFields();
  }, [addModal]);
  const handleSubmit = async (value) => {
    try {
      setLoading(true);
      const res = await addRequestformResquest(value);
      notifi({ type: "success", message: res.data.message });
    } catch (error) {
      console.log(error);
      notifi({ type: "error", message: "Có lỗi" });
    } finally {
      setLoading(false);
    }
  };
  const validate = (data) => {
    return data.map((requestform) => {
      const date = new Date(requestform.postDate);
      return {
        ...requestform,
        postDate: date.toLocaleDateString(),
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
      title: "Mã phiếu",
      dataIndex: "formNumber",
      key: "formNumber",
    },
    {
      title: "Giá dự kiến (VND)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Ngày đăng",
      dataIndex: "postDate",
      key: "postDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];
  return (
    <ExamPackageWrapper>
      <Modal
        title="Tạo phiếu yêu cầu"
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
              label="Doanh nghiệp"
              rules={[{ required: true, message: "Cần chọn trường này" }]}
              name="enterprise"
            >
              <Select
                placeholder="Chọn Doanh nghiệp"
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
                {listEnterprise.map((enterprise) => {
                  return (
                    <Option key={enterprise._id} value={enterprise._id}>
                      {enterprise.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="name"
              label="Tên phiếu yêu cầu"
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
              name="formNumber"
              label="Mã phiếu"
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
              label="Giá dự kiến"
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
            dataSource={allRequestForm}
            pagination={false}
            bordered
          ></Table>
        </Col>
      </Row>
    </ExamPackageWrapper>
  );
};

export default ExamPackages;
