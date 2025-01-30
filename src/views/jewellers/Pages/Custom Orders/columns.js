import { StyledHeader } from "common/constant/constant";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Columns = () => {
  const navigate = useNavigate();
  return [
    {
      name: <StyledHeader>Customer Id</StyledHeader>,
      selector: (row) => row.customerId,
    },
    {
      name: <StyledHeader>Product Name</StyledHeader>,
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: <StyledHeader>Description</StyledHeader>,
      selector: (row) => row.productDescription,
      sortable: true,
    },
    {
      name: <StyledHeader>Order Date</StyledHeader>,
      selector: (row) => row.orderDate,
      sortable: true,
    },
    {
      name: <StyledHeader>Completion Date</StyledHeader>,
      selector: (row) => row.completionDate,
      sortable: true,
    },
    {
      name: <StyledHeader>Action</StyledHeader>,
      selector: (row) => (
        <>
          <button
            onClick={() =>
              navigate(`/admin/editCustomOrder/${row.customerId}`, {
                state: { customOrderData: row },
              })
            }
            className="btn btn-warning "
          >
            <AiOutlineEdit />
          </button>
        </>
      ),
      sortable: true,
    },
  ];
};

export default Columns;
