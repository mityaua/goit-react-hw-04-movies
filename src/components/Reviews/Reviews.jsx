const Reviews = ({ reviews }) => {
  return (
    <ul>
      {reviews.length > 0 ? 'Yes' : 'We dont have any reviews for this movie'}

      {reviews.map(review => {
        return (
          <li key={review.id}>
            <span>{review.author}</span>
            <p>{review.content}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Reviews;
