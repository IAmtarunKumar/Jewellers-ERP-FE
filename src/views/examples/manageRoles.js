import useAllEmpDetails from "common/customHooks/useAllEmpDetails";
import Header from "components/Headers/Header";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Card, CardHeader, Col, Container, Row } from "reactstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { toastify } from "common/helpers/toast";

const ManageRoles = () => {
  const [pending, setPending] = useState(true);
  const [resetPaginationToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const openModal = (role) => {
    setSelectedRole(role);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedRole(null);
    setModal(false);
  };

  const allEmpColumns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    // {
    //   name: "Phone",
    //   selector: (row) => row.mobile,
    // },
    {
      name: "Designation",
      selector: (row) => row.designation,
    },
    {
      name: "Abilities",
      selector: (row) => row.ability,
      // cell: (row) => (
      //   <select defaultValue={row.ability}>
      //     <option value="">SELECT</option>
      //     <option value="CEO_ABILITY">CEO ABILITY</option>
      //     <option value="HR_ABILITY">HR ABILITY</option>
      //     <option value="TL_ABILITY">TL ABILITY</option>
      //     <option value="EMP_ABILITY">EMP ABILITY</option>
      //   </select>
      // ),
    },
    {
      name: "ACTION",
      selector: (row) => row.action,
      cell: (row) => {
        return (
          <button
            className="btn btn-default px-4 py-2"
            onClick={() => openModal(row)}
          >
            Edit
          </button>
        );
      },
    },
  ];

  const { data, refetchData } = useAllEmpDetails(
    "https://jewellers-erp.onrender.com/users/fetch",

    pending,
    setPending
  );

  async function abilityModificationHandler(selectedRole) {
    // // console.log(selectedRole);
    const update = {
      ability: selectedRole.ability,
    };

    // // console.log(update);

    try {
      const response = await fetch(
        `https://jewellers-erp.onrender.com/abilityModification/${selectedRole.sessionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(update),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // // console.log(selectedRole);
    toastify({ msg: "Role Changed", type: "success" });
    setPending(true);
    refetchData();
  }
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Employee Info</h3>
                  </div>
                </Row>
              </CardHeader>

              <DataTable
                columns={allEmpColumns}
                data={data}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                progressPending={pending}
              />
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={closeModal}>
          <ModalHeader toggle={closeModal}>
            Edit Role for {selectedRole?.name}
          </ModalHeader>
          <ModalBody>
            <form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // marginBottom: "2rem",
                }}
              >
                <label htmlFor="assigned-to">Change Role:</label>

                <select
                  className="form-control"
                  name="employee"
                  id="employee"
                  onChange={(e) => {
                    setSelectedRole({
                      ...selectedRole,
                      ability: e.target.value,
                    });
                  }}
                >
                  <option value="">SELECT</option>
                  <option value="CEO_ABILITY">CEO ABILITY</option>
                  <option value="TL_ABILITY">TL ABILITY</option>
                  <option value="HR_ABILITY">HR ABILITY</option>
                  <option value="EMP_ABILITY">EMP ABILITY</option>
                </select>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                abilityModificationHandler(selectedRole);
                closeModal();
              }}
            >
              Save
            </Button>
            <Button color="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default ManageRoles;
