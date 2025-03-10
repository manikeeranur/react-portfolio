// import React, { useState } from "react";
// import { useParams } from "react-router-dom";

// const FileUploader = ({ fileName = "FrontImage", setImageUrl = () => {} }) => {
//   const { folderName } = useParams();

//   const [uploadedData, setUploadedData] = useState([]);

//   const cloudName = "duuesjzan";
//   const uploadPreset = "ml_default";

//   const handleFileUpload = async () => {
//     const files = document.getElementById(fileName).files;
//     const uploadedResponses = [];

//     const folderPath = folderName;

//     for (let i = 0; i < files.length; i++) {
//       const formData = new FormData();
//       formData.append("file", files[i]);
//       formData.append("upload_preset", uploadPreset);

//       const originalFileName = files[i].name.replace(/\.[^/.]+$/, "");
//       const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?folder=${encodeURIComponent(
//         folderPath
//       )}&public_id=${encodeURIComponent(originalFileName)}`;

//       try {
//         const response = await fetch(uploadUrl, {
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

//     if (setImageUrl && uploadedResponses.length > 0) {
//       setImageUrl(uploadedResponses[0]?.public_id);
//     }
//   };

//   return (
//     <div className="col-12 w-100 min-vh-100 bg-white p-5">
//       <h3>Uploading to: {folderName}</h3>
//       <div className="d-flex align-items-center gap-3">
//         <input
//           type="file"
//           id={fileName}
//           name="fileInput"
//           className="form-control"
//           multiple
//         />
//         <button
//           type="button"
//           className="btn btn-primary"
//           onClick={handleFileUpload}
//         >
//           Upload
//         </button>
//       </div>

//       <div id="data">
//         <div className="row gap-2 mt-3 mb-5">
//           {uploadedData.map((data, index) => (
//             <div
//               className="card px-0"
//               style={{
//                 width: "24%",
//               }}
//             >
//               <img
//                 key={index}
//                 src={data.secure_url}
//                 alt={data.original_filename}
//                 className="col-12 p-3"
//               />
//               <div className="card-footer bg-dark text-white">
//                 {" "}
//                 {data.original_filename}
//               </div>
//             </div>
//           ))}
//         </div>
//         {uploadedData.map((data, index) => (
//           <div key={index}>
//             <p>
//               <b>Stored URL : </b>
//               {data.url}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FileUploader;

import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const FileUploader = ({ fileName = "FrontImage", setImageUrl = () => {} }) => {
  const location = useLocation(); // Get full path
  const folderPath = location.pathname.replace("/fileuploader/", ""); // Extract folder structure

  const fileInputRef = useRef(null);
  const [uploadedData, setUploadedData] = useState([]);

  const cloudName = "duuesjzan";
  const uploadPreset = "ml_default";

  const handleFileUpload = async () => {
    if (!fileInputRef.current?.files.length) {
      alert("Please select files to upload.");
      return;
    }

    const files = fileInputRef.current.files;
    const uploadedResponses = [];

    // Ensure folder path is properly encoded for Cloudinary
    const encodedFolderPath = encodeURIComponent(folderPath);

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const originalFileName = file.name.replace(/\.[^/.]+$/, "");
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?folder=${encodedFolderPath}&public_id=${encodeURIComponent(
        originalFileName
      )}`;

      try {
        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
          uploadedResponses.push(data);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    if (uploadedResponses.length > 0) {
      setUploadedData((prev) => [...prev, ...uploadedResponses]);
      setImageUrl(uploadedResponses[0]?.secure_url);
    }
  };

  return (
    <div className="col-12 w-100 min-vh-100 bg-white p-5">
      <h3>Uploading to: {folderPath}</h3>

      <div className="d-flex align-items-center gap-3">
        <input
          type="file"
          ref={fileInputRef}
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
        <div className="row gap-2 mt-3 mb-5">
          {uploadedData.map((data, index) => (
            <div key={index} className="card px-0" style={{ width: "24%" }}>
              <img
                src={data.secure_url}
                alt={data.original_filename}
                className="col-12 p-3"
              />
              <div className="card-footer bg-dark text-white">
                {data.original_filename}
              </div>
            </div>
          ))}
        </div>

        {uploadedData.map((data, index) => (
          <div key={index}>
            <p>
              <b>Stored URL: </b>
              <a
                href={data.secure_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.secure_url}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
