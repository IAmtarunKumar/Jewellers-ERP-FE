import axios from "axios";
import { StyledHeader } from "common/constant/constant";
import { useUser } from "common/context/userContext";
import { toastify } from "common/helpers/toast";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Columns = ({ imageUrls, refreshTableData }) => {
  const navigate = useNavigate();
  const { isAdmin, edit } = useUser();

  const handleImageUpload = async (e, row) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      try {
        console.log("selectedfile", selectedFile);
        const formData = new FormData();
        formData.append("editImage", selectedFile);

        // Add other product details
        for (const key in row) {
          if (row.hasOwnProperty(key)) {
            formData.append(key, row[key]);
          }
        }
        console.log("the formdata to be send", formData);
        await axios
          .post(`https://aestraswift.ocpl.tech/jewellers/editProduct`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.status !== 200) return;
            toastify({ msg: response.data, type: "success" });
            navigate("/admin/allProducts");
            refreshTableData();
          })
          .catch((error) => {
            toastify({ msg: error.response.data, type: "error" });
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const renderImageCell = (row) => {
    let imageElement;
    // Display the image from imageUrls
    for (const imageObject of imageUrls) {
      if (imageObject.name === row.imageUrl) {
        imageElement = (
          <img src={imageObject.url} alt={row.productName} width="80" />
        );
        break;
      } else {
        imageElement = (
          <div>
            <label className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, row)}
              />
              <span>
                <i className="fa fa-upload"></i>
              </span>
            </label>
          </div>
        );
      }
    }
    return imageElement;
  };
  return [
    {
      name: <StyledHeader>Product Image</StyledHeader>,
      cell: (row) => renderImageCell(row),
    },
    {
      name: <StyledHeader>Product Name</StyledHeader>,
      selector: (row) => row.productName,
    },
    {
      name: <StyledHeader>SKU</StyledHeader>,
      selector: (row) => row.sku,
      sortable: true,
    },
    {
      name: <StyledHeader>Size</StyledHeader>,
      selector: (row) => row.size,
      sortable: true,
    },
    {
      name: <StyledHeader>Material</StyledHeader>,
      selector: (row) => row.material,
      sortable: true,
    },
    {
      name: <StyledHeader>Price</StyledHeader>,
      selector: (row) => `₹${row.price}.00`,
      sortable: true,
    },
    ...(isAdmin || edit
      ? [
          {
            name: <StyledHeader>Action</StyledHeader>,
            selector: (row) => (
              <>
                <button
                  onClick={() =>
                    navigate(`/admin/editProducts/${row.productId}`, {
                      state: { productData: row },
                    })
                  }
                  className="btn btn-warning"
                >
                  <AiOutlineEdit />
                </button>
              </>
            ),
            sortable: true,
          },
        ]
      : []),
  ];
};
export default Columns;
