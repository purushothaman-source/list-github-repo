import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

// Set `RestLink` with your endpoint
const restLink = new RestLink({ uri: "https://api.github.com" });

// Setup your client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
  connectToDevTools: true
});

export const Apollo = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
