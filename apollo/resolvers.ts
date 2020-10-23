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
    product() {
      return {
        name: 'Handling Errors with Apollo Client and React',
        description:
          'This is a good tutorial about error handling with Apollo Client and React.',
      };
    },
    reviews(_parent, { limit }: { limit?: number }, _context, _info) {
      return typeof limit === 'number' ? reviews.slice(0, limit) : reviews;
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
