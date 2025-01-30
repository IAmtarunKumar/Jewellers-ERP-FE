import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import MonthlyLogs from "views/examples/MonthlyLogs";
import EmpAttendance from "views/examples/empAttendance";
import JewelDashboard from "views/jewellers/Pages/Dashboard/jewelDashboard";
import AllProducts from "views/jewellers/Pages/Products/allProducts";
import AllHallmarkCenter from "views/jewellers/Pages/HallmarkCenter/allHallmarkCenter";
import AllHallMarks from "views/jewellers/Pages/Hallmarks/allHallMarks";
import AllRawMaterial from "views/jewellers/Pages/RawMaterial/allRawMaterial";
import AllCustomers from "views/jewellers/Pages/Customer/allCustomers";
import AllSales from "views/jewellers/Pages/Sales/allSales";
import AllRepair from "views/jewellers/Pages/Repair/allRepair";
import AllAppraisals from "views/jewellers/Pages/Appraisals/allAppraisals";
import AllJobWork from "views/jewellers/Pages/JobWork/allJobWork";
import AllCustomOrder from "views/jewellers/Pages/Custom Orders/allCustomOrders";
import AllSuppliers from "views/jewellers/Pages/Suppliers/allSuppliers";
import AllVendor from "views/jewellers/Pages/Vendor/allVendor";
import PurchaseBill from "views/jewellers/Pages/Bills/purchaseBill";
import JobWorkSent from "views/jewellers/Pages/Bills/jobworkSent";
import AllB2B from "views/jewellers/Pages/B2B/allB2B";
import EditB2B from "views/jewellers/Pages/B2B/editB2B";
import EditCustomers from "views/jewellers/Pages/Customer/editCustomers";
import EditSuppliers from "views/jewellers/Pages/Suppliers/editSuppliers";
import EditHallmarkCenter from "views/jewellers/Pages/HallmarkCenter/editHallmarkCenter";
import EditProduct from "views/jewellers/Pages/Products/editProducts";
import EditRawMaterial from "views/jewellers/Pages/RawMaterial/editRawMaterial";
import EditCustomOrders from "views/jewellers/Pages/Custom Orders/editCustomOrders";
import EditVendor from "views/jewellers/Pages/Vendor/editVendor";
import EditJobWork from "views/jewellers/Pages/JobWork/editJobWork";
import EditRepair from "views/jewellers/Pages/Repair/editRepair";
import Upload from "views/jewellers/Pages/Upload/upload";
import UserProfile from "views/jewellers/Profile/userProfile";
import jwtDecode from "jwt-decode";
import AllEmp from "views/jewellers/Pages/Employee/allEmp";
import ChartAccount from "views/jewellers/Pages/ChartAccount/chartAccount";
import ViewCashInHand from "views/jewellers/Pages/ChartAccount/viewTables/assets/viewCashInHand/viewCashInHand";
import ViewBank from "views/jewellers/Pages/ChartAccount/viewTables/assets/viewBank/viewBank";
import ViewProperties from "views/jewellers/Pages/ChartAccount/viewTables/assets/viewProperties.js/viewProperties";
import ViewPlant from "views/jewellers/Pages/ChartAccount/viewTables/assets/viewPlant/viewPlant";
import ViewDutyAndTaxes from "views/jewellers/Pages/ChartAccount/viewTables/liabilities/dutyAndTaxes/viewDutyAndTaxes";
import ViewLoans from "views/jewellers/Pages/ChartAccount/viewTables/liabilities/loans/viewLoans";
import ViewCreditors from "views/jewellers/Pages/ChartAccount/viewTables/liabilities/creditors/viewCreditors";
import ViewRepairs from "views/jewellers/Pages/ChartAccount/viewTables/income/repairs/viewRepairs";
import ViewSales from "views/jewellers/Pages/ChartAccount/viewTables/income/sales/viewSales";
import ViewJobWork from "views/jewellers/Pages/ChartAccount/viewTables/expenses/jobWork/viewJobWork";
import ViewRawMaterial from "views/jewellers/Pages/ChartAccount/viewTables/expenses/rawMaterial/viewRawMaterial";
import Invoice from "components/common/invoice/invoice";
import AllPurchaseOrder from "views/jewellers/Pages/PusrchaseOrder/allPurchaseOrder";
import PurchaseOrder from "views/jewellers/Pages/PusrchaseOrder/purchaseOrder";
import RepairInvoice from "views/jewellers/Pages/Repair/invoice/repairInvoice";


let user;
if (localStorage.getItem("userDetail")) {
  user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
}
const isAdmin = user?.privileges[0] ? true : user?.privileges[4] ? true : false;

