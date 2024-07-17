import { Button } from "antd";
import { createStyles } from "antd-style";

function GlobalErrorFallBack({ error }: any) {
  console.log(error);

  const handleReloadPage = () => {
    window.location.reload();
  };

  const { styles } = useStyles();

  return (
    <section className={styles.globalErrorFallbackWrapper}>
      <h1 className={styles.errorIcon}> ⛔ </h1>
      <h2 className={styles.errorTitle}>
        It failed to perform the requested operation.
      </h2>
      <span className={styles.errorText}>
        It is a temporary phenomenon, so please try again later.
      </span>
      <span
        className={styles.errorCode}
      >{`Error Code: ${error?.response.status}`}</span>
      <Button type="default" htmlType="button" onClick={handleReloadPage}>
        Reload Page
      </Button>
    </section>
  );
}

export default GlobalErrorFallBack;

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
}));
