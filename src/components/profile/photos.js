import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

export default function Photos({ photos }) {
  return <div>i am photos</div>;
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
};
