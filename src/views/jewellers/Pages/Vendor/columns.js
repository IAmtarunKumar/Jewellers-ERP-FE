import { StyledHeader } from "common/constant/constant";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useUser } from "common/context/userContext"; 

const Columns = () => {
  const navigate = useNavigate();
  const { isAdmin, edit } = useUser();

  return [
    {
      name: <StyledHeader>Vendor Id</StyledHeader>,
      selector: (row) => row.vendorId,
    },
    {
      name: <StyledHeader>Name</StyledHeader>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <StyledHeader>Contact</StyledHeader>,
      selector: (row) => row.contact,
      sortable: true,
    },
    {
      name: <StyledHeader>Address</StyledHeader>,
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: <StyledHeader>Pincode</StyledHeader>,
      selector: (row) => row.pincode,
      sortable: true,
    },
    ...(isAdmin || edit ? [{
      name: <StyledHeader>Action</StyledHeader>,
      selector: (row) => (
        <>
          <button
            onClick={() =>
              navigate(`/admin/editVendor/${row.vendorId}`, {
                state: { vendorData: row },
              })
            }
            className="btn btn-warning"
          >
            <AiOutlineEdit />
          </button>
        </>
      ),
      sortable: true,
    }] : [])
  ];
};

export default Columns;