var routes = [
  {
    path: "/jewelDashboard",
    name: "Dashboard",
    icon: "ni ni-collection ",
    component: <JewelDashboard />,
    layout: "/admin",
    display: true,
  },
  isAdmin && {
    path: "/employees",
    name: "Employees",
    icon: "ni ni-circle-08",
    component: <AllEmp />,
    layout: "/admin",
    display: true,
  },
  isAdmin && {
    path: "/account",
    name: "Account",
    icon: "ni ni-ruler-pencil",
    component: <ChartAccount />,
    layout: "/admin",
    display: true,
  },
  {
    path: "/userprofile",
    name: "Profile",
    icon: "ni ni-single-02 ",
    component: <UserProfile />,
    display: true,
    layout: "/admin",
  },

  {
    path: "/monthlyLogs",
    name: "Monthly Logs",
    icon: "ni ni-badge text-black ",
    component: <MonthlyLogs />,
    display: true,
    layout: "/admin",
  },

  {
    path: "/attendance",
    name: "Attendance",
    icon: " ni ni-chart-bar-32",
    component: <EmpAttendance />,
    layout: "/admin",
    display: true,
  },
  {
    path: "/invoice",
    name: "Invoice",
    icon: " ni ni-book-bookmark",
    component: <Invoice />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/allPurchaseOrder",
    name: "Purchase Order",
    icon: " ni ni-book-bookmark",
    component: <AllPurchaseOrder />,
    layout: "/admin",
    display: true,
  },
  {
    path: "/purchaseOrder",
    name: "Purchase Order",
    icon: " ni ni-book-bookmark",
    component: <PurchaseOrder />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/repairInvoice",
    name: "Repair Invoice",
    icon: " ni ni-book-bookmark",
    component: <RepairInvoice />,
    layout: "/admin",
    display: false,
  },

  {
    name: "Inventory",
    icon: "ni ni-bag-17  ",
    component: <AllProducts />,
    layout: "/admin",
    display: true,
    children: [
      {
        path: "/allProducts",
        name: "Jewel Products",
        icon: "ni ni-bag-17  ",
        component: <AllProducts />,
        layout: "/admin",
        display: true,
      },

      {
        path: "/hallmarkCenter",
        name: "Hall Mark Center",
        icon: "ni ni-building ",
        component: <AllHallmarkCenter />,
        layout: "/admin",
        display: true,
      },
      {
        path: "/hallmarks",
        name: "Hall Marks",
        icon: "ni ni-briefcase-24 ",
        component: <AllHallMarks />,
        layout: "/admin",
        display: true,
      },

      {
        path: "/rawMaterial",
        name: "Raw Material",
        icon: "ni ni-basket ",
        component: <AllRawMaterial />,
        layout: "/admin",
        display: true,
      },
    ],
  },
  {
    name: "Customers",
    icon: "ni ni-single-02 text-brown ",
    component: <AllCustomers />,
    layout: "/admin",
    display: true,
    children: [
      {
        path: "/customers",
        name: "Customers",
        icon: "ni ni-circle-08 ",
        component: <AllCustomers />,
        layout: "/admin",
        display: true,
      },
    ],
  },
  {
    name: "Sales",
    icon: "ni ni-credit-card ",
    component: <AllSales />,
    layout: "/admin",
    display: true,
    children: [
      {
        path: "/sales",
        name: "Sales",
        icon: "ni ni-credit-card ",
        component: <AllSales />,
        layout: "/admin",
        display: true,
      },
      {
        path: "/repair",
        name: "Repair",
        icon: "ni ni-settings ",
        component: <AllRepair />,
        layout: "/admin",
        display: true,
      },
      {
        path: "/appraisals",
        name: "Appraisals",
        icon: "ni ni-like-2 ",
        component: <AllAppraisals />,
        layout: "/admin",
        display: true,
      },
      {
        path: "/jobWork",
        name: "Job Work",
        icon: "ni ni-ui-04 ",
        component: <AllJobWork />,
        layout: "/admin",
        display: true,
      },
      {
        path: "/customOrders",
        name: "Custom Order",
        icon: "ni ni-planet ",
        component: <AllCustomOrder />,
        layout: "/admin",
        display: true,
      },
    ],
  },
  {
    name: "Suppliers",
    icon: "ni ni-diamond text-brown ",
    component: <AllSuppliers />,
    layout: "/admin",
    display: true,
    children: [
      {
        path: "/suppliers",
        name: "Suppliers",
        icon: "ni ni-delivery-fast ",
        component: <AllSuppliers />,
        layout: "/admin",
        display: true,
      },

      {
        path: "/vendor",
        name: "Vendor",
        icon: "ni ni-map-big ",
        component: <AllVendor />,
        layout: "/admin",
        display: true,
      },
    ],
  },
  // {
  //   name: "Bills",
  //   icon: "ni ni-single-copy-04 ",
  //   component: <PurchaseBill />,
  //   layout: "/admin",
  //   display: true,
  //   children: [
  //     {
  //       path: "/purchaseBill",
  //       name: "Purchase Bill",
  //       icon: "ni ni-delivery-fast ",
  //       component: <PurchaseBill />,
  //       layout: "/admin",
  //       display: true,
  //     },
  //     {
  //       path: "/jobworkSent",
  //       name: "JobWork Sent",
  //       icon: "ni ni-map-big ",
  //       component: <JobWorkSent />,
  //       layout: "/admin",
  //       display: true,
  //     },
  //   ],
  // },
  {
    path: "/b2b",
    name: "B2B",
    icon: "ni ni-archive-2 ",
    component: <AllB2B />,
    layout: "/admin",
    display: true,
  },
  {
    path: "/upload",
    name: "Upload",
    icon: "ni ni-fat-add ",
    component: <Upload />,
    layout: "/admin",
    display: true,
  },
  {
    path: "/editB2B/:Id",
    name: "Edit B2B",
    icon: "ni ni-collection ",
    component: <EditB2B />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/editCustomer/:Id",
    name: "Edit Hallmark",
    icon: "ni ni-collection text-pink ",
    component: <EditCustomers />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/editSuppliers/:Id",
    name: "Edit Suppliers",
    icon: "ni ni-collection text-pink ",
    component: <EditSuppliers />,
    display: false,
    layout: "/admin",
  },
  {
    path: "/editHallMarkCenter/:Id",
    name: "Edit Hallmark",
    icon: "ni ni-collection text-pink ",
    component: <EditHallmarkCenter />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/editProducts/:Id",
    name: "Edit Products",
    icon: "ni ni-collection text-pink ",
    component: <EditProduct />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/editRawMaterial/:Id",
    name: "Edit Raw Material",
    icon: "ni ni-collection text-pink ",
    component: <EditRawMaterial />,
    layout: "/admin",
    display: false,
  },

  {
    path: "/editCustomOrder/:Id",
    name: "Edit Custom Order",
    icon: "ni ni-collection text-pink ",
    component: <EditCustomOrders />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/editVendor/:Id",
    name: "Edit Vendor",
    icon: "ni ni-collection text-pink ",
    component: <EditVendor />,
    layout: "/admin",
    display: false,
  },

  {
    path: "/editJobWork/:Id",
    name: "Edit Job Work",
    icon: "ni ni-collection text-pink ",
    component: <EditJobWork />,
    layout: "/admin",
    display: false,
  },

  {
    path: "/editRepair/:Id",
    name: "Edit Repair",
    icon: "ni ni-collection text-pink ",
    component: <EditRepair />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/cash",
    name: "Cash",
    icon: "ni ni-collection text-pink ",
    component: <ViewCashInHand />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/bank",
    name: "Bank",
    icon: "ni ni-collection text-pink ",
    component: <ViewBank />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/properties",
    name: "Properties",
    icon: "ni ni-collection text-pink ",
    component: <ViewProperties />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/plantandmachineries",
    name: "Plant",
    icon: "ni ni-collection text-pink ",
    component: <ViewPlant />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/dutyandtaxes",
    name: "Duty And Taxes",
    icon: "ni ni-collection text-pink ",
    component: <ViewDutyAndTaxes />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/creditors",
    name: "Creditors",
    icon: "ni ni-collection text-pink ",
    component: <ViewCreditors />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/loans",
    name: "Loans",
    icon: "ni ni-collection text-pink ",
    component: <ViewLoans />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/sale",
    name: "Sale",
    icon: "ni ni-collection text-pink ",
    component: <ViewSales />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/repairs",
    name: "Repair",
    icon: "ni ni-collection text-pink ",
    component: <ViewRepairs />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/rawmaterials",
    name: "Raw material",
    icon: "ni ni-collection text-pink ",
    component: <ViewRawMaterial />,
    layout: "/admin",
    display: false,
  },
  {
    path: "/jobworks",
    name: "Job work",
    icon: "ni ni-collection text-pink ",
    component: <ViewJobWork />,
    layout: "/admin",
    display: false,
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
    display: false,
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
    display: false,
  },
];
export default routes;
