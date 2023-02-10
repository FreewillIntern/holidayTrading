import { useMainStore } from "~~/stores/data";

const store = useMainStore();

export const addDate = async (body) => {
  await useFetch(() => "https://10.22.26.103/beam/holiday/insert", {
    method: "POST",
    body: body,
  });
};

export const editDate = async (params, body) => {
  await useFetch(() => "https://10.22.26.103/beam/holiday/edit", {
    method: "POST",
    params: params,
    body: body,
  });
};

export const delDate = async (id) => {
  await useFetch(() => "https://10.22.26.103/beam/holiday", {
    params: id,
    method: "DELETE",
  });
};

export const getHolidays = async (marketCode, year) => {
  const { data: holidays } = await Promise.all([
    useFetch(
      `https://10.22.26.103/beam/holiday?mkt=${marketCode}&year=${year.toString()}`
    ),
  ]);
  return holidays;
};
