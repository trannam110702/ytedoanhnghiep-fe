import React, { useEffect, useState, useContext } from "react";
import {
  Row,
  Col,
  Tree,
  Table,
  Modal,
  Button,
  Form,
  Input,
  Select,
} from "antd";
import EnterpriseListWrapper, { FormWrapper } from "./styled";
import { treeData, wardsArray } from "../../components/LocationTree";
import {
  addEnterpriseResquest,
  getAllEnterpriseResquest,
} from "../../api/enterpriseRequest";

import { Store } from "../../store/store";
const { Option } = Select;

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
    title: "Mã đăng kí",
    dataIndex: "madkkd",
    key: "madkkd",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phonenumber",
    key: "phonenumber",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },
];
const EnterpriseList = () => {
  const { notifi } = useContext(Store);
  const [form] = Form.useForm();
  const [listEnterprise, setListEnterprise] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selection, setSelection] = useState({});
  useEffect(() => {
    setListLoading(true);
    getAllEnterpriseResquest()
      .then((res) => {
        setListEnterprise(res.data);
        setDataSource(validateData(res.data));
      })
      .then(() => {
        setListLoading(false);
      });
  }, [addModal]);
  useEffect(() => {
    const currdistricts = treeData.find((pr) => pr.key === selection.province);
    const currwards =
      districts &&
      districts.find((district) => district.key === selection.district);
    setDistricts(currdistricts?.children);
    setWards(currwards?.children);
  }, [selection]);
  useEffect(() => {
    form.resetFields();
  }, [addModal]);
  useEffect(() => {
    form.resetFields(["district", "ward"]);
  }, [selection.province]);
  useEffect(() => {
    form.resetFields(["ward"]);
  }, [selection.district]);
  const handleSubmit = async (value) => {
    try {
      setLoading(true);
      const res = await addEnterpriseResquest(value);
      notifi({ type: "success", message: res.data.message });
    } catch (error) {
      console.log(error);
      notifi({ type: "error", message: "Có lỗi" });
    } finally {
      setLoading(false);
    }
  };
  const validateData = (listEnterprise) => {
    return listEnterprise.map((enterprise) => {
      let address = wardsArray.find((ward) => {
        return ward.code === enterprise.address.wardid;
      }).path_with_type;
      return {
        key: enterprise._id,
        name: enterprise.name,
        madkkd: enterprise.madkkd,
        phonenumber: enterprise.phonenumber,
        email: enterprise.email,
        address: `${enterprise.address.housenumber}, ${address}`,
      };
    });
  };
  const treeSelect = (key) => {
    if (key.length === 0) return setDataSource(validateData(listEnterprise));
    const newList = listEnterprise.filter((enterprise) => {
      return (
        enterprise.address.districtid === key[0] ||
        enterprise.address.provinceid === key[0] ||
        enterprise.address.wardid === key[0]
      );
    });
    setDataSource(validateData(newList));
  };
  const onSearch = (value) => {
    const searchList = listEnterprise.filter((enterprise) => {
      return enterprise.name.toLowerCase().includes(value.toLowerCase());
    });
    setDataSource(searchList);
  };
  return (
    <EnterpriseListWrapper>
      <Modal
        title="Thêm doanh nghiệp"
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
              name="name"
              label="Tên doanh nghiệp"
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
              name="madkkd"
              label="Mã đăng kí kinh doanh"
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
              name="phonenumber"
              label="Số điện thoại"
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
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Cần nhập trường này",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Địa chỉ">
              <Form.Item
                label="Tỉnh/Thành phố"
                name="province"
                rules={[{ required: true, message: "Cần chọn trường này" }]}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <Select
                  placeholder="Chọn Tỉnh/Thành phố"
                  onChange={(value) => {
                    setSelection({ province: value });
                  }}
                  value={selection.province}
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
                  {treeData.map((province) => {
                    return (
                      <Option key={province.key} value={province.key}>
                        {province.name_with_type}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Quận/Huyện"
                rules={[{ required: true, message: "Cần chọn trường này" }]}
                labelCol={{ span: 6 }}
                name="district"
                wrapperCol={{ span: 18 }}
              >
                <Select
                  placeholder="Chọn Quận/Huyện"
                  onChange={(value) => {
                    setSelection({
                      province: selection.province,
                      district: value,
                    });
                  }}
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
                  value={selection.district}
                >
                  {districts &&
                    districts.map((district) => {
                      return (
                        <Option key={district.key} value={district.key}>
                          {district.name_with_type}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Phường/Xã"
                rules={[{ required: true, message: "Cần chọn trường này" }]}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                name="ward"
              >
                <Select
                  placeholder="Chọn Phường/Xã"
                  value={selection.ward}
                  onChange={(value) => {
                    setSelection({ ...selection, ward: value });
                  }}
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
                  {wards &&
                    wards.map((ward) => {
                      return (
                        <Option key={ward.key} value={ward.key}>
                          {ward.name_with_type}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Tên đường, số nhà"
                name={["housenumber"]}
                rules={[{ required: true, message: "Cần nhập trường này" }]}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <Input placeholder="Nhập tên đường, số nhà" />
              </Form.Item>
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
      <Row id="taskbar-row">
        <Col>
          <span className="txt">Tìm kiếm</span>
        </Col>
        <Col flex="auto">
          <Input.Search enterButton onSearch={onSearch} />
        </Col>
        <Col flex="50px">
          <Button id="add-btn" type="primary" onClick={() => setAddModal(true)}>
            Thêm doanh nghiệp
          </Button>
        </Col>
      </Row>
      <Row id="content-row" gutter={20}>
        <Col className="tree-row" flex="224px">
          <Tree treeData={treeData} onSelect={treeSelect} />
        </Col>
        <Col className="content" flex="auto">
          <Table
            loading={listLoading}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
          ></Table>
        </Col>
      </Row>
    </EnterpriseListWrapper>
  );
};

export default EnterpriseList;
