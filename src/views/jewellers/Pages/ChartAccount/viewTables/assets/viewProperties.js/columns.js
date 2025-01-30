import { StyledHeader } from "common/constant/constant";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Columns = (handlePreviewButton) => {
  return [
    {
      name: <StyledHeader>Date</StyledHeader>,
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: <StyledHeader>Credit</StyledHeader>,
      selector: (row) => {
        return row.credit ? row.credit : 0;
      },
    },
    {
      name: <StyledHeader>Debit</StyledHeader>,
      selector: (row) => {
        return row.debit ? row.debit : 0;
      },
    },
    {
      name: <StyledHeader>Balance</StyledHeader>,
      selector: (row) => row.balance,
    },
    {
      name: <StyledHeader>Name</StyledHeader>,
      selector: (row) => row.partyName,
    },
    {
      name: <StyledHeader>Received</StyledHeader>,
      selector: (row) => row.receivedBy,
    },
    {
      name: <StyledHeader>Sent</StyledHeader>,
      selector: (row) => row.givenTo,
    },
    {
      name: <StyledHeader>Reference</StyledHeader>,
      selector: (row) => row.reference,
    },
    {
      name: <StyledHeader>Preview</StyledHeader>,
      selector: (row) => (
        <button
          onClick={() => handlePreviewButton(row)}
          className="btn btn-warning "
        >
          <AiOutlineInfoCircle />
        </button>
      ),
    },
    {
      name: <StyledHeader>Description</StyledHeader>,
      selector: (row) => {
        return row.description ? row.description : "No description";
      },
    },
  ];
};

export default Columns;
