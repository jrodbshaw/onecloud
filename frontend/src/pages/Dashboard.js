import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ME_QUERY = gql`
  query ME_QUERY {
    user(id: "5ce3c7a52e124a0b5740c535") {
      id
    }
  }
`;

export default function Dashboard() {
  return (
    <div>
      <Query query={ME_QUERY}>
        {payload => {
          console.log(payload);
          return <p>I'm the child</p>;
        }}
      </Query>
    </div>
  );
}
