import { loader } from "graphql.macro";

const readRepos = loader("./repo/readRepo.graphql");

export { readRepos };
