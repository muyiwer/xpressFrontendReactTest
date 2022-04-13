export const Page: React.FC = (props) => {
  return (
      <>
    <section>
      <h1 style={{ textAlign: "center" }}>Xpress APPs</h1>
      <h2>XpressPay</h2>
      <form>
        <label>Transaction Type</label>
        <br />
        <select>
          <option>Deposit</option>
          <option>Withdrawal</option>
        </select>
        <br />
        <br />
        <label>Card Number </label>
        <br />
        <input />
        <br /> <br />
        <label>CVV</label>
        <br />
        <input />
        <br />
        <br />
        <label>Pin</label>
        <br />
        <input />
        <br /> <br />
        <label>Amount</label>
        <br />
        <input />
        <br /> <br />
        <button>Pay</button>
      </form>
      <h2>Xpress Wallet</h2>
      <main>
      <p><span>Wallet Balance</span> : <span>0.00</span></p>
      <p><span>Name</span> : <span>Olumuyiwa Aro</span></p>
      <table>
          <thead>
              <th>S/N</th>
              <th>TransactionType</th>
              <th>Amount</th>
          </thead>
          <tbody>
                <tr>
                    <td>1</td>
                    <td>Withdrawal</td>
                    <td>0.00</td>
                </tr>
          </tbody>
      </table>
      <p><span>Total: </span> <span>0.00</span></p>
      </main>
    </section>
    <footer style={{textAlign:'center'}}>Copyright Xpress Payments Limited</footer>
    </>
  );
};
