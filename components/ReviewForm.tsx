import React, { useState } from 'react';
import { gql, isApolloError, useMutation } from '@apollo/client';
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
  const {
    register,
    handleSubmit,
    formState,
    reset,
    errors,
    setError,
  } = useForm<Values>();

  const [addReview, { error }] = useMutation<
    AddReviewMutation,
    AddReviewMutationVariables
  >(AddReviewDocument);

  const [errorMessage, setErrorMessage] = useState<string>();

  const submitHandler: SubmitHandler<Values> = async (values) => {
    try {
      const result = await addReview({
        variables: { review: values },
      });

      if (result.data?.addReview) {
        onSuccess();
        reset();
      }
    } catch (e) {
      let messageShown = false;

      if (isApolloError(e)) {
        for (const gqlError of e.graphQLErrors) {
          if (gqlError.extensions?.code === 'BAD_USER_INPUT') {
            if (Array.isArray(gqlError.extensions?.errors)) {
              setErrorMessage(gqlError.message);

              for (const fieldError of gqlError.extensions.errors) {
                setError(fieldError.property, {
                  message: fieldError.message,
                });
              }

              messageShown = true;
            }
          }
        }
      }

      if (!messageShown) {
        setErrorMessage('An error occurred.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
      {errorMessage && <p>{errorMessage}</p>}
      <div className={styles.field}>
        <label htmlFor="review-name">Name*</label>
        <input
          id="review-name"
          name="name"
          ref={register}
          className={styles.input}
        />
        {errors.name && <p>{errors.name.message}</p>}
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
        {errors.text && <p>{errors.text.message}</p>}
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
