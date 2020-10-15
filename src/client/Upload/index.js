import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Upload = () => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
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
    uploadImage(previewSource);
  };

  const uploadImage = async (base64) => {
    try {
      await fetch("/api/getFoodItems", {
        method: "POST",
        body: JSON.stringify({ data: base64 }),
        headers: { "Content-type": "application/json" },
      });
    } catch (err) {
      console.log(err);
    }
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
