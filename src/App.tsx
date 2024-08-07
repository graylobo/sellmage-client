import * as Sentry from "@sentry/react";
import { Spin } from "antd";
import { createStyles } from "antd-style";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import GlobalErrorFallBack from "./components/pages/errors/GlobalErrorFallBack";
import Router from "./routes/Router";

const useStyles = createStyles(() => ({
  customSpinner: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

function App() {
  const { styles } = useStyles();
  const handleError = (error: Error, info: React.ErrorInfo) => {
    console.error("Global :", error);
    Sentry.captureException(error, {
      extra: { componentStack: info.componentStack },
    });
  };

  return (
    <ErrorBoundary
      FallbackComponent={GlobalErrorFallBack}
      onError={handleError}
    >
      <Suspense
        fallback={
          <Spin
            className={styles.customSpinner}
            tip="Loading..."
            size="large"
          />
        }
      >
        <Router />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Sentry.withProfiler(App);
