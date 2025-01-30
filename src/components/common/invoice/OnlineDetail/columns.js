import { StyledHeader } from "common/constant/constant";
import React, { useState } from "react";

const Columns = (updateData, deleteData) => {
  const [editingId, setEditingId] = useState(null);
  const selectOptionsVIA = [
    { value: "neft", label: "NEFT" },
    { value: "rtgs", label: "RTGS" },
    { value: "imps", label: "IMPS" },
    { value: "upi", label: "UPI" },
  ];
  const EditableCell = ({ row, column, updateData, options }) => {
    const isEditing = editingId === row.id;
    const handleBlur = (e) => {
      if (
        (column.selector === "date" ||
          column.selector === "accountNo" ||
          column.selector === "via" ||
          column.selector === "amount") &&
        (!e.target.value || e.target.value === "0" || e.target.value === "")
      ) {
        alert(`${column.selector} cannot be 0 or empty.`);
        return;
      }

      updateData(row.id, column.selector, e.target.value);
      setEditingId(null);
    };

    if (options && isEditing) {
      return (
        <select
          defaultValue={row[column.selector]}
          className="form-control"
          onBlur={(e) => {
            updateData(row.id, column.selector, e.target.value);
            setEditingId(null);
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    const inputType = column.selector === "date" ? "date" : "text";
    return isEditing ? (
      <input
        type={inputType}
        className="form-control"
        defaultValue={row[column.selector]}
        onBlur={handleBlur}
      />
    ) : (
      <span>{row[column.selector]}</span>
    );
  };
  const ActionButton = ({ row, deleteData }) => (
    <>
      <button
        className="btn btn-primary px-2 py-1 mr-2"
        onClick={() =>
          setEditingId((prev) => (prev === row.id ? null : row.id))
        }
      >
        {editingId === row.id ? (
          <i className="fa fa-bookmark" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-pencil" aria-hidden="true"></i>
        )}
      </button>
      <button
        className="btn btn-danger px-2 py-1"
        onClick={() => deleteData(row.id)}
      >
        <i className="fa fa-trash"></i>
      </button>
    </>
  );

  return [
    {
      name: <StyledHeader>Transaction Number</StyledHeader>,
      cell: (row) => row.tranId,
    },
    {
      name: <StyledHeader>Amount</StyledHeader>,
      cell: (row) => (
        <EditableCell
          row={row}
          column={{ selector: "amount" }}
          updateData={updateData}
        />
      ),
    },
    {
      name: <StyledHeader>Via</StyledHeader>,
      cell: (row) => (
        <EditableCell
          row={row}
          column={{ selector: "via" }}
          updateData={updateData}
          options={selectOptionsVIA}
        />
      ),
      sortable: true,
    },
    {
      name: <StyledHeader>Date</StyledHeader>,
      cell: (row) => (
        <EditableCell
          row={row}
          column={{ selector: "date" }}
          updateData={updateData}
        />
      ),
      sortable: true,
    },
    {
      name: <StyledHeader>Account Number</StyledHeader>,
      cell: (row) => (
        <EditableCell
          row={row}
          column={{ selector: "accountNo" }}
          updateData={updateData}
        />
      ),
      sortable: true,
    },
    {
      name: <StyledHeader>Action</StyledHeader>,
      cell: (row) => <ActionButton row={row} deleteData={deleteData} />,
    },
  ];
};

export default Columns;
