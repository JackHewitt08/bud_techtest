import { useAccounts } from "../../api/hooks";
import { Loading } from "../loading";
import { AccountItem } from "./item";
import "./index.css";
import { ErrorState } from "../error";

export const Accounts = () => {
  const { accounts, loading, error } = useAccounts();

  return (
    <>
      <h1 className="align-left">Your accounts</h1>
      {error && <ErrorState />}
      {loading ? (
        <Loading />
      ) : (
      <div className="accounts">
        {accounts.map((account) => (
          <AccountItem account={account} key={account.account_id} />
        ))}
      </div>
      )}
    </>
  );
};
