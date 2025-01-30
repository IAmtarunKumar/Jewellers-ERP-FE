// useProfileImage.js
import { useState, useEffect } from "react";
import axios from "axios";
import { initializeApp, getApps } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import jwtDecode from "jwt-decode";
const apps = getApps();
// Firebase configuration should ideally be in a .env file or another configuration file
const firebaseConfig = {
  apiKey: "AIzaSyAacefHpzyWL1GwQ71kECB6bl1cG3DugSs",
  authDomain: "aestra-jewellers-files.firebaseapp.com",
  projectId: "aestra-jewellers-files",
  storageBucket: "aestra-jewellers-files.appspot.com",
  messagingSenderId: "176790703198",
  appId: "1:176790703198:web:b0bbded8b36b2136c1f8cf",
  measurementId: "G-W6PHRDWFJY",
};

let app;
if (!apps.length) {
  app = initializeApp(firebaseConfig);
} else {
  app = apps[0];
}
const storage = getStorage(app);

// Custom hook
const useProfileImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let sessionId;
      if (localStorage.getItem("userDetail")) {
        sessionId = jwtDecode(localStorage.getItem("userDetail")).foundUser
          .sessionId;
      }

      try {
        const fetchedUser = await axios.post(
          `https://jewellers-erp.onrender.com/users/fetchOne`,
          { sessionId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Fetch the image URL
        await fetchImageUrl(fetchedUser.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  const fetchImageUrl = async (userData) => {
    // console.log("userdatainhere", userData);
    const fileRef = ref(storage, userData.profilePic); 

    try {
      // Get the download URL
      const url = await getDownloadURL(fileRef);
      setImageUrl(url);
    } catch (error) {
      if (error.response?.data) {
        console.error("Error getting download URL:", error.response.data);
      } else {
        console.error("Error getting download URL:", error.message);
      }
      setError(error);
    }
  };

  return { imageUrl, error };
};

export default useProfileImage;
