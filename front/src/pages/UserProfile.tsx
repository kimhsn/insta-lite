import React from "react";
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
