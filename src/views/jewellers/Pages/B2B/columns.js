import { StyledHeader } from "common/constant/constant";
import { useUser } from "common/context/userContext";
import { AiOutlineEdit } from "react-icons/ai";
import { SiGooglemeet } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const Columns = (toggleMeetModal, setCurrentB2B) => {
  const { isAdmin, edit } = useUser();
  console.log(isAdmin, edit);
  const navigate = useNavigate();

  const handelMeetBtn = (row) => {
    toggleMeetModal();
    setCurrentB2B(row);
  };

  return [
    {
      name: <StyledHeader>B2B Id</StyledHeader>,
      selector: (row) => row.businessHolderId,
    },
    {
      name: <StyledHeader>Name</StyledHeader>,
      selector: (row) => row.name,
    },
    {
      name: <StyledHeader>Contact</StyledHeader>,
      selector: (row) => row.contact,
    },
    {
      name: <StyledHeader>Address</StyledHeader>,
      selector: (row) => row.address,
    },
    ...(isAdmin || edit ? [{
      name: <StyledHeader>Action</StyledHeader>,
      selector: (row) => (
        <div>
          <button
            className="btn btn-warning p-2"
            onClick={() => handelMeetBtn(row)}
          >
            <SiGooglemeet />
          </button>
          <button
            onClick={() =>
              navigate(`/admin/editB2B/${row.B2BId}`, {
                state: { B2BData: row },
              })
            }
            className="btn btn-warning p-2"
          >
            <AiOutlineEdit />
          </button>
        </div>
      ),
    }] : [])
  ];
};

export default Columns;
