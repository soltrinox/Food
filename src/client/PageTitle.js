import React, { useEffect } from "react";

const PageTitle = (props) => {
  useEffect(() => {
    document.title = props.title;
  }, []);
  const PageComponent = props.component;
  return <PageComponent />;
};

export default PageTitle;
