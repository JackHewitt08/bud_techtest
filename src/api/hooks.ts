import { useEffect, useState } from "react";
import type { Account, Transaction } from "../../types";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch("/api/accounts")
      .then((response) => response.json())
      .then((data: Array<Account>) => {
        if (!isMounted) return;
        setAccounts(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { accounts, loading, error } as const;
};

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch("/api/transactions")
      .then((response) => response.json())
      .then((data: Array<Transaction>) => {
        if (!isMounted) return;
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { transactions, loading, error } as const;
};


