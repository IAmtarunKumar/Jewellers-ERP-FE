import { StyledHeader } from "common/constant/constant";
import { useUser } from "common/context/userContext";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Columns = () => {
  const navigate = useNavigate();
  const { isAdmin, edit } = useUser();

  return [
    {
      name: <StyledHeader>Customer Name</StyledHeader>,
      selector: (row) => row.customerName,
      sortable: true,
    },
    {
      name: <StyledHeader>Invoice Number</StyledHeader>,
      selector: (row) => row.invoceNumber,
      sortable: true,
    },
    {
      name: <StyledHeader>Amount</StyledHeader>,
      selector: (row) => row.totalAmount,
    },
    {
      name: <StyledHeader>Grand Amount</StyledHeader>,
      selector: (row) => row.grandTotal,
    },
    {
      name: <StyledHeader>Repair Date</StyledHeader>,
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: <StyledHeader>Return Date</StyledHeader>,
      selector: (row) => row.returnDate,
      sortable: true,
    },
    // ...(isAdmin || edit
    //   ? [
    //       {
    //         name: <StyledHeader>Action</StyledHeader>,
    //         selector: (row) => (
    //           <>
    //             <button
    //               onClick={() =>
    //                 navigate(`/admin/editRepair/${row.repairId}`, {
    //                   state: { repairData: row },
    //                 })
    //               }
    //               className="btn btn-warning"
    //             >
    //               <AiOutlineEdit />
    //             </button>
    //           </>
    //         ),
    //         sortable: true,
    //       },
    //     ]
    //   : []),
  ];
};

export default Columns;
