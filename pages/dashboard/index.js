import React from "react";
import { DashboardLayout } from "../../components/Layout";

const Index = () => {
  return <div>Home</div>;
};

Index.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Index;
