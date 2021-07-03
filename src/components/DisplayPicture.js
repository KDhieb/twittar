import "../css/components.css";

const DisplayPicture = ({ key, src, alt, classname, update }) => {
  return (
    <img
      key={src}
      className={classname}
      src={`${src}?${Date.now()}`}
      alt={alt}
    />
  );
};

export default DisplayPicture;

/* <img
          key={imagelink}
          className="grid-item profile-dp dp"
          src={imagelink}
          alt="Display picture"
        /> */
