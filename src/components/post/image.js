import PropTypes from "prop-types";

export default function Image({ src, caption }) {
  return (
    <div>
      {/* if yopu want to center the images use this " className="block ml-auto
      mr-auto w-3/6" but it will aply to all images */}
      <img src={src} alt={caption} />
    </div>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
