import React from "react";
import { DashboardLayout } from "../../components/Layout";

const Settings = () => {
  return <div>Settings</div>;
};
Settings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Settings;
