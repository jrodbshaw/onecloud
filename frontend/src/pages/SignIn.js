import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { TextField, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Mutation mutation={SIGNIN_MUTATION} variables={formData}>
      {(signUp, { loading, error }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h1>Sign In</h1>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
            onSubmit={async e => {
              e.preventDefault();
              const res = await signUp();
              console.log(res);
            }}
            noValidate
          >
            {loading ? console.log("loading...") : console.log("finished")}
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={e => onChange(e)}
              disabled={loading}
              autoComplete="email"
              margin="dense"
              variant="outlined"
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Example123"
              value={password}
              onChange={e => onChange(e)}
              disabled={loading}
              autoComplete="new-password"
              margin="dense"
              variant="outlined"
            />
            <Fab
              style={{
                marginTop: 10
              }}
              type="submit"
              disabled={loading}
              color="primary"
              aria-label="Add"
            >
              <AddIcon />
            </Fab>
          </form>
        </div>
      )}
    </Mutation>
  );
}

export default SignIn;
export { SIGNIN_MUTATION };
