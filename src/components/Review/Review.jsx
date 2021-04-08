const Review = ({ author, content }) => {
  return (
    <div>
      <b>{author}</b>
      <p>{content}</p>
    </div>
  );
};

export default Review;
