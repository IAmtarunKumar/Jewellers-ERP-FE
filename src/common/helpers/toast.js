import { toast } from "react-toastify";

export const toastify = ({ msg, type = "success" }) => {
  try {
    return toast[type](msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } catch (error) {
    console.error(error);
  }
};
