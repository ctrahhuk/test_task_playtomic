import * as React from "react";
import {connect} from 'react-redux';
import * as Actions from "../actions/settingsPageActions";
import withAuthorization from "../../auth/withAuthorization";
import styled from "styled-components";

export interface ISettingsPageProps {
    user: firebase.auth.UserCredential;
    idToken: string;
}

type Props = typeof Actions & ISettingsPageProps;

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    flex: 0.95;
    
    border-radius: 4px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.08);
`;

export const Header = styled.header`
    height: 7rem;
    background-color: #FCE094;
    width: 100%;
    display: flex;
    align-items: center;
`;

export const Title = styled.h1`
  font-size: 26px;
  margin: 2rem;
`;

class SettingsPage extends React.Component<Props, any> {


    public componentDidMount() {
        this.props.fetchSettings();
    }

    public componentWillUnmount() {
        this.props.cancelFetchSettings();
    }


    constructor(props: any) {
        super(props);

    }

    public render() {
        return <Wrapper>
            <Header>
                <Title>
                    Settings
                </Title>
            </Header>
        </Wrapper>;
    }

}

export default connect(
    ({settingsPage}) => ({...settingsPage}), {...Actions}
)(withAuthorization(SettingsPage));
