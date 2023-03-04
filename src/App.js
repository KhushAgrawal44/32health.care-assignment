import React, { useState, useEffect, createContext } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Col, Row } from "antd";
import { listProfiles } from "./apiData";
import ProfileCard from "./components/ProfileCard";

export const ProfileContext = createContext(); //for managing global state

const App = () => {
  const [loading, setLoading] = useState(true);
  const [profilesData, setProfilesData] = useState([]);

  useEffect(() => {
    setLoading(true);
    listProfiles().then((data) => {
      if (data) {
        const timer = setTimeout(() => {
          console.log("This will run after 1 second!");
          setProfilesData(data);
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        console.log("Something went wrong. Please try again.");
        setLoading(false);
      }
    });
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <Player
            autoplay
            loop
            src="/lottieAnimations/loading.json"
            style={{ height: "300px", width: "300px" }}
          ></Player>
        </div>
      ) : (
        <ProfileContext.Provider value={{ profilesData, setProfilesData }}>
          <div style={{ margin: "20px" }}>
            <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
              {profilesData &&
                profilesData.map((profile, i) => (
                  <Col className="gutter-row" xs={24} sm={24} md={12} lg={6}>
                    <ProfileCard profile={profile} />
                  </Col>
                ))}
            </Row>
          </div>
        </ProfileContext.Provider>
      )}
    </div>
  );
};

export default App;
