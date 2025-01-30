import styled from "styled-components";

export const designations = [
  {
    label: "CEO",
    value: "CEO",
  },
  {
    label: "Manager",
    value: "Manager",
  },
  {
    label: "Sales Person",
    value: "Sales Person",
  },
];

export const abilities = {
  CEO_ABILITY: [
    // { subject: "Dashboard", action: "manage" },
    { subject: "Dashboard", action: "manage" },
    // { subject: "User Profile", action: "manage" },
    { subject: "Employees", action: "manage" },
    { subject: "Monthly Logs", action: "manage" },
    { subject: "Attendance", action: "manage" },
    { subject: "Inventory", action: "manage" },
    { subject: "Bills", action: "manage" },
    { subject: "Purchase Bill", action: "manage" },
    { subject: "JobWork Sent", action: "manage" },
    { subject: "JobWork Received", action: "manage" },
    { subject: "Jewel Products", action: "manage" },
    { subject: "Hall Marks", action: "manage" },
    { subject: "Customers", action: "manage" },
    { subject: "Appraisals", action: "manage" },
    { subject: "Custom Order", action: "manage" },
    { subject: "Suppliers", action: "manage" },
    { subject: "Hall Mark Center", action: "manage" },
    { subject: "Sales", action: "manage" },
    { subject: "User", action: "manage" },
    { subject: "Vendor", action: "manage" },
    { subject: "Repair", action: "manage" },
    { subject: "Raw Material", action: "manage" },
    { subject: "Job Work", action: "manage" },
    { subject: "B2B", action: "manage" },
    { subject: "Upload", action: "manage" },
    // { subject: "Expense Management", action: "read" },
    // { subject: "Task Management", action: "manage" },
    // { subject: "Manage Roles", action: "manage" },
    // { subject: "Task Assigned To", action: "null" },
    // { subject: "Task Assigned By", action: "manage" },
    // { subject: "Employee Skills", action: "manage" },
    // { subject: "Meetings", action: "manage" },
    // { subject: "Upload Leads", action: "manage" },
    // { subject: "SalesLeads", action: "manage" },
    // { subject: "Accepted Clients", action: "manage" },
    // { subject: "Rejected Clients", action: "manage" },
    // { subject: "Real Time Data", action: "manage" },
    // { subject: "Marketing Data", action: "manage" },
    // { subject: "Overdue Tasks", action: "manage" },
  ],
  HR_ABILITY: [
    { subject: "Dashboard", action: "manage" },
    { subject: "User Profile", action: "manage" },
    { subject: "Expense Management", action: "manage" },
    { subject: "Task Management", action: "read" },
    { subject: "Manage Roles", action: "null" },
    { subject: "Task Assigned To", action: "manage" },
    { subject: "Task Assigned By", action: "read" },
    { subject: "Employee Skills", action: "manage" },
    { subject: "Meetings", action: "manage" },
    { subject: "SalesLeads", action: "null" },
    { subject: "Upload Leads", action: "null" },
    { subject: "Accepted Clients", action: "manage" },
    { subject: "Rejected Clients", action: "manage" },
    { subject: "Real Time Data", action: "read" },
    { subject: "Marketing Data", action: "null" },
    { subject: "Monthly Logs", action: "manage" },
    { subject: "Overdue Tasks", action: "null" },
    { subject: "Attendance", action: "manage" },
  ],

  TL_ABILITY: [
    { subject: "Dashboard", action: "manage" },
    { subject: "User Profile", action: "manage" },
    { subject: "Expense Management", action: "null" },
    { subject: "Task Management", action: "manage" },
    { subject: "Manage Roles", action: "null" },
    { subject: "Task Assigned To", action: "manage" },
    { subject: "Task Assigned By", action: "manage" },
    { subject: "Employee Skills", action: "manage" },
    { subject: "Meetings", action: "manage" },
    { subject: "SalesLeads", action: "null" },
    { subject: "Upload Leads", action: "null" },
    { subject: "Accepted Clients", action: "manage" },
    { subject: "Rejected Clients", action: "null" },
    { subject: "Real Time Data", action: "null" },
    { subject: "Marketing Data", action: "null" },
    { subject: "Monthly Logs", action: "manage" },
    { subject: "Overdue Tasks", action: "manage" },
    { subject: "Attendance", action: "manage" },
    { subject: "Jewel Products", action: "manage" },
    { subject: "Hall Marks", action: "manage" },
    { subject: "Customers", action: "manage" },
    { subject: "Appraisals", action: "manage" },
    { subject: "Custom Order", action: "manage" },
    { subject: "Suppliers", action: "manage" },
    { subject: "Jewel Dashboard", action: "manage" },
    { subject: "Hall Mark Center", action: "manage" },
    { subject: "Sales", action: "manage" },
    { subject: "User", action: "manage" },
    { subject: "Vendor", action: "manage" },
    { subject: "Repair", action: "manage" },
    { subject: "Raw Material", action: "manage" },
    { subject: "Job Work", action: "manage" },
  ],
  EMP_ABILITY: [
    { subject: "Dashboard", action: "manage" },
    { subject: "User Profile", action: "manage" },
    { subject: "Expense Management", action: "null" },
    { subject: "Task Management", action: "read" },
    { subject: "Manage Roles", action: "null" },
    { subject: "Task Assigned To", action: "manage" },
    { subject: "Task Assigned By", action: "null" },
    { subject: "Employee Skills", action: "manage" },
    { subject: "SalesLeads", action: "manage" },
    { subject: "Meetings", action: "manage" },
    { subject: "Upload Leads", action: "manage" },
    { subject: "Accepted Clients", action: "manage" },
    { subject: "Rejected Clients", action: "manage" },
    { subject: "Real Time Data", action: "null" },
    { subject: "Marketing Data", action: "null" },
    { subject: "Monthly Logs", action: "manage" },
    { subject: "Overdue Tasks", action: "null" },
    { subject: "Attendance", action: "null" },
  ],
  MKT_ABILITY: [
    { subject: "Dashboard", action: "manage" },
    { subject: "User Profile", action: "manage" },
    { subject: "Expense Management", action: "null" },
    { subject: "Task Management", action: "read" },
    { subject: "Manage Roles", action: "null" },
    { subject: "Task Assigned To", action: "manage" },
    { subject: "Task Assigned By", action: "null" },
    { subject: "Employee Skills", action: "manage" },
    { subject: "Meetings", action: "manage" },
    { subject: "SalesLeads", action: "read" },
    { subject: "Upload Leads", action: "manage" },
    { subject: "Accepted Clients", action: "null" },
    { subject: "Rejected Clients", action: "null" },
    { subject: "Real Time Data", action: "manage" },
    { subject: "Marketing Data", action: "manage" },
    { subject: "Monthly Logs", action: "manage" },
    { subject: "Overdue Tasks", action: "null" },
    { subject: "Attendance", action: "null" },
  ],
};

