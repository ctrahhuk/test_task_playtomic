import * as React from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router";
import './App.scss';
import  DashboardPage  from "./dashboard/containers/DashboardPage";
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import { User } from "firebase";
import { withFirebase } from "./common/database/FirebaseContext";
import { Firebase } from "./common/database/Firebase";
import UserContext from "./auth/UserContext";
import SettingsPage from "./settings/containers/SettingsPage";
import Header from "./common/components/Header";
import NavSidebar from "./common/components/NavSidebar";

class App extends React.Component<RouteComponentProps<{}> & { firebase: Firebase }, { user?: User, idToken?: string }> {

    constructor(props: any) {
        super(props);
        this.state = {};
    }


    public componentDidMount() {
        this.props.firebase.onAuthStateChanged((user) => {

            this.props.firebase.user && this.props.firebase.getIdToken().then((idToken) => {
                return idToken ? this.setState({idToken}) : this.props.history.push("/login");
            }).catch(() => {
                return this.props.history.push("/login");
            });

            this.setState({user});
        });
    }

    public render() {
        return (
            <UserContext.Provider value={{user: this.state.user, idToken: this.state.idToken}}>
                <div className="app">
                    <Header/>
                    <NavSidebar/>
                    <Switch>
                        <Route path="/" exact={true} component={DashboardPage}/>
                        <Route path="/settings" exact={true} component={SettingsPage} />
                        <Route path="/login" exact={true} component={LoginPage}/>
                        <Route path="/signup" exact={true} component={SignupPage}/>
                    </Switch>
                </div>
            </UserContext.Provider>
        );
    }
}

export default withRouter(withFirebase(App));
