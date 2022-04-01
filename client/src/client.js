import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";

const cache = new InMemoryCache();

const http = new HttpLink({ uri: "http://localhost:4000/" });
const delay = setContext(
  (request) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 800);
    })
);

const link = ApolloLink.from([delay, http]);

const client = new ApolloClient({ link, cache });

export default client;
