import { IResolvers } from 'apollo-server-micro';
import { Review } from '../types';

interface AddReviewInput {
  name: string;
  email?: string;
  text: string;
}

interface AddReviewVariables {
  review: AddReviewInput;
}

let nextReviewId = 1;
const reviews: Review[] = [];

export const resolvers: IResolvers = {
  Query: {
    reviews(_parent, _args, _context, _info) {
      return reviews;
    },
  },
  Mutation: {
    addReview(_parent, { review }: AddReviewVariables) {
      const newReview: Review = {
        id: `${nextReviewId++}`,
        name: review.name,
        email: review.email,
        text: review.text,
      };

      reviews.push(newReview);

      return newReview;
    },
  },
};
