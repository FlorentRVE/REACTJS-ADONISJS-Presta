import Jobs from "./jobs";

export default interface Profile {
  id: number;
  name: string;
  area: string;
  avatar: string;
  jobId: number;
  tel: string;
  job: Jobs;

}