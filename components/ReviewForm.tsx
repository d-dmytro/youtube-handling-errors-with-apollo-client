import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Review } from '../types';
import styles from './ReviewForm.module.css';

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
  const { register, handleSubmit, formState, reset } = useForm<Values>();

  const [addReview] = useMutation<
    AddReviewMutation,
    AddReviewMutationVariables
  >(AddReviewDocument);

  const submitHandler: SubmitHandler<Values> = async (values) => {
    const result = await addReview({
      variables: { review: values },
    });

    if (result.data?.addReview) {
      onSuccess();
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="review-name">Name*</label>
        <input
          id="review-name"
          name="name"
          ref={register}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="review-email">Email</label>
        <input
          id="review-email"
          name="email"
          ref={register}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="review-text">Your review*</label>
        <textarea
          id="review-text"
          name="text"
          rows={3}
          ref={register}
          className={styles.input}
        />
      </div>

      <button
        type="submit"
        disabled={formState.isSubmitting}
        className={styles.button}
      >
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;
