import React from "react";
import styled from "styled-components";

const ViewDashboardWrapper = styled.div`
  text-align: center;
  padding: 16px 0;
  border-bottom: 1px solid #151515;
`;

const ViewDashboardText = styled.span`
  text-transform: capitalize;
  color: #3d83b6;
  font-size: 14px;
`;
type Props = {
  role: string;
};
function ViewDashboard(props: Props) {
  const { role } = props;
  return (
    <ViewDashboardWrapper>
      <ViewDashboardText>Rôle : {role}</ViewDashboardText>
    </ViewDashboardWrapper>
  );
}

export default ViewDashboard;
