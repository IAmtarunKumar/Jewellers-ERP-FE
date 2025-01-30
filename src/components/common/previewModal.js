import { useState, useEffect } from "react";
import React from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  Col,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
const PreviewModal = ({ previewModal, selectedRow, togglePreviewModal }) => {
  console.log("selectedRow we are here", selectedRow);
  const [imageUrls, setImageUrls] = useState([]);
  const { darkTheme } = useContext(ThemeContext);
  // const getImageUrlForSelectedRow = () => {
  //   console.log("we are here in getimageurlforselectedrow");
  //   // console.log("selectedRowlog", selectedRow)
  //   if (!selectedRow) return null;
  //   const imageObject = imageUrls.find(
  //     (imgObj) => imgObj.name === selectedRow.picture
  //   );
  //   // console.log("imageObjecthere", imageObject)
  //   return imageObject ? imageObject.url : null;
  // };

  const fetchData = async () => {
    try {
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

      const fetchImageURL = async (imageName) => {
        const fileRef = ref(storage, imageName);
        return getDownloadURL(fileRef)
          .then((url) => {
            return { name: imageName, url };
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            return null;
          });
      };

      const imagePromises = [];
      if (selectedRow.picture) {
        imagePromises.push(fetchImageURL(selectedRow.picture));
      }
      if (selectedRow.picture2) {
        imagePromises.push(fetchImageURL(selectedRow.picture2));
      }

      const fetchedImageUrls = await Promise.all(imagePromises);
      setImageUrls(fetchedImageUrls.filter(Boolean));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [selectedRow]);

  return (
    <Modal
      isOpen={previewModal}
      toggle={togglePreviewModal}
      className={`${
        darkTheme ? "bg-dark-gray text-white" : " bg-white text-dark"
      }`}
    >
      <ModalHeader toggle={togglePreviewModal}>
        <p
          className={`${
            darkTheme ? "text-white" : "text-dark"
          } text-center display-5 bg-transparent`}
        >
          Image
        </p>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Container>
            <Row className="mb-3">
              {imageUrls.map((imageObj, index) => (
                <Col lg={12} className="d-flex justify-content-center">
                  <img
                    key={index}
                    src={imageObj.url}
                    alt={`Preview ${index + 1}`}
                    width="100%"
                    className={index > 0 ? "mt-3" : ""}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default PreviewModal;
