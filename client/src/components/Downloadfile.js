import React, { useState } from "react";
import Navigation from "../Navigation";
import { useEffect } from "react";
import { saveAs } from "file-saver";
import axios from "axios";

const DownloadFile = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // fetch available files that were uploaded by the user
    fetch("http://localhost:5000/list")
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        // Examine the text in the response
        response.json().then((data) => {
          setFiles(data.files);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }, []);

  const downloadFile = async (e, filePath) => {
    e.preventDefault();
    console.log('function call')
    const formData = new FormData();
    formData.append("fileName", filePath);

    try {
      const { data } = await getFile();
      const blob = new Blob([data]);
      saveAs(blob, filePath);
    } catch (err) {
      if (err) console.log(err);
    }
    async function getFile() {
      return axios.post("http://localhost:5000/download", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer",
        withCredentials: true,
      });
    }
  };

  return (
    <div className="container mt-4">
      <Navigation />
      <h3 className="display-4 text-center mb-4">Files</h3>
      <ul className="list-group">
        {files.map((file, index) => {
          return (
            <li className="list-group-item" key={index}>
              {file}
              <button className="btn" onClick={(e) => downloadFile(e, file)}>
                Download
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DownloadFile;
