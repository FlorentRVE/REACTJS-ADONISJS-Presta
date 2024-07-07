// ============================ Context ========================

import Jobs from "@/models/jobs";
import { createContext } from "react";

export const SearchInputContext = () => {
  return createContext<{
    searchInput: string;
    setSearchInput: (value: string) => void;
  }>({
    searchInput: "",
    setSearchInput: () => null,
  });
};

export const JobContext = () => {
  return createContext<{
    job: string;
    setJob: (value: string) => void;
  }>({
    job: "",
    setJob: () => null,
  });
};

export const AreaContext = () => {
  return createContext<{
    area: string[];
    setArea: (value: string[]) => void;
  }>({
    area: [],
    setArea: () => null,
  });
};
export const JobListContext = () => {
  return createContext<{
    jobList: Jobs[];
    setJobList: (value: Jobs[]) => void;
  }>({
    jobList: [],
    setJobList: () => null,
  });
};

export const AuthContext = () => {
  return createContext<{
    isAuth: boolean;
    setIsAuth: (value: boolean) => void;
  }>({
    isAuth: false,
    setIsAuth: () => null,
  });
};

export const ToastMessageContext = () => {
  return createContext<{
    toastMessage: string;
    setToastMessage: (value: string) => void;
  }>({
    toastMessage: "",
    setToastMessage: () => null,
  });
};
