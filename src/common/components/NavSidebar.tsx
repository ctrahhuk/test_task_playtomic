import * as React from "react";
import styled from "styled-components";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import Icon from "./Icon";
import withAuthorization from "../../auth/withAuthorization";
import { User } from "firebase";

const NavSidebar = styled.nav`
    width: 24rem;
    height: calc(100% - 70px);
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
`;

export const NavElement = styled(NavLink)`
  
  color: #898A83;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  text-decoration: none;
  padding: 1rem;
  
  &:focus {
    outline: none;
  }
  
  &.selected {
    background-color: #FEF895;
  }

  :hover {
    background-color: #FEF9EA !important;
  }
  
`;

export default withAuthorization((props: { user: User }) =>
    !!props.user && <NavSidebar>
        <NavElement activeClassName="selected" to="/" exact={true}>
            <Icon type="home"/>
            Dashboard
        </NavElement>
        <NavElement activeClassName="selected" to="/settings" exact={true}>
            <Icon type="cog"/>
            Settings
        </NavElement>
    </NavSidebar>);
