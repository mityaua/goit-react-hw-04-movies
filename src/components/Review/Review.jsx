import PropTypes from 'prop-types';

const Review = ({ author, content }) => {
  return (
    <div>
      <b>{author}</b>
      <p>{content}</p>
    </div>
  );
};

Review.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Review;
