import React from "react";

function Layout({
  children,
  comments
}: {
  children: React.ReactNode;
  comments: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {comments}
    </div>
  );
}

export default Layout;
