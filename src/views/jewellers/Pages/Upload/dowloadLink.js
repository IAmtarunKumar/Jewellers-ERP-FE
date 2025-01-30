import React from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAacefHpzyWL1GwQ71kECB6bl1cG3DugSs",
  authDomain: "aestra-jewellers-files.firebaseapp.com",
  projectId: "aestra-jewellers-files",
  storageBucket: "aestra-jewellers-files.appspot.com",
  messagingSenderId: "176790703198",
  appId: "1:176790703198:web:b0bbded8b36b2136c1f8cf",
  measurementId: "G-W6PHRDWFJY",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const DowloadLink = ({ fileName }) => {
  const [downloadURL, setDownloadURL] = useState("");
  useEffect(() => {
    if (fileName) {
      // Mapping the fileType to the naming convention in Firebase storage
      const storageFileName = `sample${
        fileName.charAt(0).toUpperCase() + fileName.slice(1)
      }.csv`;

      const fileRef = ref(storage, storageFileName);

      getDownloadURL(fileRef)
        .then((url) => {
          setDownloadURL(url);
        })
        .catch((error) => {
          console.error("Error getting download URL:", error);
          setDownloadURL(""); // Reset in case of an error
        });
    }
  }, [fileName]);
  return downloadURL ? (
    <a
      href={downloadURL}
      download={`${fileName}.csv`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Download sample {fileName} file
    </a>
  ) : (
    <div>No file type selected</div>
  );
};

export default DowloadLink;
