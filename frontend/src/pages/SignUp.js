import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { TextField, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
  ) {
    signUp(
      email: $email
      password: $password
    ) {
      id
    }
  }
`;

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { email, password, confirmPassword } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Mutation mutation={SIGNUP_MUTATION} variables={formData}>
      {(signUp, { loading, error }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h1>Create your OneCloud ID</h1>
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Re-type password"
              value={confirmPassword}
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

export default SignUp;
export { SIGNUP_MUTATION };
