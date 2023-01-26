import React from "react";
import styled from "styled-components";
import scLogo from "../../assets/scLogo.jpg";

const ProfileDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
`;

const ProfileImage = styled.img`
  max-width: 130px;
  border: 1px solid #919191;
  border-radius: 50%;
  padding: 4px;
  flex-basis: 40%;
`;

const ProfileStats = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: 60%;
`;

const StatsBlock = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatsNumber = styled.span`
  font-weight: 600;
  font-size: 20px;
`;

const StatsLabel = styled.span`
  margin-top: 5px;
  text-transform: capitalize;
  letter-spacing: 1px;
  font-size: 14px;
`;
type Props = {
  totalPhotos: number;
  totalVideos: number;
};

function ProfileDetails(props: Props) {
  const { totalPhotos, totalVideos } = props;
  let totalPosts = totalPhotos + totalVideos;
  return (
    <ProfileDetailsWrapper>
      <ProfileImage src={scLogo} />
      <ProfileStats>
        <StatsBlock>
          <StatsNumber>{totalPosts}</StatsNumber>
          <StatsLabel>posts</StatsLabel>
        </StatsBlock>
        <StatsBlock>
          <StatsNumber>{totalPhotos}</StatsNumber>
          <StatsLabel>photos</StatsLabel>
        </StatsBlock>
        <StatsBlock>
          <StatsNumber>{totalVideos}</StatsNumber>
          <StatsLabel>vidéos</StatsLabel>
        </StatsBlock>
      </ProfileStats>
    </ProfileDetailsWrapper>
  );
}

export default ProfileDetails;
