import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PageNotFound from "./pages/PageNotFound";
import Widget from "./components/admin/Widget";
import EmployeeOnboard from "./components/admin/EmployeeOnboard";
import EmployeeList from "./components/admin/EmployeeList";
import AssetList from "./components/admin/AssetList";
import ProfilePage from "./pages/ProfilePage";
import Asset from "./components/admin/Asset";
import AssetCategoryList from "./components/admin/asset-category/AssetCategoryList";
import AssetCategoryAddEdit from "./components/admin/asset-category/AssetCategoryAddEdit";
import EmployeeWidget from "./components/employee/EmployeeWidget";
import BrowseAsset from "./components/employee/BrowseAsset";
import AssetRequest from "./components/employee/AssetRequest";
import MyAssets from "./components/employee/MyAssets";
import AssetRequestAdmin from "./components/admin/AssetRequestAdmin";
import ChangePassword from "./components/employee/ChangePassword";
import AssetServiceRequest from "./components/employee/AssetServiceRequest";
import AssetServiceRequestAdmin from "./components/admin/AssetServiceRequestAdmin";
import AuditRequestAdmin from "./components/admin/AuditRequestAdmin";
import AuditRequest from "./components/employee/AuditRequest";

const App = ()=>{

  return(
    <div>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route path="/login" element={<Auth />}></Route>
        <Route path="/employee" element={<EmployeeDashboard />}>
            <Route path="" element={<EmployeeWidget/>}></Route>
            <Route path="browse-asset" element={<BrowseAsset/>}></Route>
            <Route path="my-requests" element={<AssetRequest/>}></Route>
            <Route path="my-audit" element={<AuditRequest/>}></Route>
            <Route path="my-assets" element={<MyAssets/>}></Route>
            <Route path="change-password" element={<ChangePassword/>}></Route>
            <Route path="my-service-requests" element={<AssetServiceRequest/>}></Route>
        </Route>
        <Route path="/admin" element={<AdminDashboard />}>
            <Route path="" element={<Widget />}></Route>
            <Route path="all-employee" element={<EmployeeList />}></Route>
            <Route path="employee-onboard" element={<EmployeeOnboard />}></Route>
            <Route path="assets" element={<AssetList />}></Route>
            <Route path="add-asset" element={<Asset />}></Route>
            <Route path="edit-asset/:id" element={<Asset />}></Route>
            <Route path="assetCategory" element={<AssetCategoryList />}></Route>
            <Route path="add-assetCategory" element={<AssetCategoryAddEdit />}></Route>
            <Route path="edit-assetCategory/:id" element={<AssetCategoryAddEdit />}></Route>
            <Route path="requests" element={<AssetRequestAdmin />}></Route>
            <Route path="service-requests" element={<AssetServiceRequestAdmin />}></Route>
            <Route path="audit-requests" element={<AuditRequestAdmin />}></Route>
            <Route path="profile" element={<ProfilePage />}></Route>
        </Route>
        {/* <Route path="/profile" element={<ProfilePage />}></Route> */}
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  )

}


export default App
