import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import TopNav from "../components/UserProfile/TopNav";
import ViewDashboard from "../components/UserProfile/ViewDashboard";
import ProfileDetails from "../components/UserProfile/ProfileDetails";
import About from "../components/UserProfile/About";
import ProfileButtons from "../components/UserProfile/ProfileButtons";
import Highlights from "../components/UserProfile/Highlights";
import PostGrid from "../components/UserProfile/PostGrid";
import { GlobalStyle } from "../Styles/global";
import { SideBar } from "../components/Sidebar/Index";
import axios from "axios";
import { LoginContext } from "../context/AuthContext";

const URL = "http://localhost:8080/insta/users";

const ProfileWrapper = styled.div`
  background-color: #000;
  max-width: 600px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const UserProfile = () => {
  const [userInfos, setUserInfos] = useState<any>(null);
  const { user, setUser } = useContext(LoginContext);
  console.log(user);
  useEffect(() => {
    getOwnuserInfosInfo();
  }, []);
  const getOwnuserInfosInfo = async () => {
    const response = await axios.get(`${URL}/findById/3`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwiLCJyb2xlcyI6WyJBRE1JTiJdLCJleHAiOjE2NzQ1MzAyODYsImlhdCI6MTY3NDUwMDI4Nn0.93i766CekqNxJKDiwSSQb5UtwMgOOlZLaNsoGaZ60V4`,
      },
    });
    setUserInfos(response.data);
  };

  return (
    <>
      <SideBar />
      <GlobalStyle />
      <ProfileWrapper>
        <TopNav />
        <ViewDashboard />
        <ProfileDetails />
        <About />
        <ProfileButtons />
        <Highlights />
        <PostGrid />
      </ProfileWrapper>
    </>
  );
};

export default UserProfile;
