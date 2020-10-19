import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Review } from '../types';

interface Values {
  name: string;
  email?: string;
  text: string;
}

const AddReviewDocument = gql`
  mutation AddReview($review: AddReviewInput!) {
    addReview(review: $review) {
      id
      name
      email
      text
    }
  }
`;

interface AddReviewMutation {
  addReview: Review | null;
}

interface AddReviewMutationVariables {
  review: Values;
}

interface Props {
  onSuccess: () => void;
}

const ReviewForm: React.FC<Props> = ({ onSuccess }) => {
  const { register, handleSubmit, reset } = useForm<Values>();
  const [addReview] = useMutation<
    AddReviewMutation,
    AddReviewMutationVariables
  >(AddReviewDocument);

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const result = await addReview({ variables: { review: values } });
        if (result.data?.addReview) {
          onSuccess();
          reset();
        }
      })}
    >
      <div className="field">
        <label htmlFor="review-name">Name*</label>
        <input id="review-name" name="name" ref={register} />
      </div>

      <div className="field">
        <label htmlFor="review-email">Email</label>
        <input id="review-email" name="email" ref={register} />
      </div>

      <div className="field">
        <label htmlFor="review-text">Your review*</label>
        <textarea id="review-text" name="text" rows={3} ref={register} />
      </div>

      <button type="submit">Submit</button>

      <style jsx>{`
        form,
        .field {
          margin: 0 0 20px;
        }
        input,
        textarea {
          border: 0;
          border-radius: 3px;
          background: #16161a;
          color: #fffffe;
          display: block;
          font-size: inherit;
          margin: 5px 0 0;
          padding: 12px;
          width: 100%;
        }
        input:focus,
        textarea:focus {
          box-shadow: 0 0 3px 3px #7f5af0;
          outline: 0;
        }
        button {
          border: 0;
          border-radius: 3px;
          background: #7f5af0;
          color: #fffffe;
          cursor: pointer;
          display: inline-block;
          line-height: 1.2;
          font-size: inherit;
          padding: 12px 16px;
        }
        button:focus {
          box-shadow: 0 0 0 3px rgba(127, 90, 140, 0.3);
          outline: 0;
        }
      `}</style>
    </form>
  );
};

export default ReviewForm;
