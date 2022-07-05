import React, { useState } from "react";
import { DashboardLayout } from "../../components/Layout";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../components/submissions/markdownConfig";

const RichTextContainer = styled(Box)(({ theme }) => ({
  paddingTop: 25,
  height: "100vh",
  width: "60%",
  backgroundColor: "#fff",
}));

const Submissions = () => {
  const [text, setText] = useState("");

  const handleChange = (html) => {
    setText(html);
  };

  return (
    <RichTextContainer>
      <h3>Create a submission</h3>
      <ReactQuill value={text} onChange={handleChange} modules={modules}>
        <div style={{ height: "100%" }} />
      </ReactQuill>
    </RichTextContainer>
  );
};
Submissions.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Submissions;
