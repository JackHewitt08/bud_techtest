import type { Transaction as TransactionType } from "../../../types";
import { Avatar } from "./avatar";
import { formatCurrency, formatDate } from "../../utils/format";

type Props = {
  transaction: TransactionType;
};

export const Transaction = ({ transaction }: Props) => (
  <tr>
    <td>
      <div className="transaction-detail">
        <Avatar name={transaction.description} />
        <div className="transaction-description">
          {transaction.description}
          <div className="transaction-category">{transaction.category}</div>
        </div>
      </div>
    </td>
    <td>
      <div>{formatDate(transaction.date)}</div>
    </td>
    <td className="transaction-amount">
      <div className="amount">{formatCurrency(transaction.amount.value, transaction.amount.currency_iso)}</div>
    </td>
  </tr>
);
