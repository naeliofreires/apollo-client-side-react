import gql from "graphql-tag";

/**
 * @Queries
 */
const ALL_PETS = gql`
  query AllPets {
    pets {
      id
      name
      type
      img
    }
  }
`;

export const queries = {
  ALL_PETS,
};

/**
 * @Mutations
 */
const CREATE_A_PET = gql`
  mutation CreateAPet($input: NewPetInput!) {
    addPet(input: $input) {
      id
      name
      type
      img
    }
  }
`;

export const mutations = {
  CREATE_A_PET,
};
