import { StyledHeader } from "common/constant/constant";

const Columns = () => {
  return [
    {
      name: <StyledHeader>Customer Id</StyledHeader>,
      selector: (row) => row.customerId,
    },
    {
      name: <StyledHeader>Product Id</StyledHeader>,
      selector: (row) => row.productId,
      sortable: true,
    },
    {
      name: <StyledHeader>Date</StyledHeader>,
      selector: (row) => row.saleDate,
      sortable: true,
    },
    {
      name: <StyledHeader>Quantity</StyledHeader>,
      selector: (row) => row.quantity,
      sortable: true,
    },
  ];
};

export default Columns;
