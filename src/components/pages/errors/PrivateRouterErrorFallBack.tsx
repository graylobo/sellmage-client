import * as Sentry from "@sentry/react";
import { Button } from "antd";
import { createStyles } from "antd-style";
import React from "react";
import { useRouteError } from "react-router-dom";

const useStyles = createStyles(() => ({
  globalErrorFallbackWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  },
  errorIcon: {
    fontSize: "5rem",
  },
  errorTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  errorText: {
    fontSize: "1.3rem",
  },
  errorCode: {
    padding: "10px 0",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
}));

const PrivateRouterErrorFallBack = () => {
  const error = useRouteError();
  console.error("PrivateRouterErrorFallBack: ", error);

  const { styles } = useStyles();

  const handleReloadPage = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  React.useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <section className={styles.globalErrorFallbackWrapper}>
      <h1 className={styles.errorIcon}> ⛔ </h1>
      <h2 className={styles.errorTitle}>
        It failed to perform the requested operation.
      </h2>
      <span className={styles.errorText}>
        It is a temporary phenomenon, so please try again later.
      </span>
      <span className={styles.errorCode}>
        {`Error Code: ${error || "Unknown"}`}
      </span>
      <div className={styles.buttonGroup}>
        <Button type="default" htmlType="button" onClick={handleReloadPage}>
          Reload Page
        </Button>
        <Button type="default" htmlType="button" onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    </section>
  );
};

export default PrivateRouterErrorFallBack;
