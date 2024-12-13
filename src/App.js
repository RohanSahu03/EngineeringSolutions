import logo from "./logo.svg";
import "./App.css";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Service from "./components/Service";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import NavBar from "./components/Navbar";
import QuoteSummary from "./components/Dashboard/sales/QuoteSummary";

import Customer from "./components/Dashboard/sales/Customer";
import Quotes from "./components/Dashboard/sales/Quotes";
import SalesOrder from "./components/Dashboard/sales/SalesOrder";
import DeliveryChallan from "./components/Dashboard/sales/DeliveryChallan";
import Invoices from "./components/Dashboard/sales/Invoices";
import PaymentReceived from "./components/Dashboard/sales/PaymentReceived";
import Vendors from "./components/Dashboard/puchases/Vendors";
import Expenses from "./components/Dashboard/puchases/Expenses";
import PurchaseOrders from "./components/Dashboard/puchases/PurchaseOrders";
import Bill from "./components/Dashboard/puchases/Bill";
import PaymentsMade from "./components/Dashboard/puchases/PaymentsMade";
import Project from "./components/Dashboard/TimeTracking/Project";
import Reports from "./components/Dashboard/reports/Reports";
import Budget from "./components/Dashboard/accountant/Budget";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SalesOrderSummary from "./components/Dashboard/sales/SalesOrderSummary";
import ConvertToInvoice from "./components/Dashboard/sales/ConvertToInvoice";
import InvoiceSummary from "./components/Dashboard/sales/InvoiceSummary";
import DashboardHome from "./components/Dashboard/DashboardHome";
import DeliveryChallanSumary from "./components/Dashboard/sales/DeliveryChallanSummary";
import PurchaseOrderSummary from "./components/Dashboard/puchases/PurchaseOrderSummary";
import DcToInvoice from "./components/Dashboard/sales/DcToInvoice";
import QuoteToInvoice from "./components/Dashboard/sales/QuoteToInvoice";

import PaymentsMadeSummary from "./components/Dashboard/puchases/PaymentsMadeSummary";
import UpdateInvoice from "./components/Dashboard/sales/UpdateInvoice";
import UpdatePaymentMade from "./components/Dashboard/puchases/UpdatePaymentMade";
import CreditNotes from "./components/Dashboard/sales/CreditNotes";
import CreditNoteSummary from "./components/Dashboard/sales/CreditNoteSummary";
import VendorCredit from "./components/Dashboard/puchases/VendorCredit";
import VendorCreditSummary from "./components/Dashboard/puchases/VendorCreditSummary";
import UpdateVendorCredit from "./components/Dashboard/puchases/UpdateVendorCredit";
import BillSummary from "./components/Dashboard/puchases/BillSummary";

import UpdateQuotes from "./components/Dashboard/sales/UpdateQuotes";

import CreateInvoice from "./components/Dashboard/sales/CreateInvoice";
import UpdateSalesOrder from "./components/Dashboard/sales/UpdateSalesOrder";
import UpdateDeliveryChallan from "./components/Dashboard/sales/UpdateDeliveryChallan";
import PaymentReceivedSummary from "./components/Dashboard/sales/PaymentReceivedSummary";
import UpdatePayment from "./components/Dashboard/sales/UpdatePayment";
import ViewVendor from "./components/Dashboard/puchases/ViewVendor";
import UpdatePurchaseOrder from "./components/Dashboard/puchases/UpdatePurchaseOrder";
import UpdateBill from "./components/Dashboard/puchases/UpdateBill";
import Items from "./components/Dashboard/items/Items";
import ViewItem from "./components/Dashboard/items/ViewItem";
import Inventory from "./components/Dashboard/items/Inventory";
import InventoryAdjustment from "./components/Dashboard/items/InventoryAdjustment";
import ViewInventoryAdjustment from "./components/Dashboard/items/ViewInventoryAdjustment";
import UpdateAdjustment from "./components/Dashboard/items/UpdateAdjustment";
import ViewInventory from "./components/Dashboard/items/ViewInventory";
import Subadmin from "./components/Dashboard/Subadmin";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { PageTransition } from "@steveeeie/react-page-transition";
import Indent from "./components/Dashboard/puchases/Indent";
import PurchaseItem from "./components/Dashboard/items/PurchaseItem";
import SalesItem from "./components/Dashboard/items/SalesItem";
import ViewPurchaseItem from "./components/Dashboard/items/ViewPurchaseItems";
import ViewSalesItem from "./components/Dashboard/items/ViewSalesItem";
import UpdateIndent from "./components/Dashboard/puchases/UpdateIndent";
import ViewIndent from "./components/Dashboard/puchases/ViewIndent";
import RequestQuote from "./components/Dashboard/puchases/RequestQuote";
import ViewRFQ from "./components/Dashboard/puchases/ViewRFQ";
import Quotations from "./components/Dashboard/puchases/Quotations";
import ViewPurchaseQuotation from "./components/Dashboard/puchases/ViewPurchaseQuote";
import UpdatePurchaseQuote from "./components/Dashboard/puchases/UpdatePurchaseQuote";
import ServiceItem from "./components/Dashboard/items/ServiceItem";
import ViewServiceItem from "./components/Dashboard/items/ViewServiceItem";
import Inspection from "./components/Dashboard/Inventory/Inspection";
import Grn from "./components/Dashboard/Inventory/Grn";
import ViewInspection from "./components/Dashboard/Inventory/ViewInspection";
import ViewGrn from "./components/Dashboard/Inventory/ViewGrn";
import Gin from "./components/Dashboard/Inventory/Gin";
import CashGoodRecNote from "./components/Dashboard/Inventory/CashGoodRecNote";
import ViewGin from "./components/Dashboard/Inventory/ViewGin";
import ViewGriForCash from "./components/Dashboard/Inventory/ViewGriForCash";
import DespatchChallan from "./components/Dashboard/Inventory/DespatchChallan";
import ViewDespatchChallan from "./components/Dashboard/Inventory/ViewDespatchChallan";
import Stock from "./components/Dashboard/Inventory/Stock";
import StockSummary from "./components/Dashboard/Inventory/StockSummary";
import FundTransfer from "./components/Dashboard/accountant/FundTransfer";
import CashInvoice from "./components/Dashboard/accountant/CashInvoice";
import CashInvoiceSummary from "./components/Dashboard/accountant/CashInvoiceSummary";

