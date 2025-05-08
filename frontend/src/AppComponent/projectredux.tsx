
// import { createSlice} from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { Task } from "./taskvalidation";
// import { Initials } from "./redux";
// export interface Project {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
//   Tasks: Task[];
// }

// export const getallProjects = createAsyncThunk(
//   "projects/getAll",
//   async (_, { getState }) => {
//     const state = getState() as { User: Initials };
//     const token = state.User.token;
//     console.log(token);

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_Endpoint}api/myprojects`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         }
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//     console.log(data.Project?.[0]?.projects);

//     return data.Project?.[0]?.projects || [];
//   }
// );

// export interface ProjectsState {
//   projects: Project[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ProjectsState = {
//   projects: [],
//   loading: false,
//   error: null,

// };



// const projectSlice = createSlice({
//   name: "Projects",
//   initialState,
//   reducers: {

//     setloading(state) {
//       state.loading = !state.loading
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getallProjects.fulfilled, (state, action) => {
//         state.loading = false;
//         // console.log(action.payload);
//         state.projects.push(...action.payload);
//       })
//       .addCase(getallProjects.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch';
//       });
//   }
// },
// )

// export const { setloading } = projectSlice.actions;

// export default projectSlice.reducer;