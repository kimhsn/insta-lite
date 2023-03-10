import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  padding: 25px 20px;
`;

const ButtonRow = styled.div`
  display: flex;
  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Button = styled.button`
  background-color: transparent;
  color: white;
  border: 1px solid #919191;
  padding: 12px 0;
  cursor: pointer;
  width: 100%;
  border-radius: 5px;
  font-size: 14px;
  :not(:last-child) {
    margin-right: 8px;
  }
`;
type Props = {
  onClick: any;
};
function ProfileButtons(props: Props) {
  const { onClick } = props;
  return (
    <ButtonWrapper>
      <ButtonRow>
        <Button onClick={onClick}>Editer mon profil</Button>
        <Button>Ajouter une image/video</Button>
      </ButtonRow>
    </ButtonWrapper>
  );
}

export default ProfileButtons;
