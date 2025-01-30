import { StyledHeader } from "common/constant/constant";
import { useUser } from "common/context/userContext"; 
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Columns = () => {
  const { isAdmin, edit } = useUser();
  const navigate = useNavigate();
  
  return [
    {
      name: <StyledHeader>Raw Material Name</StyledHeader>,
      selector: (row) => row.rawMaterialName,
    },
    {
      name: <StyledHeader>Raw Material Type</StyledHeader>,
      selector: (row) => row.rawMaterialType,
      sortable: true,
    },
    {
      name: <StyledHeader>Vendor Name</StyledHeader>,
      selector: (row) => row.vendorName,
      sortable: true,
    },
    {
      name: <StyledHeader>Given Date</StyledHeader>,
      selector: (row) => row.givenDate,
      sortable: true,
    },
    {
      name: <StyledHeader>Return Date</StyledHeader>,
      selector: (row) => row.returnDate,
      sortable: true,
    },
    {
      name: <StyledHeader>Price</StyledHeader>,
      selector: (row) => row.priceDecided,
      sortable: true,
    },
    ...(isAdmin || edit ? [{
      name: <StyledHeader>Action</StyledHeader>,
      selector: (row) => (
        <button
          onClick={() =>
            navigate(`/admin/editJobWork/${row.rawMaterialName}`, {
              state: { jobWorkData: row },
            })
          }
          className="btn btn-warning "
        >
          <AiOutlineEdit />
        </button>
      ),
      sortable: true,
    }] : [])
  ];
};

export default Columns;
