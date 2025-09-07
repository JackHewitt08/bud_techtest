import { setupServer } from "msw/node";
import { handlers } from "./src/api/handlers";
import { beforeAll, afterEach, afterAll } from 'vitest'

// @see https://testing-library.com/docs/svelte-testing-library/setup/
import "@testing-library/jest-dom/vitest";

export const server = setupServer(...handlers)
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
