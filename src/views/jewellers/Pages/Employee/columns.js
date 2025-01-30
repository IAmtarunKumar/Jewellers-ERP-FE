import { StyledHeader } from "common/constant/constant";
import { useUser } from "common/context/userContext";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Columns = () => {
  const { isAdmin, edit } = useUser();
  const navigate = useNavigate();

  return [
    {
      name: <StyledHeader>Id</StyledHeader>,
      selector: (row) => row.sessionId,
      sortable: true,
    },
    {
      name: <StyledHeader>Name</StyledHeader>,
      selector: (row) => row.name,
    },
    {
      name: <StyledHeader>Email</StyledHeader>,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: <StyledHeader>Mobile</StyledHeader>,
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: <StyledHeader>Designation</StyledHeader>,
      selector: (row) => row.designation,
      sortable: true,
    },
  ];
};

export default Columns;
