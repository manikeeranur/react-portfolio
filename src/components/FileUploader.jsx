// import React, { useState } from "react";

// const FileUploader = () => {
//   const [uploadedData, setUploadedData] = useState([]);
//   const url = "https://api.cloudinary.com/v1_1/duuesjzan/image/upload";

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const files = e.target.fileInput.files;
//     const uploadedResponses = [];

//     for (let i = 0; i < files.length; i++) {
//       const formData = new FormData();
//       formData.append("file", files[i]);
//       formData.append("upload_preset", "ml_default");

//       try {
//         const response = await fetch(url, {
//           method: "POST",
//           body: formData,
//         });

//         const data = await response.json();
//         uploadedResponses.push(data);
//       } catch (error) {
//         console.error("Error uploading file:", error);
//       }
//     }

//     setUploadedData((prev) => [...prev, ...uploadedResponses]);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" name="fileInput" multiple />
//         <button type="submit">Upload</button>
//       </form>

//       <div id="data">
//         {uploadedData.map((data, index) => (
//           <div key={index}>
//             <p>Uploaded File: {data.original_filename}</p>
//             <img
//               src={data.secure_url}
//               alt={data.original_filename}
//               width="200"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FileUploader;

import React, { useState } from "react";

const FileUploader = ({
  productId = 1,
  fileName = "FrontImage",
  setImageUrl,
}) => {
  const UserId = 1;
  const [uploadedData, setUploadedData] = useState([]);

  const cloudName = "duuesjzan";
  const uploadPreset = "ml_default";
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const handleFileUpload = async () => {
    const files = document.getElementById(fileName).files;
    const uploadedResponses = [];
    const folderName = `User_${UserId}/${
      productId ? `Product_${productId}` : "Common"
    }/${fileName}`;

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", folderName);

      const customFileName = `FI_Shoe_${Date.now()}`;
      formData.append("public_id", customFileName);

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

    setUploadedData((prev) => {
      const newData = [...prev, ...uploadedResponses];
      return newData;
    });

    setImageUrl(() => {
      const newPublicId = uploadedResponses[0]?.public_id;
      return newPublicId;
    });
  };

  return (
    <div className="col-12">
      <div className="d-flex align-items-center gap-3">
        <input
          type="file"
          id={fileName}
          name="fileInput"
          className="form-control"
          multiple
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleFileUpload}
        >
          Upload
        </button>
      </div>

      <div id="data">
        {uploadedData.map((data, index) => (
          <div key={index}>
            <p>Uploaded File: {data.original_filename}</p>
            <p>Custom Name: {data.public_id}</p>
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
