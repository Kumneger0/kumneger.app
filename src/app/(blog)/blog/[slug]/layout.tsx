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
  console.log();
  return (
    <div>
      {children}
      {comments}
      {others}
    </div>
  );
}

export default Layout;
