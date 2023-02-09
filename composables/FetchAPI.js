export const editDate = async (params, body) => {
  console.log("editDate composables: ", params, "---", body);
  await useFetch(() => "https://10.22.26.103/beam/holiday", {
    params: params,
    method: "PUT",
    body: body,
  });
};

export const addDate = async (body) => {
  console.log(typeof body);
  await useFetch(() => "https://10.22.26.103/beam/holiday", {
    method: "POST",
    body: body,
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
    console.log("market: ", value);
  });
  return market;
};
