import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Review {
    id: ID!
    name: String!
    email: String
    text: String!
  }

  type Product {
    name: String!
    description: String!
  }

  input AddReviewInput {
    name: String!
    email: String
    text: String!
  }

  type Query {
    product: Product
    reviews(limit: Int): [Review!]!
  }

  type Mutation {
    addReview(review: AddReviewInput!): Review
  }
`;
