// ============================ API ========================

const API_USER_URL = "http://localhost:3000/users/";
const API_JOB_URL = "http://localhost:3000/jobs/";

export const getUsers = async () => {
  return await fetch(API_USER_URL)
    .then((response) => response.json())
    .then((data) => data.Users);
};

export const getJob = async () => {
  return await fetch(API_JOB_URL)
    .then((response) => response.json())
    .then((data) => data.Jobs);
};

export const login = async (email: string, password: string) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    email: email,
    password: password,
  });

  return await fetch("http://localhost:3000/login", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  }).then((response) => response.json());
};

export const logout = async (token: string) => {
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  return await fetch("http://localhost:3000/logout", {
    method: "POST",
    headers: headersList,
  }).then((response) => response.json());
};
export const register = async (formData: any) => {
  let headersList = {
    Accept: "*/*",
  };

  let bodyContent = new FormData();
  bodyContent.append("email", formData.email);
  bodyContent.append("password", formData.password);
  bodyContent.append("name", formData.name);
  bodyContent.append("job", formData.job);
  bodyContent.append("tel", formData.tel);
  bodyContent.append("area", formData.area);
  bodyContent.append("avatar", formData.avatar);

  return await fetch("http://localhost:3000/register", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  }).then((response) => response.json());
};

export const updateProfile = async (formData: any, token : string) => {
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + token,
  };

  let bodyContent = new FormData();
  bodyContent.append("email", formData.email);
  bodyContent.append("password", formData.password);
  bodyContent.append("name", formData.name);
  bodyContent.append("job", formData.job);
  bodyContent.append("tel", formData.tel);
  bodyContent.append("area", formData.area);
  bodyContent.append("avatar", formData.avatar);

  return await fetch("http://localhost:3000/profile", {
    method: "PUT",
    body: bodyContent,
    headers: headersList,
  }).then((response) => response.json());
};

export const enableUser = async (id: string, currentCheckedStatus: boolean) => {
  await fetch(API_USER_URL + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      enabled: currentCheckedStatus,
    }),
  }).then((response) => response.json());
};

export const getProfile = async (token: string) => {
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  return await fetch("http://localhost:3000/profile", {
    method: "GET",
    headers: headersList,
  }).then((response) => response.json());
};
