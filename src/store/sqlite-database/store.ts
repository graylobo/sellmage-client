import { create } from "zustand";
import initSqlJs from "sql.js";

interface DatabaseState {
  db: any;
  loading: boolean;
  error: any;
  initDatabase: (fileData?: ArrayBuffer) => Promise<void>;
  loadDatabaseFromFile: (file: File) => void;
}

const useSqliteDatabaseStore = create<DatabaseState>((set) => ({
  db: null,
  loading: true,
  error: null,
  initDatabase: async (fileData?: ArrayBuffer) => {
    try {
      const SQL = await initSqlJs({
        locateFile: (file) => `${process.env.PUBLIC_URL}/sql-wasm.wasm`,
      });
      let database;
      if (fileData) {
        database = new SQL.Database(new Uint8Array(fileData));
      } else {
        database = new SQL.Database();
      }
      const query = "SELECT name FROM sqlite_master WHERE type='table';";
      const result = database.exec(query);
      console.log(result);
      set({ db: database, loading: false, error: null });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
  loadDatabaseFromFile: (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileData = event.target?.result;
      if (fileData) {
        useSqliteDatabaseStore.getState().initDatabase(fileData as ArrayBuffer);
      }
    };
    reader.onerror = (err) => {
      set({ error: err, loading: false });
    };
    reader.readAsArrayBuffer(file);
  },
}));

export default useSqliteDatabaseStore;
