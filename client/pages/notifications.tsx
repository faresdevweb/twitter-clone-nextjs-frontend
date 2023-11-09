import React from "react";
import Layout from "@/components/Layout";
import Notification from "@/components/Notification";
import { useAuth, useNotifications } from "@/hooks";

const Notifications = () => {
  const { isAuthenticated } = useAuth();
  const { data } = useNotifications();

  if (!isAuthenticated)
    return <h1 className="text-center text-4xl">Loading ... </h1>;

  return (
    <Layout>
      <div className="p-5 mt-3 xs:h-[100%] xs:mb-[15%] w-full">
        <div className="text-left text-2xl font-bold mb-5 p-4">
          <h1>Notifications</h1>
        </div>
        {data && data.lenght === 0 ? (
          <div>
            <h2 className="text-center text-2xl">No activity yet!</h2>
          </div>
        ) : (
          data.map((notification: any) => (
            <Notification key={notification.id} content={notification.body} />
          ))
        )}
      </div>
    </Layout>
  );
};

export default Notifications;
