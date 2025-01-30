import { StyledHeader } from "common/constant/constant";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Columns = () => {
  const navigate = useNavigate();
  return [
    {
      name: <StyledHeader>Name</StyledHeader>,
      selector: (row) => row.name,
    },
    {
      name: <StyledHeader>Type</StyledHeader>,
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: <StyledHeader>Initial Weight (in grams):</StyledHeader>,
      selector: (row) => `${row.initialWeight} grams`,
      sortable: true,
    },
    {
      name: <StyledHeader>Initial Stock Date:</StyledHeader>,
      selector: (row) => row.initialStockDate,
      sortable: true,
    },
    {
      name: <StyledHeader>Last Stock Date:</StyledHeader>,
      selector: (row) => row.lastStockDate,
      sortable: true,
    },

    {
      name: <StyledHeader>Current Weight (in grams):</StyledHeader>,
      selector: (row) => row.currentWeight,
      sortable: true,
    },
    {
      name: <StyledHeader>Last Bought Price</StyledHeader>,
      selector: (row) => `₹${row.lastBoughtPrice}.00`,
      sortable: true,
    },
    // {
    //   name: <StyledHeader>Action</StyledHeader>,
    //   selector: (row) => (
    //     <>
    //       <button
    //         onClick={() =>
    //           navigate(`/admin/editRawMaterial/${row.supplierId}`, {
    //             state: { rawMaterialData: row },
    //           })
    //         }
    //         className="btn btn-warning "
    //       >
    //         <AiOutlineEdit />
    //       </button>
    //     </>
    //   ),
    //   sortable: true,
    // },
  ];
};

export default Columns;
