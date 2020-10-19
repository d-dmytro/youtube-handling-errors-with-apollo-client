import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Review {
    id: ID!
    name: String!
    email: String
    text: String!
  }

  input AddReviewInput {
    name: String!
    email: String
    text: String!
  }

  type Query {
    reviews: [Review!]!
  }

  type Mutation {
    addReview(review: AddReviewInput!): Review
  }
`;