function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/aboutus"
            element={
              <>
                <NavBar />
                <About />
                <Footer />
              </>
            }
          />
          <Route
            path="/service"
            element={
              <>
                <NavBar />
                <Service />
                <Footer />
              </>
            }
          />
          <Route
            path="/contactus"
            element={
              <>
                <NavBar />
                <Contact />
                <Footer />
              </>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
          <Route
            path="/dashboard/profile"
            element={<Dashboard children={<Profile />} />}
          />

          <Route
            path="/dashboard/home"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <DashboardHome />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/items"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Items />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchaseitem"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <PurchaseItem />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/items/viewPurchaseItem"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewPurchaseItem />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/items/viewSalesItem"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewSalesItem />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/salesitem"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <SalesItem />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/serviceitem"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ServiceItem />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/items/viewServiceItem"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewServiceItem />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/subadmin"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Subadmin />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/items/viewItem"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewItem />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/inventory"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Inventory />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/inventoryadjustment"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <InventoryAdjustment />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/inventory/viewInventoryAdjustments"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewInventoryAdjustment />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/inventory/editInventoryAdjustments"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <UpdateAdjustment />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/inventory/viewInventory"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewInventory />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/customer"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Customer />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/quotes"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Quotes />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/quotes/edit"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <UpdateQuotes />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/quotes/summary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <QuoteSummary />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/salesorder"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <SalesOrder />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/salesorder/summary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <SalesOrderSummary />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/salesorder/editsalesorder"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <UpdateSalesOrder />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/deliverychallan"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <DeliveryChallan />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/deliverychallan/editdeliverychallan"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <UpdateDeliveryChallan />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/invoice"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Invoices />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/updateInvoice"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <UpdateInvoice />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/createinvoice"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <CreateInvoice />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/payment-received"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <PaymentReceived />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/paymentreceived/summary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <PaymentReceivedSummary />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/paymentreceived/editpayment"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <UpdatePayment />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/vendors"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Vendors />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/vendors/view"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewVendor />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/expense"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Expenses />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/purchaseorder"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <PurchaseOrders />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/indent"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Indent />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/edit"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <UpdatePurchaseOrder />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/requestquotaion"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <RequestQuote />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/purchasequotation"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Quotations />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/quotes/summary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewPurchaseQuotation />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/quotes/edit"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <UpdatePurchaseQuote />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/rfq/summary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewRFQ />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/indent/edit"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <UpdateIndent />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/indent/summary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewIndent />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/bill"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Bill />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/updatebill"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <UpdateBill />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/purchase/paymentsmade"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <PaymentsMade />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/sales/converttoinvoice"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ConvertToInvoice />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/dctoinvoice"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <DcToInvoice />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/quotetoinvoice"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <QuoteToInvoice />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/invoicesummary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <InvoiceSummary />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/deliverychallan/summary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <DeliveryChallanSumary />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/posummary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <PurchaseOrderSummary />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/paymentmadesummary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <PaymentsMadeSummary />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/updatePaymentMade"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <UpdatePaymentMade />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/creditnote"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <CreditNotes />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/sales/creditnotesummary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <CreditNoteSummary />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/purchase/vendorcredit"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <VendorCredit />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/purchase/vendorcreditsummary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <VendorCreditSummary />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/purchase/updateVendorCredit"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <UpdateVendorCredit />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/purchase/billsummary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <BillSummary />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/inventory/inspection"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Inspection />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/inventory/grn"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Grn />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/inventory/inspectionNote"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewInspection />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/inventory/grnsummary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewGrn />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/inventory/gin"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Gin />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/inventory/ginsummary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewGin />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/inventory/griforcashsummary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewGriForCash />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/inventory/dispatchchallan"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <DespatchChallan />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/inventory/cashgoodrecnote"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <CashGoodRecNote />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/sales/despatchchallan/summary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <ViewDespatchChallan />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/inventory/stock"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <Stock />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/inventory/stock/summary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <StockSummary />
                  </ProtectedRoutes>
                }
              />
            }
          />

          <Route
            path="/dashboard/accounts/fundtransfer"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                    <FundTransfer />
                  </ProtectedRoutes>
                }
              />
            }
          />
          <Route
            path="/dashboard/accounts/cashinvoice"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                   <CashInvoice/>
                  </ProtectedRoutes>
                }
              />
            }
          />

<Route
            path="/dashboard/accounts/cashinvoicesummary"
            element={
              <Dashboard
                children={
                  <ProtectedRoutes>
                <CashInvoiceSummary/>
                  </ProtectedRoutes>
                }
              />
            }
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