export function getColorByStrength(strength) {
  switch (strength) {
    case 0:
    case 1:
      return "text-danger";
    case 2:
      return "text-warning";
    case 3:
      return "text-info";
    case 4:
      return "text-success";
    default:
      return "";
  }
}

export function getTextByStrength(strength) {
  switch (strength) {
    case 0:
      return "weak";
    case 1:
      return "still weak";
    case 2:
      return "better";
    case 3:
      return "good";
    case 4:
      return "strong";
    default:
      return "";
  }
}

export const allEmpColumns = [
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Phone",
    selector: (row) => row.mobile,
  },
  {
    name: "Designation",
    selector: (row) => row.designation,
  },
];
export const StyledHeader = styled.div.attrs(props => ({
  className: props.className,
}))`
  font-size: 14px;
  font-weight: 700;
`;

export const teamMembers = [
  {
    id: 1,
    // image: Profile1,
    name: "Christopher Wood",
    statusKey: "online",
    // icon: faCalendarCheck,
    btnText: "Invite",
  },
  {
    id: 2,
    // image: Profile2,
    name: "Jose Leos",
    statusKey: "inMeeting",
    // icon: faComment,
    btnText: "Message",
  },
  {
    id: 3,
    // image: Profile3,
    name: "Bonnie Green",
    statusKey: "offline",
    // icon: faCalendarCheck,
    btnText: "Invite",
  },
  {
    id: 4,
    // image: Profile4,
    name: "Neil Sims",
    statusKey: "online",
    // icon: faComment,
    btnText: "Message",
  },
];

export const helpersLabel = [
  {
    sno: 1,
    label: "Create a Product",
  },
  {
    sno: 2,
    label: "Create a Customer",
  },
  {
    sno: 3,
    label: "Create a Raw Material",
  },
  {
    sno: 4,
    label: "Create a Purchase Order",
  },
  {
    sno: 5,
    label: "Create a Sales",
  },
];

