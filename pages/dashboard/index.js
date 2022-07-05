import React from "react";
import { DashboardLayout } from "../../components/Layout";
import { store } from "../../src/store";

const Index = () => {
  return <div>Home</div>;
};

Index.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Index;
