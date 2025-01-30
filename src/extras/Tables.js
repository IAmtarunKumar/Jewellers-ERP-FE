// // reactstrap components
// import {
//   Badge,
//   Card,
//   CardHeader,
//   CardFooter,
//   DropdownMenu,
//   DropdownItem,
//   UncontrolledDropdown,
//   DropdownToggle,
//   Media,
//   Pagination,
//   PaginationItem,
//   PaginationLink,
//   Progress,
//   Table,
//   Container,
//   Row,
//   UncontrolledTooltip,
// } from "reactstrap";
// // core components
// import Header from "components/Headers/Header.js";
// import useAllEmpDetails from "common/customHooks/useAllEmpDetails";
// const Tables = () => {
//   const [data] = useAllEmpDetails("https://jewellers-erp.onrender.com/users/fetch");

//   const acceptExpense = async (expenseId, userId) => {
//     const update = { approvalStatus: "Approved" };

//     const response = await fetch(
//       `https://jewellers-erp.onrender.com/users/${userId}/expenses/${expenseId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(update),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//   };
//   const rejectExpense = async (expenseId, userId) => {
//     const update = { approvalStatus: "Rejected" };

//     const response = await fetch(
//       `https://jewellers-erp.onrender.com/users/${userId}/expenses/${expenseId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(update),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//   };

//   return (
//     <>
//       <Header />
//       {/* Page content */}
//       <Container className="mt--7" fluid>
//         {/* Table */}
//         <Row>
//           <div className="col">
//             <Card className="shadow">
//               <CardHeader className="border-0">
//                 <h3 className="mb-0">Task Management</h3>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">Name</th>
//                     <th scope="col">phone</th>
//                     <th scope="col">Email</th>
//                     <th scope="col">Task Assigned To</th>
//                     <th scope="col">Task Assigned By</th>
//                     <th scope="col" />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data &&
//                     data.map((curEmp) => {
//                       // // console.log(curEmp);
//                       return (
//                         <tr key={curEmp._id}>
//                           <th scope="row">{curEmp.name}</th>
//                           <td>{curEmp.mobile}</td>
//                           <td>{curEmp.email}</td>
//                           <td>{curEmp.assignedToYou}</td>
//                           <td>{curEmp.assignedByYou}</td>
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </Table>
//               <CardFooter className="py-4">
//                 <nav aria-label="...">
//                   <Pagination
//                     className="pagination justify-content-end mb-0"
//                     listClassName="justify-content-end mb-0"
//                   >
//                     <PaginationItem className="disabled">
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                         tabIndex="-1"
//                       >
//                         <i className="fas fa-angle-left" />
//                         <span className="sr-only">Previous</span>
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem className="active">
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         1
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         2 <span className="sr-only">(current)</span>
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         3
//                       </PaginationLink>
//                     </PaginationItem>
//                     <PaginationItem>
//                       <PaginationLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         <i className="fas fa-angle-right" />
//                         <span className="sr-only">Next</span>
//                       </PaginationLink>
//                     </PaginationItem>
//                   </Pagination>
//                 </nav>
//               </CardFooter>
//             </Card>
//           </div>
//         </Row>
//         {/* Dark table */}
//         <Row className="mt-5">
//           <div className="col">
//             <Card className="bg-default shadow">
//               <CardHeader className="bg-transparent border-0">
//                 <h3 className="text-white mb-0">Expense Management</h3>
//               </CardHeader>
//               <Table
//                 className="align-items-center table-dark table-flush"
//                 responsive
//               >
//                 <thead className="thead-dark">
//                   <tr>
//                     <th scope="col">Name</th>
//                     <th scope="col">Amount</th>
//                     <th scope="col">Description</th>
//                     <th scope="col">Status</th>
//                     <th scope="col">Action</th>
//                     <th scope="col" />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data &&
//                     data
//                       .filter(
//                         (curEmp) =>
//                           curEmp.expenses && curEmp.expenses.length > 0
//                       )
//                       .map((curEmp) => {
//                         // console.log(curEmp);
//                         return curEmp.expenses.map((expense, index) => (
//                           <tr key={`${curEmp._id}-${index}`}>
//                             <td>{curEmp.name}</td>
//                             <td>{expense.amount}</td>
//                             <td>{expense.description}</td>
//                             <td>{expense.approvalStatus}</td>
//                             {expense.approvalStatus === "Pending" ? (
//                               <>
//                                 <td
//                                   onClick={() =>
//                                     acceptExpense(
//                                       expense.expenseId,
//                                       curEmp.sessionId
//                                     )
//                                   }
//                                 >
//                                   Accept
//                                 </td>
//                                 <td
//                                   onClick={() =>
//                                     rejectExpense(
//                                       expense.expenseId,
//                                       curEmp.sessionId
//                                     )
//                                   }
//                                 >
//                                   Reject
//                                 </td>
//                               </>
//                             ) : (
//                               <td>Settled</td>
//                             )}
//                           </tr>
//                         ));
//                       })}