export const helpersDesc = [
  {
    sno: 1,
    title: "Product Creation",
    desc: " With our state-of-the-art interface, you can effortlessly input new inventory items into your ERP system. This feature not only saves you time but ensures that each product detail is captured accurately. From product specifications to SKU numbers, our system will help you maintain a comprehensive inventory database.",
    button: "Create a new product",
    href: "/admin/allProducts",
  },
  {
    sno: 2,
    title: "Customer Management",
    desc: " Our platform prioritizes streamlined sales processes and clear communication. The customer management tool allows businesses to easily manage, organize, and update customer data. Whether you're segmenting your audience for targeted marketing campaigns or updating contact information, this feature will prove to be invaluable for maintaining long-lasting customer relationships.",
    button: "Create a new customer",
    href: "/admin/customers",
  },

  {
    sno: 3,
    title: "Raw Materials",
    desc: "Effective production planning is the bedrock of any manufacturing or production business. Our system provides a dedicated section to monitor essential raw materials and their respective suppliers. This ensures you always have real-time updates on stock levels, which aids in preventing production halts due to material shortages.",
    button: "Create a new Raw Material",
    href: "/admin/rawMaterial",
  },

  {
    sno: 4,
    title: "Purchase Orders",
    desc: "Say goodbye to manual and time-consuming purchase order creation. Our system enables users to generate purchase orders rapidly, ensuring a seamless supply chain process. This feature not only speeds up the ordering process but also enhances vendor communication, building trust and reliability with your suppliers.",
    button: "Create a new purchase order",
    href: "/admin/purchaseOrder",
  },

  {
    sno: 5,
    title: "Sales",
    desc: "Financial accuracy is crucial for the growth and sustainability of any business. Our invoicing feature ensures you can effortlessly create professional, detailed, and clear invoices for your clients. This not only maintains accurate financial records but also instills confidence in your clients about your business's professionalism and integrity.",
    button: "Create a new sales",
    href: "/admin/sales",
  },
];

export const customSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#f0f0f0"
      : state.isFocused
      ? "#e6e6e6"
      : "#fff",
    color: "#333",
    borderRadius: "7px",
    fontWeight: "bold",
  }),

  control: (provided) => ({
    ...provided,
    borderRadius: "20px",
    padding: "2px",
    boxShadow: "none",
    borderColor: "#ccc",
    "&:hover": {
      borderColor: "#aaa",
    },
  }),

  menu: (provided) => ({
    ...provided,
    padding: "0px 5px",
    borderRadius: "10px",
  }),
};

export const searchArray = [
  {
    id: 1,
    title: "Raw Material",
    url: "/admin/rawMaterial",
  },
  {
    id: 2,
    title: "Profile",
    url: "/admin/userProfile",
  },
  {
    id: 3,
    title: "Products",
    url: "/admin/allProducts",
  },
  {
    id: 4,
    title: "Monthly Logs",
    url: "/admin/monthlyLogs",
  },
  {
    id: 5,
    title: "Attendance",
    url: "/admin/attendance",
  },
  {
    id: 6,
    title: "Hall Mark Center",
    url: "/admin/hallmarkCenter",
  },
  {
    id: 7,
    title: "Hall Mark",
    url: "/admin/hallmarks",
  },
  {
    id: 10,
    title: "Customers",
    url: "/admin/customers",
  },
  {
    id: 11,
    title: "Sales",
    url: "/admin/sales",
  },
  {
    id: 12,
    title: "Repairs",
    url: "/admin/repairs",
  },
  {
    id: 14,
    title: "Appraisals",
    url: "/admin/appraisals",
  },
  {
    id: 15,
    title: "Job Work",
    url: "/admin/jobWork",
  },
  {
    id: 16,
    title: "Custom Orders",
    url: "/admin/customOrders",
  },
  {
    id: 17,
    title: "Suppliers",
    url: "/admin/suppliers",
  },
  {
    id: 18,
    title: "Vendor",
    url: "/admin/vendor",
  },
  {
    id: 19,
    title: "Purchase Bill",
    url: "/admin/purchaseBill",
  },
  {
    id: 20,
    title: "Job Work Sent",
    url: "/admin/jobworkSent",
  },
  {
    id: 21,
    title: "B2B",
    url: "/admin/b2b",
  },
  {
    id: 22,
    title: "Upload",
    url: "/admin/upload",
  },
  {
    id: 23,
    title: "Purchase Order",
    url: "/admin/allPurchaseOrder",
  },
];
