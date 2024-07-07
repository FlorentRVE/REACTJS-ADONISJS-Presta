import { useContext } from "react";
import {
  AreaContext,
  JobContext,
  JobListContext,
  SearchInputContext,
} from "../App";

const Filters = () => {
  const { setSearchInput } = useContext(SearchInputContext);
  const { area, setArea } = useContext(AreaContext);
  const { setJob } = useContext(JobContext);
  const { jobList } = useContext(JobListContext);

  return (
    <div>
      {/* search Bar */}
      <form className="form-control px-4">
        <input
          type="text"
          placeholder="Search for a service provider ..."
          className="input input-bordered w-24 md:w-auto"
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {/* Filtres */}
        <div className="flex gap-3 justify-center items-center mt-5">
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text mr-2">North</span>
              <input
                value={"North"}
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-secondary"
                onInput={(e) => {
                  if (e.currentTarget.checked) {
                    setArea([...area, e.currentTarget.value]);
                  } else {
                    setArea(
                      area.filter((item) => item !== e.currentTarget.value)
                    );
                  }
                }}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text mr-2">East</span>
              <input
                value={"East"}
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-secondary"
                onInput={(e) => {
                  if (e.currentTarget.checked) {
                    setArea([...area, e.currentTarget.value]);
                  } else {
                    setArea(
                      area.filter((item) => item !== e.currentTarget.value)
                    );
                  }
                }}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text mr-2">South</span>
              <input
                value={"South"}
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-secondary"
                onInput={(e) => {
                  if (e.currentTarget.checked) {
                    setArea([...area, e.currentTarget.value]);
                  } else {
                    setArea(
                      area.filter((item) => item !== e.currentTarget.value)
                    );
                  }
                }}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text mr-2">West</span>
              <input
                value={"West"}
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-secondary"
                onInput={(e) => {
                  if (e.currentTarget.checked) {
                    setArea([...area, e.currentTarget.value]);
                  } else {
                    setArea(
                      area.filter((item) => item !== e.currentTarget.value)
                    );
                  }
                }}
              />
            </label>
          </div>
        </div>
        {/* JOB */}
        <select
          className="select select-bordered w-full max-w-xs"
          onInput={(e) => {
            setJob(e.currentTarget.value);
          }}
        >
          <option value="All">All</option>
          {jobList.map((job) => (
            <option key={job.id} value={job.name}>
              {job.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Filters;
