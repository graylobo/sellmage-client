import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import fs from "fs";
import os from "os";
import isDev from "electron-is-dev";
import { fileURLToPath } from "url";
import log from "electron-log";
import { init } from "@sentry/electron";

init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
});
// 로그 파일 경로 명시적 설정
// log.transports.file.resolvePath = () =>
//     path.join(app.getPath("userData"), "logs", "main.log");

// 로그 설정
log.transports.file.level = "info";
log.transports.file.format = "{h}:{i}:{s}:{ms} {text}";

// 로그 사용 예
log.info("App starting...");
console.log("User Data Path:", app.getPath("userData")); // 로그 경로 확인

// 에러 캐치
process.on("uncaughtException", (error) => {
  log.error("Uncaught Exception:", error);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: true,
    },
  });

  const indexPath = path.join(__dirname, "..", "build", "index.html");
  const startUrl = isDev ? "http://localhost:3000" : `file://${indexPath}`;
  log.info(`Loading URL: ${startUrl}`);

  // 파일 존재 여부 확인
  if (!fs.existsSync(indexPath)) {
    log.error("index.html not found in build folder");
  } else {
    log.info(`index.html exists at ${indexPath}`);
  }

  mainWindow.loadURL(startUrl).catch((err) => {
    log.error("Failed to load URL:", err);
  });

  mainWindow.webContents.openDevTools({ mode: "detach" }); // 프로덕션에서도 DevTools 열기

  mainWindow.setResizable(true);
  mainWindow.on("closed", () => {
    mainWindow = null;
    app.quit();
  });
  mainWindow.focus();
}

app.on("ready", createWindow);

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// 파일 생성 로직
ipcMain.on("create-file", (event, arg) => {
  const userHomeDir = os.homedir();
  const filePath = path.join(userHomeDir, "some.txt");

  fs.writeFile(filePath, "hello world", (err) => {
    if (err) {
      log.error("Failed to create file:", err); // 에러 로그 기록
      event.reply("file-created", {
        success: false,
        message: err.message,
      });
    } else {
      log.info("File created successfully at", filePath); // 성공 로그 기록
      event.reply("file-created", {
        success: true,
        message: "File created successfully",
      });
    }
  });
});
