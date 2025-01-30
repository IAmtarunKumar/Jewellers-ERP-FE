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
      name: <StyledHeader>Appraiser Email Id</StyledHeader>,
      selector: (row) => row.appraiserEmailId,
      sortable: true,
    },
    {
      name: <StyledHeader>Appraisal Date</StyledHeader>,
      selector: (row) => row.appraisalDate,
      sortable: true,
    },
    {
      name: <StyledHeader>Appraisal Value</StyledHeader>,
      selector: (row) => row.appraisedValue,
      sortable: true,
    },
  ];
};

export default Columns;
