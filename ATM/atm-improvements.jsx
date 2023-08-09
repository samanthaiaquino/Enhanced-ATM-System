const ATMDeposit = ({ onChange, isDeposit, isValid, value }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  
  const inputValue = value !== 0 ? value : '';

  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input
        id="number-input"
        type="number"
        width="200"
        onChange={onChange}
        disabled={!isValid}
        value={inputValue}
      ></input>
      <input
        type="submit"
        width="200"
        value="Submit"
        id="submit-input"
        disabled={!isValid || (isDeposit ? value <= 0 : false)}
      ></input>
      {!isValid && (
        <p className="error-message">Invalid transaction. Please enter a valid amount.</p>
      )}
    </label>
  );
};


const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(true);

  let status = `Account Balance $ ${totalState}`;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const cashBackLimit = totalState; // Set cashBackLimit to totalState

  const handleChange = (event) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= 0) {
      setDeposit(value);
      if (atmMode === "Cash Back" && value > cashBackLimit) {
        setValidTransaction(false);
      } else {
        setValidTransaction(true);
      }
    } else {
      setValidTransaction(false);
    }
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setDeposit(0); // Clear the input field after the transaction
    setValidTransaction(true); // Set validTransaction to true after a successful transaction
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    const selectedMode = event.target.value;
    setAtmMode(selectedMode);
    setIsDeposit(selectedMode === "Deposit");
    setValidTransaction(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={handleModeSelect} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">
          Deposit
        </option>
        <option id="cashback-selection" value="Cash Back">
          Cash Back
        </option>
      </select>
      {atmMode !== "" && (
        <ATMDeposit
          onChange={handleChange}
          isDeposit={isDeposit}
          isValid={validTransaction}
          value={deposit}
        />
      )}
    </form>
  );
};

// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));


