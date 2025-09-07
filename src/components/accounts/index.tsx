import { useAccounts } from "../../api/hooks";
import { AccountItem } from "./item";
import "./index.css";

export const Accounts = () => {
  const { accounts } = useAccounts();

  return (
    <>
      <h1 className="align-left">Your accounts</h1>
      <div className="accounts">
        {accounts.map((account) => (
          <AccountItem account={account} key={account.account_id} />
        ))}
      </div>
    </>
  );
};
