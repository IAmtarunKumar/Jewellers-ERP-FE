import { StyledHeader } from "common/constant/constant";

const Columns = () => {
  return [
    {
      name: <StyledHeader>Hallmark Id</StyledHeader>,
      selector: (row) => row.hallmarkId,
      sortable: true,
    },
    {
      name: <StyledHeader>Hallmark Center Id</StyledHeader>,
      selector: (row) => row.hallmarkCenterId,
      sortable: true,
    },
    {
      name: <StyledHeader>Product Id</StyledHeader>,
      selector: (row) => row.productId,
      sortable: true,
    },
    {
      name: <StyledHeader>Date</StyledHeader>,
      selector: (row) => row.hallmarkDate,
      sortable: true,
    },
  ];
};

export default Columns;
