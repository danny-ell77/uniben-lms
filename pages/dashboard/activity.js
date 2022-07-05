import React from "react";
import { DashboardLayout } from "../../components/Layout";

const Activity = () => {
  return <div>Activity</div>;
};

Activity.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Activity;
