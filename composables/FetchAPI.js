import { useMainStore } from "~~/stores/data";

const store = useMainStore();

export const addDate = async (body) => {
  await useFetch(() => "https://10.22.26.103/beam/holiday", {
    method: "POST",
    body: body,
  });
};

export const editDate = async (params, body) => {
  await useFetch(() => "https://10.22.26.103/beam/holiday", {
    method: "PUT",
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

export const getHolidays = (marketCode, year) => {
  console.log(marketCode, "--", year.toString());
  fetch(`https://10.22.26.103/beam/holiday?mkt=${marketCode}&year=${year.toString()}`)
    .then((response) => response.json())
    .then((result) => {
      console.log("result:", result);
      store.holidays = result;
    });
};

export const getMarket = async () => {
  const res = await useFetch(() => {
    "https://10.22.26.103/beam/market";
  });
  const resolve = Promise.resolve(res);
  const market = ["hi"];
  resolve.then((value) => {
    market.push(value);
  });
  return market;
};
