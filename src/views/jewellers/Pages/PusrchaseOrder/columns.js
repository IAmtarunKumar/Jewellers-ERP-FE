import { StyledHeader } from "common/constant/constant";
import React, { useState } from "react";
import "./purchaseOrder.css";

const Columns = (updateData, deleteData) => {
  const [editingId, setEditingId] = useState(null);
  const purityOptions = [
    { value: "24k", label: "24k" },
    { value: "22k", label: "22k" },
    { value: "18k", label: "18k" },
    { value: "14k", label: "14k" },
    { value: "10k", label: "10k" },
  ];

  const EditableCell = ({ row, column, updateData, options }) => {
    const isEditing = editingId === row.name;
    const handleBlur = (e) => {
      // Check if the column is 'quantity' and the value is 0 or empty string
      if (
        (column.selector === "quantity" ||
          column.selector === "rate" ||
          column.selector === "weight") &&
        (!e.target.value || e.target.value === "0")
      ) {
        alert(`${column.selector} cannot be 0.`); // Alert the user
        return; // Exit and don't update the data
      }

      updateData(row.name, column.selector, e.target.value);
      setEditingId(null); // Stop editing when focus is out
    };

    if (options && isEditing) {
      return (
        <select
          defaultValue={row[column.selector]}
          className="form-control"
          onBlur={(e) => {
            updateData(row.name, column.selector, e.target.value);
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

    return isEditing ? (
      <input
        type="text"
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
          setEditingId((prev) => (prev === row.name ? null : row.name))
        }
      >
        {editingId === row.name ? (
          <i className="fa fa-bookmark" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-pencil" aria-hidden="true"></i>
        )}
      </button>
      <button
        className="btn btn-danger px-2 py-1"
        onClick={() => deleteData(row.name)}
      >
        <i className="fa fa-trash"></i>
      </button>
    </>
  );

  return [
    {
      name: <StyledHeader>Items</StyledHeader>,
      selector: (row) => row.name,
    },
    {
      name: <StyledHeader>Rate</StyledHeader>,
      cell: (row) => (
        <EditableCell
          row={row}
          column={{ selector: "rate" }}
          updateData={updateData}
        />
      ),
      sortable: true,
    },
    {
      name: <StyledHeader>Purity</StyledHeader>,
      cell: (row) => (
        <EditableCell
          row={row}
          column={{ selector: "purity" }}
          updateData={updateData}
          options={purityOptions}
        />
      ),
      sortable: true,
    },
    {
      name: <StyledHeader>Weight</StyledHeader>,
      cell: (row) => (
        <EditableCell
          row={row}
          column={{ selector: "weight" }}
          updateData={updateData}
        />
      ),

      sortable: true,
    },

    {
      name: <StyledHeader>Base Amount</StyledHeader>,
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: <StyledHeader>Quantity</StyledHeader>,
      cell: (row) => (
        <EditableCell
          row={row}
          column={{ selector: "quantity" }}
          updateData={updateData}
        />
      ),

      sortable: true,
    },
    {
      name: <StyledHeader>Final Amount</StyledHeader>,
      selector: (row) => row.finalAmount,
      sortable: true,
    },
    {
      name: <StyledHeader>Action</StyledHeader>,
      cell: (row) => <ActionButton row={row} deleteData={deleteData} />,
    },
  ];
};

export default Columns;
