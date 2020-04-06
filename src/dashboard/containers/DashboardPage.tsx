import * as React from "react";
import { connect } from 'react-redux';
import * as Actions from "../actions/dashboardPageActions";
import withAuthorization from "../../auth/withAuthorization";
import styled from "styled-components";
import { Firebase } from "../../common/database/Firebase";

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


export const Content = styled.div`
    margin: 2rem;
`;

export const Books = styled.ul`
    list-style: none;
`;


export const Book = styled.li`
  margin: 1rem;
  font-size: 15px;
  color: gray;
`;


interface Book {
    id: string;
    author: string;
    title: string;
}

export interface IDashboardPageProps {
    user: firebase.auth.UserCredential;
    books?: Book[];
    idToken: string;
    firebase: Firebase;
}

type Props = typeof Actions & IDashboardPageProps;

class DashboardPage extends React.Component<Props, any> {

    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        this.props.fetchDashboardInfo(this.props.firebase);
    }

    public componentWillUnmount() {
        this.props.cancelDashboardInfoFetch();
    }

    public render() {
        return <Wrapper>
            <Header>
                <Title>
                    Dashboard
                </Title>
            </Header>
            <Content>
                <h2 style={{fontSize: "18px"}}>Books</h2>
                <Books>
                    {this.props.books.map((book) => {
                        return <Book key={book.id}>{`${book.author} - ${book.title}`}</Book>;
                    })}
                </Books>
            </Content>
        </Wrapper>;
    }

}

export default connect(
    ({dashboard}) => ({...dashboard}), {...Actions}
)(withAuthorization(DashboardPage));
