import { StyledHeader } from "common/constant/constant";
import { useUser } from "common/context/userContext";  
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Columns = () => {
  const { isAdmin, edit } = useUser();
  const navigate = useNavigate();
  
  return [
    {
      name: <StyledHeader>Center Name</StyledHeader>,
      selector: (row) => row.centerName,
    },
    {
      name: <StyledHeader>Center Id</StyledHeader>,
      selector: (row) => row.hallmarkCenterId,
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
      name: <StyledHeader>Email</StyledHeader>,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: <StyledHeader>Authorized By</StyledHeader>,
      selector: (row) => row.authorizedBy,
      sortable: true,
    },
    ...(isAdmin || edit ? [{
      name: <StyledHeader>Action</StyledHeader>,
      selector: (row) => (
        <button
          onClick={() =>
            navigate(`/admin/editHallMarkCenter/${row.hallmarkCenterId}`, {
              state: { centerData: row },
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
