// ============================ Tri ========================

import User from "@/models/user";

export const dataFilterBySearchandArea = (data: User[], searchInput: string, area: string[]) => {
  return data.filter((item) => {
    const { name } = item;
    const inputValue = searchInput.toLowerCase();
    const nameLower = name.toLowerCase();
    return nameLower.includes(inputValue) && area.includes(item.area);
  });
};

export const dataFilterByJob = (dataFiltered: User[], job:string) => {
  return dataFiltered.filter((item) => {
    if(item.job === job) {
      return item;
    } else if(job == "All") {
      return item;
    }
  });

};