//                   {/* </tr>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <a
//                           className="avatar rounded-circle mr-3"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             src={require("../../assets/img/theme/angular.jpg")}
//                           />
//                         </a>
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             Angular Now UI Kit PRO
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>$1,800 USD</td>
//                     <td>
//                       <Badge color="" className="badge-dot">
//                         <i className="bg-success" />
//                         completed
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip188614932"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip188614932"
//                         >
//                           Ryan Tompson
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip66535734"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-2-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip delay={0} target="tooltip66535734">
//                           Romina Hadid
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip427561578"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-3-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip427561578"
//                         >
//                           Alexander Smith
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip904098289"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip904098289"
//                         >
//                           Jessica Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">100%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="100"
//                             barClassName="bg-success"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only text-light"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-ellipsis-v" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Another action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Something else here
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <a
//                           className="avatar rounded-circle mr-3"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             src={require("../../assets/img/theme/sketch.jpg")}
//                           />
//                         </a>
//                         <Media>
//                           <span className="mb-0 text-sm">Black Dashboard</span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>$3,150 USD</td>
//                     <td>
//                       <Badge color="" className="badge-dot mr-4">
//                         <i className="bg-danger" />
//                         delayed
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip707904950"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip707904950"
//                         >
//                           Ryan Tompson
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip353988222"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-2-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip353988222"
//                         >
//                           Romina Hadid
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip467171202"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-3-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip467171202"
//                         >
//                           Alexander Smith
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip362118155"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip362118155"
//                         >
//                           Jessica Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">72%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="72"
//                             barClassName="bg-danger"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only text-light"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-ellipsis-v" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Another action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Something else here
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <a
//                           className="avatar rounded-circle mr-3"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             src={require("../../assets/img/theme/react.jpg")}
//                           />
//                         </a>
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             React Material Dashboard
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>$4,400 USD</td>
//                     <td>
//                       <Badge color="" className="badge-dot">
//                         <i className="bg-info" />
//                         on schedule
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip226319315"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip226319315"
//                         >
//                           Ryan Tompson
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip711961370"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-2-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip711961370"
//                         >
//                           Romina Hadid
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip216246707"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-3-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip216246707"
//                         >
//                           Alexander Smith
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip638048561"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip638048561"
//                         >
//                           Jessica Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">90%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="90"
//                             barClassName="bg-info"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only text-light"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-ellipsis-v" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Another action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Something else here
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">
//                       <Media className="align-items-center">
//                         <a
//                           className="avatar rounded-circle mr-3"
//                           href="#pablo"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             src={require("../../assets/img/theme/vue.jpg")}
//                           />
//                         </a>
//                         <Media>
//                           <span className="mb-0 text-sm">
//                             Vue Paper UI Kit PRO
//                           </span>
//                         </Media>
//                       </Media>
//                     </th>
//                     <td>$2,200 USD</td>
//                     <td>
//                       <Badge color="" className="badge-dot mr-4">
//                         <i className="bg-success" />
//                         completed
//                       </Badge>
//                     </td>
//                     <td>
//                       <div className="avatar-group">
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip781594051"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-1-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip781594051"
//                         >
//                           Ryan Tompson
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip840372212"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-2-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip840372212"
//                         >
//                           Romina Hadid
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip497647175"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-3-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip497647175"
//                         >
//                           Alexander Smith
//                         </UncontrolledTooltip>
//                         <a
//                           className="avatar avatar-sm"
//                           href="#pablo"
//                           id="tooltip951447946"
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <img
//                             alt="..."
//                             className="rounded-circle"
//                             src={require("../../assets/img/theme/team-4-800x800.jpg")}
//                           />
//                         </a>
//                         <UncontrolledTooltip
//                           delay={0}
//                           target="tooltip951447946"
//                         >
//                           Jessica Doe
//                         </UncontrolledTooltip>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">100%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="100"
//                             barClassName="bg-danger"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="text-right">
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           className="btn-icon-only text-light"
//                           href="#pablo"
//                           role="button"
//                           size="sm"
//                           color=""
//                           onClick={(e) => e.preventDefault()}
//                         >
//                           <i className="fas fa-ellipsis-v" />
//                         </DropdownToggle>
//                         <DropdownMenu className="dropdown-menu-arrow" right>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Another action
//                           </DropdownItem>
//                           <DropdownItem
//                             href="#pablo"
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             Something else here
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </td>
//                   </tr> */}
//                 </tbody>
//               </Table>
//             </Card>
//           </div>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Tables;
