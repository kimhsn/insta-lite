import { type } from "os";
import React from "react";
import styled from "styled-components";

const AboutWrapper = styled.div`
  padding: 5px 20px;
`;

const ProfileName = styled.h2`
  color: white;

  margin: 0;
  font-weight: 500;
  font-size: 18px;
`;

const ProfileCategory = styled.span`
  color: #919191;
  font-size: 15px;
`;

const BioText = styled.span`
  color: white;

  display: block;
  margin-top: 3px;
`;

const BioLink = styled.a`
  color: white;

  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  color: #3d83b6;
  margin-top: 3px;
`;
type Props = {
  firstName: string;
  lastName: string;
  description: string;
};
function About(props: Props) {
  const { firstName, lastName, description } = props;
  return (
    <AboutWrapper>
      <ProfileName>
        {firstName} {lastName}
      </ProfileName>
      <ProfileCategory> _ </ProfileCategory>
      <BioText>{description}</BioText>
    </AboutWrapper>
  );
}

export default About;
