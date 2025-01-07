import React, { useState } from "react";

const FileUploader = () => {
  const [uploadedData, setUploadedData] = useState([]);
  const url = "https://api.cloudinary.com/v1_1/duuesjzan/image/upload";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const files = e.target.fileInput.files;
    const uploadedResponses = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", "ml_default");

      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        uploadedResponses.push(data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setUploadedData((prev) => [...prev, ...uploadedResponses]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="fileInput" multiple />
        <button type="submit">Upload</button>
      </form>

      <div id="data">
        {uploadedData.map((data, index) => (
          <div key={index}>
            <p>Uploaded File: {data.original_filename}</p>
            <img
              src={data.secure_url}
              alt={data.original_filename}
              width="200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
