import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import ReviewForm from '../components/ReviewForm';
import styles from '../styles/Home.module.css';
import { Review } from '../types';

const AllReviewsDocument = gql`
  query AllReviews {
    reviews {
      id
      name
      email
      text
    }
  }
`;

interface AllReviewsQuery {
  reviews: Review[];
}

export default function Home() {
  const { data, loading, refetch } = useQuery<AllReviewsQuery>(
    AllReviewsDocument
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2>Reviews</h2>

      {loading ? (
        <p>Loading...</p>
      ) : data && data.reviews.length ? (
        <ul>
          {data.reviews.map((review) => {
            return (
              <li key={review.id}>
                <div>{review.name}</div>
                <div>{review.text}</div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}

      <h2>Leave a review</h2>
      <ReviewForm onSuccess={() => refetch()} />
    </div>
  );
}
