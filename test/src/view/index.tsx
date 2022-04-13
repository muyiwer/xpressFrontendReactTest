import { useState } from "react";
import { regexForAmount, regexForCCN, regexForCVV, regexForPin } from "../misc/regex";
import './style.css';

type TransactionType = {
  merchant: String;
  transactionType: 'Withdrawal' | 'Deposit';
  amount: String;
}

type InputType = {
  transactionType: 'Withdrawal' | 'Deposit';
  cardNumber: String;
  cvv: String;
  pin: string;
  amount: String;
} | any;

export const Page: React.FC = (props) => {
  const initialValue: InputType = {
    transactionType: "Deposit",
    cardNumber: "",
    cvv: "",
    pin: "",
    amount: ""
  }
  const [values, setValue] = useState<InputType>({ ...initialValue });
  const [errors, setError] = useState<InputType>({});

  // holds all the transactions
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  // total state managed differently here.
  const [total, setTotal] = useState(0.00);

  const handleChange = (e: any) => {
    setError({});
    e.preventDefault();
    setValue({ ...values, [e.target.name]: e.target.value });
  }


  const validate = () => {
    if (!regexForCCN.test(values.cardNumber)) {
      setError({ ...errors, cardNumber: "Please input a valid card Number" });
      return false;
    }
    if (!regexForCVV.test(values.cvv)) {
      setError({ ...errors, cvv: "Please input a valid cvv" });
      return false;
    }
    if (!regexForPin.test(values.pin)) {
      setError({ ...errors, pin: "Please input a valid pin" });
      return false
    }
    if (!regexForAmount.test(values.amount)) {
      setError({ ...errors, amount: "Please input a valid amount" });
      return false;
    }
    if (total === 0 && values.transactionType == "Withdrawal") {
      setError({ ...errors, transactionError: 'You cannot make withdrawals due to low wallet balance.' })
      return false;
    }
    if (values.amount > total && values.transactionType === 'Withdrawal') {
      setError({ ...errors, transactionError: 'Your wallet balnce is lower than the amount you want to withdraw' })
      return false;
    }
    return true;
  }

  const handleSubmit = () => {
    // clear input
    if (values.transactionType === "Deposit") {
      setTotal(total + parseFloat(values.amount));
      setTransactions([...transactions, { transactionType: "Deposit", merchant: 'XpressPay', amount: (parseFloat(values.amount).toFixed(2)).toString() }])
    }
    if (values.transactionType === "Withdrawal") {
      setTotal(total - parseFloat(values.amount));
      setTransactions([...transactions, { transactionType: "Withdrawal", merchant: 'XpressPay', amount: (parseFloat(values.amount).toFixed(2)).toString() }])
    }
    setValue({ ...initialValue });
  }

  const submit = (e: any) => {
    e.preventDefault();
    if (validate()) handleSubmit();
  }

  return (
    <>
      <section>
        <h1 style={{ textAlign: "center" }}>Xpress APPs</h1>
        <div className="form-div">
          <div className="main-form">
            <div className="app-bar"><h2>XpressPay</h2> </div>
            <form onSubmit={submit}>
              <div className="inset">
                {errors.transactionError && <label className="error">{errors.transactionError}</label>}
                <br />
                <label>Transaction Type</label>
                <br />
                <select value={values.transactionType} className="form-control" name="transactionType" onChange={handleChange}>
                  <option value="Deposit">Deposit</option>
                  <option value="Withdrawal">Withdrawal</option>
                </select>
                <br />
                <br />
                <label>Card Number</label>
                <br />
                <input value={values.cardNumber} className="form-control" name="cardNumber" onChange={handleChange} />
                {errors.cardNumber && <label className="error">{errors.cardNumber}</label>}
                <br /> <br />
                <label>CVV</label>
                <br />
                <input value={values.cvv} className="form-control" name="cvv" onChange={handleChange} />
                {errors.cvv && <label className="error">{errors.cvv}</label>}
                <br />
                <br />
                <label>Pin</label>
                <br />
                <input value={values.pin} className="form-control" name="pin" onChange={handleChange} />
                {errors.pin && <label className="error">{errors.pin}</label>}
                <br /> <br />
                <label>Amount</label>
                <br />
                <input value={values.amount} className="form-control" name="amount" onChange={handleChange} />
                {errors.amount && <label className="error">{errors.amount}</label>}
                <br /> <br />
                <button type="submit">Pay</button>
              </div>
            </form>
            <div className="app-bar mt-2"><h2>Xpress Wallet</h2> </div>
            <main>
              <div className="inset">
                <p><span>Wallet Balance</span> : <span className="bold">{total.toFixed(2)}</span></p>
                <p><span>Name</span> : <span className="bold">Olumuyiwa Aro</span></p>
              </div>
            </main>

            <div className="app-bar mt-2"><h2>Xpress Report</h2> </div>
            <div className="inset table">
              <table>
                <thead>
                  <th>S/N</th>
                  <th>Merchant</th>
                  <th>TransactionType</th>
                  <th>Amount</th>
                </thead>
                <tbody>
                  {transactions.length > 0 && transactions.map((transaction: TransactionType, i) => <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{transaction.merchant}</td>
                    <td>{transaction.transactionType}</td>
                    <td>{transaction.amount}</td>
                  </tr>)}
                </tbody>
              </table>
            </div>
            <div className="no-margin">
              <p><span>Total: </span> <span className="bold">{total.toFixed(2)}</span></p>
            </div>
          </div>
        </div>
      </section>
      <footer style={{ textAlign: 'center' }}>Copyright Xpress Payments Limited</footer>
    </>
  );
};
