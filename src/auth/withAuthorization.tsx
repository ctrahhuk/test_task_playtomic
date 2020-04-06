import React from 'react';
import { withRouter } from 'react-router-dom';
import { Firebase } from "../common/database/Firebase";
import { RouteComponentProps } from "react-router";
import { withFirebase } from "../common/database/FirebaseContext";
import * as firebase from "firebase";
import UserContext from "./UserContext";

const withAuthorization = (Component) => {
    class WithAuthorization extends React.Component<RouteComponentProps<{}> & {firebase: Firebase}, {}> {
        private unsubscribe: firebase.Unsubscribe;

        componentDidMount() {
            this.unsubscribe = this.props.firebase.onAuthStateChanged(
                (user) =>  {
                    return !user && this.props.history.push("/login");
                }
            );
        }

        componentWillUnmount() {
            this.unsubscribe();
        }

        render() {
            return <UserContext.Consumer>
                {(user) => user && <Component {...this.props} {...user}/>}
            </UserContext.Consumer>
        }
    }

    return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;