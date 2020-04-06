import * as React from "react";
import styled from "styled-components";
import withAuthorization from "../../auth/withAuthorization";
import { User } from "firebase";
import { Firebase } from "../database/Firebase";

const Header = styled.header`
    width: 100%;
    height: 70px;
  display: flex;
  justify-content: flex-end;
`;

const UserMenu = styled.section`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  margin-right: 5rem;
`;

const UserName = styled.span`
  font-size: 18px;
  color: #838381;
  align-self: flex-end;
`;


export const Logout = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0;
  color: #828ab4;
  font-size: 15px;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.7;
  }
`;

export default withAuthorization((props: { user: User, firebase: Firebase }) => {
    return !!props.user && <Header>

        <UserMenu>
            <UserName>{props.user.displayName}</UserName>
            <Logout onClick={() => props.firebase.logout()}>Logout</Logout>
        </UserMenu>

    </Header>;
});

