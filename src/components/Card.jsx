import PropTypes from 'prop-types';
const Card = ({ title, description, actionText, onAction }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-first-color mb-4">{title}</h2>
      <p className="text-black-600 mb-4">{description}</p>
      <button
        onClick={onAction}
        className="bg-third-color text-first-color px-4 py-2 rounded hover:bg-second-color"
      >
        {actionText}
      </button>
    </div>
  );
};
Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired
};
export default Card;