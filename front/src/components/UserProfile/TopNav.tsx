import React from "react";
import styled from "styled-components";
import { FcManager } from "react-icons/fc";

const TopNavWrapper = styled.div`
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px 10px;
  border-bottom: 1px solid #151515;
`;

const AccountNav = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileName = styled.h4`
  margin: 0;
  font-size: 20px;
`;

const NotificationDot = styled.span`
  width: 10px;
  height: 10px;
  background-color: #ec4b57;
  border-radius: 50%;
`;
const PostMenu = styled.div`
  font-size: 25px;
`;

const Menu = styled.div`
  display: inline-block;
  position: relative;
  margin-left: 18px;
`;

const MenuNotification = styled.div`
  position: absolute;
  right: -8px;
  top: -8px;
  width: 18px;
  height: 18px;
  font-size: 12px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ec4b57;
`;

interface Props {
  firstName: string;
  lastName: string;
}
function TopNav(props: Props) {
  const { firstName, lastName } = props;
  return (
    <TopNavWrapper>
      <AccountNav>
        <ProfileName>
          {firstName} {lastName}
        </ProfileName>
      </AccountNav>
      <PostMenu>
        <FcManager />
      </PostMenu>
    </TopNavWrapper>
  );
}

export default TopNav;
