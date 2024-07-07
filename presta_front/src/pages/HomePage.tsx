import Filters from "@/components/Filters";
import Header from "@/components/Header";
import DialogBox from "@/components/auth/DialogBox";
import React, { useContext, useEffect } from "react";
import * as api from "@/utils/api";
import * as sort from "@/utils/sort";
import {
  AreaContext,
  JobContext,
  JobListContext,
  SearchInputContext,
} from "../App";
import ToastMessage from "@/components/auth/ToastMessage";
import Footer from "@/components/Footer";
import User from "@/models/user";

function HomePage() {
  const [data, setData] = React.useState<User[]>([]);

  const { searchInput } = useContext(SearchInputContext);
  const { setJobList } = useContext(JobListContext);
  const { job } = useContext(JobContext);
  const { area } = useContext(AreaContext);

  useEffect(() => {
    api.getUsers().then((data) => {
      setData(data);
    });
  }, [searchInput]);

  useEffect(() => {
    api.getJob().then((jobs) => {
      setJobList(jobs);
    });
  }, [setJobList]);

  // Filtre par recherche et zone
  const dataFiltered = sort.dataFilterBySearchandArea(data, searchInput, area);

  // Filtre par Job
  const dataTried = sort.dataFilterByJob(dataFiltered, job);

  return (
    <div className="flex flex-col h-screen">
      <DialogBox />
      <Header />
      <Filters />
      <main className="flex-1 flex flex-wrap p-4 justify-center items-center gap-4 my-5">
        {dataTried.map((item) => (
          <div className="card w-96 bg-gray-800 shadow-xl p-6" key={item.id}>
            <figure>
              <img
                src={item.avatar}
                alt="Profil"
                className="rounded-xl w-full h-auto object-cover"
              />
            </figure>
            <div className="card-body flex flex-col p-3 gap-8">

              <div className="flex justify-between">
                <h2 className="card-title">{item.name}</h2>
                <h3 className="card-title text-red-500 text-xl">{item.job}</h3>
              </div>

              <p className="bg-secondary/50 text-white font-bold rounded-2xl w-24 p-1 self-end text-center">
                {item.area}
              </p>

            </div>
          </div>
        ))}
      </main>
      <ToastMessage />
      <Footer />
    </div>
  );
}

export default HomePage;
