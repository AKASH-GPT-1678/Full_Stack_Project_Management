import { createAsyncThunk } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage"; // for localStorage
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// import  {getallProjects}  from "./projectredux";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
// 
import { Task } from "./taskvalidation";
// import storage from "redux-persist/lib/storage";



export type Initials = {
  activeProject: string | null;
  activeProjname: string | null;
  Task: Task[],
  selectedTask: Task,
  productid: string,
  contact: string,
  error: string | null,
  loading: boolean,
  activeJob: string | null,
  activeJobapplication: string | null,
  numofMembers: number | null,
  userid: string | null,
  isLoggedin: boolean;
  isVerifiedFinance: boolean;
  token: string | null;
  isOpen: boolean;
  projectmode: boolean;
};

const initialState: Initials = {
  activeProject: null,
  activeProjname: null,
  Task: [],
  selectedTask: {} as Task,
  productid: "",
  contact: "",
  error: null,
  userid: null,
  loading: false,
  activeJob: null,
  activeJobapplication: null,
  numofMembers: null,

  isVerifiedFinance: false,
  isLoggedin: false,
  token: null,
  isOpen: false,
  projectmode: false,
};

interface Storage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<string>;
  removeItem(key: string): Promise<void>;
}

const createNoopStorage = (): Storage => {
  return {
    getItem(_key: string): Promise<string | null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string): Promise<string> {
      return Promise.resolve(value);
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    }
  };
};
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();


export const getAllProjects = createAsyncThunk(
  "projects/getAll",
  async (_, { getState }) => {
    const state = getState() as { User: Initials };
    const token = state.User.token;
    const id = state.User.activeProject;
    console.log(token);
    // let id = "cm9k74lt00002uv9sukgn3jgs";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_Endpoint}api/gettasks/${id}`,
      {
        method: "GET",

      }
    );
    const data = await response.json();
    console.log(data);
    console.log(data.Project?.[0]?.projects.Task);

    return data.tasks?.Task || [];
  }
);


const userState = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    setLogin(state) {
      state.isLoggedin = !state.isLoggedin;
    },

    setisOpen(state) {
      state.isOpen = !state.isOpen;
    },
    createproject(state) {
      state.projectmode = !state.projectmode;
    },
    setContact(state, harkat: PayloadAction<string>) {
      state.contact = harkat.payload;
    },
    setToken(state, harkat: PayloadAction<string>) {
      state.token = harkat.payload;
    },
    setProductid(state, harkat: PayloadAction<string>) {
      state.productid = harkat.payload;
    },
    setActiveJob(state, harkat: PayloadAction<string>) {
      state.activeJob = harkat.payload;
    },
    setactiveJobApplications(state, harkat: PayloadAction<string>) {
      state.activeJobapplication = harkat.payload;
    },
    setFinanceState(state, harkat: PayloadAction<boolean>) {
      state.isVerifiedFinance = harkat.payload

    },
    setnoOfMembers(state , harkat : PayloadAction<number>){
      state.numofMembers = harkat.payload;
    },

    setactiveProject(state, harkat: PayloadAction<string>) {
      state.activeProject = harkat.payload;

    },

    setuserid(state, harkat: PayloadAction<string>) {
      state.userid = harkat.payload;
    },

    setSelectedTask(state, harkat: PayloadAction<Task>) {
      state.selectedTask = harkat.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.Task = action.payload;
    });
    builder.addCase(getAllProjects.rejected, (state, action) => {
      state.error = action.error.message || "Failed to fetch";

    });
    builder.addCase(getAllProjects.pending, (state) => {
      state.loading = true;
    })
  },
});

export const {
  setLogin,
  setToken,
  setisOpen,
  createproject,
  setFinanceState,
  setactiveProject,
  setProductid,
  setSelectedTask,
  setuserid,
  setContact,
  setActiveJob,
  setactiveJobApplications,
  setnoOfMembers
} = userState.actions;


const rootReducer = combineReducers({
  User: userState.reducer,



});


const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["User"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

});


export const persistor = persistStore(store);
