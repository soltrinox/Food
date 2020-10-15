import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../store/reducers/upload";

const Upload = () => {
  const dispatch = useDispatch();
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleClick = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    dispatch(uploadImage(previewSource));
  };

  return (
    <>
      <h2> Upload</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          onChange={handleClick}
          value={fileInputState}
        />
        <Button type="submit" disabled={!previewSource}>
          Submit
        </Button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </>
  );
};

export default Upload;
