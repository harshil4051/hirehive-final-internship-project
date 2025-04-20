const ResumeModal = ({ imageUrl, onClose }) => {
  const isPdf = imageUrl?.toLowerCase().endsWith(".pdf");

  return (
    <div
      className="resume-modal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#000000b5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        className="modal-content"
        style={{
          width: "90%",
          height: "90%",
          background: "#fff",
          position: "relative",
          padding: "20px",
          overflow: "auto",
        }}
      >
        <span
          className="close"
          style={{
            position: "absolute",
            top: 10,
            right: 20,
            fontSize: "2rem",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          &times;
        </span>
        {isPdf ? (
          <object
            data={imageUrl}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              Cannot display PDF.{" "}
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Click here to download
              </a>
              .
            </p>
          </object>
        ) : (
          <img
            src={imageUrl}
            alt="Resume"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        )}
      </div>
    </div>
  );
};
export default ResumeModal;
