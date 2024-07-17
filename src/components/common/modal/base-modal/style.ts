import { createStyles, css } from "antd-style";

export const useStyles = createStyles(() => ({
    container: css`
      position: fixed;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      z-index: 999;
    `,
    top: css`
      display: flex;
      align-items: center;
      flex-direction: center;
      padding: 10px 20px;
      border-bottom: 1px solid #d8d8d8;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: white;
    `,
    title: css``,
    defaultLayout: css`
      background-color: white;
      position: relative;
      max-width: 80%;
      min-width: 500px;
      max-height: 100%;
      overflow: auto;
    `,
    componentSection: css`
      padding: 30px 20px 40px;
    `,
    globalStyle: css`
      body {
        overflow: hidden;
      }
    `,
  }));