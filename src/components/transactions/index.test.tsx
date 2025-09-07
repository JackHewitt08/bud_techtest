import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse, delay } from "msw";
import { server } from "../../../vitest-setup";
import { transactions } from "../../api/data/transactions";
import { TransactionHistory } from ".";

describe("transaction history", () => {
  test("the expenses tab should be shown by default", async () => {
    render(<TransactionHistory />);

    expect(screen.getByText("Transaction History")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    // This needs to be findByRole due to the async nature of the test https://testing-library.com/docs/dom-testing-library/api-async
    const expensesTable = await screen.findByRole("table", {
      name: "Expenses",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(screen.getByText("-€20.25")).toBeInTheDocument();
  });
  
  test("changing between the expenses and income tabs should show different transactions", async () => {
    render(<TransactionHistory />);

    const expensesTabTrigger = screen.getByRole("tab", { name: "Expenses" });
    const incomeTabTrigger = screen.getByRole("tab", { name: "Income" });

    const expensesTable = await screen.findByRole("table", { name: "Expenses" });
    expect(expensesTable).toBeInTheDocument();

    // Radix expects pointer events, not element clicks to trigger activations https://github.com/radix-ui/primitives/issues/2362
    fireEvent.mouseDown(incomeTabTrigger);
    
    await waitFor(() => expect(incomeTabTrigger).toHaveAttribute("data-state", "active"));
    expect(expensesTabTrigger).toHaveAttribute("data-state", "inactive");
  
    expect(screen.queryByText("-€20.25")).not.toBeInTheDocument();
  });

  test("displays a loading state while transactions are fetching", async () => {
    server.use(
      http.get("/api/transactions", async () => {
        await delay(100);
        return HttpResponse.json(transactions);
      }),
    );

    render(<TransactionHistory />);

    expect(screen.getByText("Transaction History")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    const expensesTable = await screen.findByRole("table", { name: "Expenses" });
    expect(expensesTable).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  test("renders an error message when transactions API fails", async () => {
    server.use(
      http.get("/api/transactions", () => new HttpResponse(null, { status: 500 }))
    );

    render(<TransactionHistory />);

    const errorEl = await screen.findByText("Something went wrong. Please try again.");
    expect(errorEl).toBeInTheDocument();
  });
});
