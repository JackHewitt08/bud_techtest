import { useAccounts } from "../../api/hooks";
import { Loading } from "../loading";
import { AccountItem } from "./item";
import "./index.css";

export const Accounts = () => {
  const { accounts, loading } = useAccounts();

  return (
    <>
      <h1 className="align-left">Your accounts</h1>
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
