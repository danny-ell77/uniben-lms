import React from "react";
import { DashboardLayout } from "../../components/Layout";
import { ChatEngine } from "react-chat-engine";

const Chat = () => {
  return (
    <div>
      <ChatEngine projectID="" userName="" userSecret="" />
    </div>
  );
};
Chat.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Chat;
