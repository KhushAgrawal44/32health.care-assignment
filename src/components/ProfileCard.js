import React, { useState, useContext } from "react";
import ProfileUpdateModal from "./ProfileUpdateModal";
import { ProfileContext } from "../App";
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartOutlined,
  HeartFilled,
  DeleteFilled,
} from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;

const ProfileCard = ({ profile }) => {
  const [like, setLike] = useState(false);
  const { profilesData, setProfilesData } = useContext(ProfileContext);

  const handleDeleteCard = () => {
    setProfilesData((current) => {
      return current.filter((p) => p.id !== profile.id);
    });
  };

  return (
    <>
      <Card
        cover={
          <img
            style={{ backgroundColor: "#EEEEEE" }}
            alt="example"
            src={`https://avatars.dicebear.com/v2/avataaars/${profile.username}.svg?options[mood][]=happy`}
            width="80%"
            height="200px"
          />
        }
        actions={
          like
            ? [
                <HeartFilled
                  key="like"
                  style={{ color: "red", fontSize: "20px" }}
                  onClick={() => {
                    setLike(false);
                  }}
                />,

                <ProfileUpdateModal profile={profile} />,
                <DeleteFilled
                  key="delete"
                  style={{ fontSize: "20px" }}
                  onClick={handleDeleteCard}
                />,
              ]
            : [
                <HeartOutlined
                  key="like"
                  style={{ color: "red", fontSize: "20px" }}
                  onClick={() => {
                    setLike(true);
                  }}
                />,

                <ProfileUpdateModal profile={profile} />,

                <DeleteFilled
                  key="delete"
                  style={{ fontSize: "20px" }}
                  onClick={handleDeleteCard}
                />,
              ]
        }
      >
        <Meta title={profile.name} />
        <p>
          <MailOutlined style={{ fontSize: "15px" }} />
          {" " + profile.email}
        </p>
        <p>
          <PhoneOutlined style={{ fontSize: "15px" }} />
          {" " + profile.phone}
        </p>
        <p>
          <GlobalOutlined style={{ fontSize: "15px" }} />
          {" " + profile.website}
        </p>
      </Card>
    </>
  );
};

export default ProfileCard;
