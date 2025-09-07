import { delay, http, HttpResponse } from "msw";
import { accounts } from "./data/accounts";
import { transactions } from "./data/transactions";

const isTest = process.env.NODE_ENV === "test";
const duration = isTest ? 0 : 2000;

export const handlers = [
  // this api is almost instant
  http.get("/api/accounts", async () => {
    return HttpResponse.json(accounts)
  }),
  // this api takes two seconds
  http.get("/api/transactions", async () => {
    await delay(duration);
    return HttpResponse.json(transactions)
  })
];
