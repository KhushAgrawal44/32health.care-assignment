import React, { useState, useEffect, useContext } from "react";
import { Modal, Form, Input, Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ProfileContext } from "../App";

const ProfileUpdateModal = ({ profile }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    website: profile.website,
  });
  const { name, email, phone, website } = values;

  const { profilesData, setProfilesData } = useContext(ProfileContext);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setProfilesData((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === profile.id) {
          return {
            ...obj,
            name: name,
            email: email,
            phone: phone,
            website: website,
          };
        }
        return obj;
      });

      return newState;
    });
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    console.log(e.target.id);
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    form.setFieldsValue({
      name: name,
      email: email,
      phone: phone,
      website: website,
    });
  }, []);

  return (
    <>
      <EditOutlined
        onClick={showModal}
        key="edit"
        style={{ fontSize: "20px" }}
      />

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Divider />
        <Form form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input onChange={handleFormChange} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input onChange={handleFormChange} />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input onChange={handleFormChange} />
          </Form.Item>
          <Form.Item
            label="Website"
            name="website"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input onChange={handleFormChange} />
          </Form.Item>
        </Form>
        <Divider />
      </Modal>
    </>
  );
};
export default ProfileUpdateModal;
