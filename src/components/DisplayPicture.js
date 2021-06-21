import "../css/components.css";

const DisplayPicture = ({ src, alt, classname }) => {
  return <img className={classname} src={src} alt={alt} />;
};

export default DisplayPicture;
