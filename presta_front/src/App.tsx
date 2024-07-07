import {  useState } from "react";
import * as context from "@utils/context";
import Jobs from "@models/jobs";
import { CookiesProvider } from "react-cookie";
import { RouterProvider } from "react-router-dom";
import router from "@utils/route";

export const SearchInputContext = context.SearchInputContext();
export const AreaContext = context.AreaContext();
export const JobContext = context.JobContext();
export const JobListContext = context.JobListContext();
export const ToastMessageContext = context.ToastMessageContext();

function App() {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [searchInput, setSearchInput] = useState("");
  const [job, setJob] = useState<string>("All");
  const [jobList, setJobList] = useState<Jobs[]>([]);
  const [area, setArea] = useState<string[]>([
    "North",
    "East",
    "South",
    "West",
  ]);

  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <JobListContext.Provider value={{ jobList, setJobList }}>
        <JobContext.Provider value={{ job, setJob }}>
          <AreaContext.Provider value={{ area, setArea }}>
            <ToastMessageContext.Provider
              value={{ toastMessage, setToastMessage }}
            >
              <SearchInputContext.Provider
                value={{ searchInput, setSearchInput }}
              >
                    <RouterProvider router={router} />
              </SearchInputContext.Provider>
            </ToastMessageContext.Provider>
          </AreaContext.Provider>
        </JobContext.Provider>
      </JobListContext.Provider>
    </CookiesProvider>
  );
}

export default App;
