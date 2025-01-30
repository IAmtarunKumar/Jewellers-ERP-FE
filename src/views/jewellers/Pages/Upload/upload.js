import React, { useEffect, useState } from "react";
import "./upload.scss";
import { FaCheckCircle, FaDownload } from "react-icons/fa";
import { MdDelete, MdOutlineDescription, MdError } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { FormGroup } from "reactstrap";
import axios from "axios";
import { toastify } from "common/helpers/toast";
import DowloadLink from "./dowloadLink";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const Upload = () => {
  const [fileInfo, setFileInfo] = useState([]);
  const [fileType, setFileType] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [error, setError] = useState("");
  const [rawFiles, setRawFiles] = useState([]);
  const { darkTheme } = useContext(ThemeContext);

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      accept: "text/csv, text/xml, application/xml",
      multiple: true,
    });

  useEffect(() => {
    const newFiles = acceptedFiles.map((file) => {
      return {
        name: file.name,
        size: (file.size / 1024).toFixed(1),
      };
    });
    setRawFiles(acceptedFiles);
    if (newFiles.length) {
      setFileInfo((prevFiles) => [...prevFiles, ...newFiles]);
      setIsFileUploaded(false);
      setProgressWidth(0);
      setError("");
    }

    if (fileRejections.length) {
      setError("Only .csv and .xml files are allowed.");
    }
  }, [acceptedFiles, fileRejections]);

  const handleUpload = async () => {
    // console.log(fileType, rawFiles);

    if (!fileType || fileType === "Select") {
      setError("Please select a file type.");
      return;
    }
    // console.log("filetype", fileType);
    const formData = new FormData();
    formData.append("filetype", fileType);
    // console.log("fileinfohere", rawFiles);
    rawFiles.forEach((fileData) => {
      formData.append("file", fileData);
    });
    await axios
      .post(
        `https://jewellers-erp.onrender.com/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.status !== 200) return;
        toastify({ msg: response.data, type: "success" });
        // resetForm();
      })
      .catch((error) => {
        toastify({ msg: error.response.data, type: "error" });
      });
    if (fileInfo.length > 0) {
      let width = 0;
      const interval = setInterval(() => {
        if (width >= 390) {
          clearInterval(interval);
          setIsFileUploaded(true);
        } else {
          width += 5;
          setProgressWidth(width);
        }
      }, 50);
    } else {
      setError("Please select a file first.");
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = fileInfo.filter((_, index) => index !== indexToRemove);
    setFileInfo(updatedFiles);

    if (updatedFiles.length === 0) {
      setIsFileUploaded(false);
      setProgressWidth(0);
    }
  };

  return (
    <form className="form-container container" encType="multipart/form-data">
      <div className="mb-2">
        <FormGroup>
          <label htmlFor="file" className="file-select">
            Which File You Want To Upload Please Select:
          </label>
          <select
            onChange={(e) => {
              setFileType(e.target.value);
              if (e.target.value !== "Select") {
                setError("");
              } else {
                setError("Please select a valid file type.");
              }
            }}
            id="file"
            className="form-control"
          >
            <option>Select</option>
            <option value="sale">Sales File</option>
            <option value="customer">Customer File</option>
            <option value="product">Product File</option>
            <option value="vendor">Vendor File</option>
            <option value="supplier">Supplier File</option>
            <option value="hallmarkCenter">Hallmark Center File</option>
            <option value="businessHolder">Business Holder File</option>
          </select>
        </FormGroup>
      </div>
      <div className="mb-5">
        <h2 className={`${darkTheme ? " text-white" : " text-dark"}`}>
          Here is a sample file for reference
        </h2>
        <DowloadLink fileName={fileType} />
      </div>

      <div
        className={`${
          darkTheme ? "bg-dark-gray" : " bg-white "
        } upload-files-container`}
      >
        <div
          className={`${
            darkTheme ? " border-white " : "border-dark "
          } drag-file-area`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <span className="upload-icon">
            {isFileUploaded ? <FaCheckCircle /> : <FaDownload />}
          </span>
          <h3
            className={`${
              darkTheme ? " text-white" : " text-dark"
            } dynamic-message`}
          >
            {isFileUploaded
              ? "File uploaded successfully!"
              : "Drag & drop any file here"}
          </h3>
          <label
            className={`${darkTheme ? " text-white" : " text-dark"} label`}
          >
            or
            <span
              className={`${
                darkTheme ? " text-white" : " text-dark"
              } browse-files`}
            >
              <span
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } browse-files-text`}
              >
                &nbsp; browse file&nbsp;{" "}
              </span>
              from device
            </span>
          </label>
        </div>
        {error && (
          <span className="cannot-upload-message">
            <MdError />
            {error}
          </span>
        )}
        <div className="files">
          {fileInfo &&
            fileInfo.map((file, index) => (
              <div
                className={`${
                  darkTheme ? " bg-white  text-dark" : "bg-dark-gray text-white"
                } file-block`}
                key={index}
              >
                <div className="file-info">
                  <span className="material-icons-outlined file-icon">
                    <MdOutlineDescription />
                  </span>
                  {file.name} | {file.size} KB
                </div>
                <span
                  className="material-icons remove-file-icon"
                  onClick={() => handleRemoveFile(index)}
                >
                  <MdDelete />
                </span>
                <div
                  className="progress-bar"
                  style={{ width: `calc(${progressWidth}px - 35px)` }}
                ></div>
              </div>
            ))}
        </div>
        <button
          type="button"
          onClick={handleUpload}
          className="upload-button bg-erp"
          disabled={error}
        >
          {isFileUploaded ? "Uploaded" : "Upload"}
        </button>
      </div>
    </form>
  );
};

export default Upload;
