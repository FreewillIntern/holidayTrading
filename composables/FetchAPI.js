import { useMainStore } from "~~/stores/data";

const store = useMainStore();

export const addDate = async (body) => {
  await useFetch(() => "https://10.22.26.103/beam/holiday/insert", {
    method: "POST",
    body: body,
  });
};

// export const editDate = async (params, body) => {
//   await useFetch(() => "https://10.22.26.103/beam/holiday/edit", {
//     method: "POST",
//     params: params,
//     body: body,
//   });
// };

export const editDate = async (params, body, marketCode, year) => {
  const [edit, holidays] = await Promise.all([
    useFetch(() => "https://10.22.26.103/beam/holiday/edit", {
      method: "POST",
      params: params,
      body: body,
    }),
    fetch(
      `https://10.22.26.103/beam/holiday?mkt=${marketCode}&year=${year.toString()}`
    )
      .then((response) => {
        response.json;
      })
      .then((result) => (store.holidays = result)),
  ]);
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

export const holidaysDDD = fetch(
  `https://10.22.26.103/beam/holiday?mkt=AMEX&year=2023`
).then((response) => {
  response.json();
});
