import ApolloBoost from "apollo-boost";

const client = new ApolloBoost({
    uri: "http://localhost:8080/graphql",
    request: operation => {
        operation.setContext({
            Authorization: `bearer ${sessionStorage.getItem("token")}`
        })
    }
  });

  export default client