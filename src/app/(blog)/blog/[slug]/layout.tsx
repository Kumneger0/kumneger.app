import React from "react";

function Layout({
  children,
  comments,
  others
}: {
  children: React.ReactNode;
  comments: React.ReactNode;
  others: React.ReactNode;
}) {
  return (
    <div>
      {children}

    </div>
  );
}

export default Layout;
