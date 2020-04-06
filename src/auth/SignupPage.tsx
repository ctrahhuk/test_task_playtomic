import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import createDecorator from 'final-form-focus'
import { Firebase } from "../common/database/Firebase";
import { RouteComponentProps, withRouter } from "react-router";
import { HttpService } from "../common/http/HttpService";
import {
    Button, FormHeader, Label, StyledField, StyledForm, Wrapper, Input, Error,
    GotoLoginLink, ServerError
} from "./AuthForm.elements";
import firebase from "firebase";
import { withFirebase } from "../common/database/FirebaseContext";

const focusOnErrors = createDecorator();

// validators
const isEmail = require("validator/lib/isEmail");
const required = (value) => (value ? undefined : "required");
const email = (value) => (isEmail(value) ? undefined : "invalid");
const composeValidators = (...validators) => (value) =>
    validators.reduce((error, v) => error || v(value), undefined);


class SignupPage extends React.Component<RouteComponentProps<{}> & {firebase: Firebase}, { valid?: boolean, submitting?: boolean, error?: {message: string} }> {

    private submit: () => void;
    private valid: boolean;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    public render() {
        return <Wrapper>
            {this.renderForm()}
        </Wrapper>;
    }

    private renderForm = () => {
        return <Form
            initialValues={{email: "", password: ""}}
            decorators={[ focusOnErrors ]}
            onSubmit={this.onSubmit}
            render={({handleSubmit, form}) => {
                this.submit = handleSubmit;
                return <StyledForm>
                    <FormHeader>Sign up</FormHeader>
                    <Field name="firstName" component="input" validate={required}>
                        {({input, meta}) => (
                            <StyledField>
                                <Label>First Name</Label>
                                {meta.error && meta.touched && <Error>{meta.error}</Error>}
                                <Input {...input} type="text" disabled={this.state.submitting} autoFocus={true}
                                       error={meta.error && meta.touched}/>

                            </StyledField>
                        )}
                    </Field>
                    <Field name="lastName" component="input" validate={required}>
                        {({input, meta}) => (
                            <StyledField>
                                <Label>Last Name</Label>
                                {meta.error && meta.touched && <Error>{meta.error}</Error>}
                                <Input {...input} type="text" disabled={this.state.submitting} autoFocus={true}
                                       error={meta.error && meta.touched}/>

                            </StyledField>
                        )}
                    </Field>
                    <Field name="email" component="input" validate={composeValidators(required, email)}>
                        {({input, meta}) => (
                            <StyledField>
                                <Label>Email</Label>
                                {meta.error && meta.touched && <Error>{meta.error}</Error>}
                                <Input {...input} type="text" disabled={this.state.submitting} autoFocus={true}
                                       error={meta.error && meta.touched}/>

                            </StyledField>
                        )}
                    </Field>
                    <Field name="password" component="input" validate={required}>
                        {({input, meta}) => (
                            <StyledField>
                                <Label>Password</Label>
                                {meta.error && meta.touched && <Error>{meta.error}</Error>}
                                <Input {...input} type="text" disabled={this.state.submitting}
                                       error={meta.error && meta.touched}/>

                            </StyledField>
                        )}
                    </Field>
                    {this.state.error && <ServerError>{this.state.error.message}</ServerError>}
                    <Button disabled={!this.valid} onClick={this.submit}>Sign in</Button>
                    <GotoLoginLink to="/login">Login</GotoLoginLink>
                    <FormSpy subscription={{valid: true}}
                             onChange={({valid}) => this.valid = valid}/>
                </StyledForm>
            }}
        />;
    };


    private onSubmit = (values) => {
        HttpService.post<firebase.User>("auth/signup", {
            ...values
        }).subscribe((user: firebase.User) => {

            //  this.props.firebase
            //     .getUser(user.uid)
            //     .set({
            //     username: `${values.firstName} ${values.lastName}`,
            //     email: values.email,
            // });
            this.props.history.push("/");
        }, (error) => {
            this.setState({error})
        })
    };

}

export default withFirebase(withRouter(SignupPage));