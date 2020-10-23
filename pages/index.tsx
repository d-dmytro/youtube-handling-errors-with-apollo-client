import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import Menu from '../components/Menu';
import ReviewForm from '../components/ReviewForm';
import styles from '../styles/Home.module.css';
import { Product, Review } from '../types';

const ProductAndReviewsDocument = gql`
  query AllReviews($limit: Int) {
    product {
      name
      description
    }
    reviews(limit: $limit) {
      id
      name
      email
      text
    }
  }
`;

interface ProductAndReviewsQuery {
  product: Product | null;
  reviews: Review[];
}

interface ProductAndReviewsQueryVariables {
  limit?: number;
}

export default function Home() {
  const { data, loading, refetch } = useQuery<
    ProductAndReviewsQuery,
    ProductAndReviewsQueryVariables
  >(ProductAndReviewsDocument, { variables: { limit: 2 } });

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {loading
            ? 'Loading...'
            : data?.product
            ? data.product.name
            : 'Failed to load a product'}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          {data.product && (
            <div>
              <h1>{data.product.name}</h1>
              <p>{data.product.description}</p>
            </div>
          )}

          <h2>Reviews</h2>
          {data.reviews.length ? (
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
        </>
      ) : null}

      <h2>Leave a review</h2>
      <ReviewForm onSuccess={() => refetch()} />
    </div>
  );
}
