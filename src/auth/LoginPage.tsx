import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import createDecorator from 'final-form-focus'
import { RouteComponentProps, withRouter } from "react-router";
import {
    Button, FormHeader, Label, StyledField, StyledForm, Wrapper, Input, Error,
    GotoSignupLink, ServerError
} from "./AuthForm.elements";
import { withFirebase } from "../common/database/FirebaseContext";
import { Firebase } from "../common/database/Firebase";

const focusOnErrors = createDecorator();

// validators
const isEmail = require("validator/lib/isEmail");
const required = (value) => (value ? undefined : "required");
const email = (value) => (isEmail(value) ? undefined : "invalid");
const composeValidators = (...validators) => (value) =>
    validators.reduce((error, v) => error || v(value), undefined);


class LoginPage extends React.Component<RouteComponentProps<{}> & { firebase: Firebase }, { valid?: boolean, submitting?: boolean, error?: {message: string} }> {

    private submit: () => void;
    private valid: boolean;

    constructor(props: any) {
        super(props);
        this.state = {valid: false, submitting: false};
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
            render={({handleSubmit}) => {
                this.submit = handleSubmit;
                return <StyledForm>
                    <FormHeader>Sign in</FormHeader>
                    <Field name="email" component="input" validate={composeValidators(required, email)}>
                        {({input, meta}) => (
                            <StyledField>
                                <Label>Email</Label>
                                {meta.error && meta.touched && <Error>{meta.error}</Error>}
                                <Input {...input} type="email" disabled={this.state.submitting} autoFocus={true}
                                       error={meta.error && meta.touched}/>

                            </StyledField>
                        )}
                    </Field>
                    <Field name="password" component="input" validate={required}>
                        {({input, meta}) => (
                            <StyledField>
                                <Label>Password</Label>
                                {meta.error && meta.touched && <Error>{meta.error}</Error>}
                                <Input {...input} type="password" disabled={this.state.submitting}
                                       error={meta.error && meta.touched}/>

                            </StyledField>
                        )}
                    </Field>
                    {this.state.error && <ServerError>{this.state.error.message}</ServerError>}
                    <Button disabled={!this.valid} onClick={this.submit}>Sign in</Button>
                    <GotoSignupLink to="/signup">Sign up</GotoSignupLink>
                    <FormSpy subscription={{valid: true}}
                             onChange={({valid}) => this.valid = valid}/>
                </StyledForm>
            }}
        />;
    };

    private onSubmit = (values) => {

        this.props.firebase.login(values.email, values.password)
            .then(() => {
                this.props.history.push("/");
            }).catch((error) => {
                this.setState({error})
        });
    };

}

export default withFirebase(withRouter(LoginPage));