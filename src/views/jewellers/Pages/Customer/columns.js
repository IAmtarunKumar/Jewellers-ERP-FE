import { StyledHeader } from "common/constant/constant";
import { useUser } from "common/context/userContext"; 
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Columns = () => {
  const { isAdmin, edit } = useUser();
  const navigate = useNavigate();
  
  return [
    {
      name: <StyledHeader>Customer Name</StyledHeader>,
      selector: (row) => row.name,
    },
    {
      name: <StyledHeader>Customer Id</StyledHeader>,
      selector: (row) => row.customerId,
      sortable: true,
    },
    {
      name: <StyledHeader>Address</StyledHeader>,
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: <StyledHeader>Contact</StyledHeader>,
      selector: (row) => row.contact,
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
        <button
          onClick={() =>
            navigate(`/admin/editCustomer/${row.customerId}`, {
              state: { customerData: row },
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
