import DropdownSymbol from "../images/Vector381.png";
import CoinContext from "../context/CoinContext";
import { useContext, useState, useEffect, useReducer } from "react";
import Modal from "./Modal";
import Spinner from "./Spinner";

function MainCoinDisplayBox() {
  const { openModal, state } = useContext(CoinContext);
  const [amountEntered, setAmountEntered] = useState(0);
  const [amountUserWillGet, setAmountUserWillGet] = useState(0);

  const onChange = (e) => {
    const moneyEntered = e.target.value;
    if (moneyEntered >= 0) {
      const coinRecieved = (moneyEntered / state.price).toFixed(10) ?? 0;

      setAmountEntered(moneyEntered);
      setAmountUserWillGet(coinRecieved);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "-" || e.key === "e") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    setAmountUserWillGet((amountEntered / state.price).toFixed(10) ?? 0);
  }, [state.price]);

  if (state.isLoading) {
    return <Spinner />;
  }
  return (
    <div className="container ml-6">
      <div className="icon">
        <div className="avatar icon-pic">
          <div className="w-10 rounded-full">
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                state.selectedCoin.coinIcon
              )}`}
            />
          </div>
        </div>
      </div>

      <div>
        <span className="current-value-text ">Current Value</span>
        <div>
          <span className="coin-price">&#8377;{state.price}</span>
        </div>
      </div>
      <div className="dropdown-menu-container ml-10 mt-4" onClick={openModal}>
        <img
          className="dropdown-menu-icon"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            state.selectedCoin.coinIcon
          )}`}
        />
        <span className="dropdown-menu-name">
          {state.selectedCoin.name.toUpperCase()}
        </span>

        <img className="dropdown-menu-dropdownIcon" src={DropdownSymbol} />
      </div>
      <div className="text-above-entry-field-1">Amount you want to invest</div>

      <div className="value-entry-field-container">
        <span>
          <input
            type="number"
            placeholder="0.0"
            className="value-entry-field"
            min="0"
            value={amountEntered}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </span>
        <span className="value-entry-field-currency">INR</span>
      </div>

      <div className="text-above-entry-field-2">
        Estimate Number of {state.selectedCoin.name.toUpperCase()} You will Get
      </div>

      <input
        type="number"
        placeholder="0.0"
        readOnly
        className="value-return-field"
        value={amountUserWillGet}
      />

      <a className="btn container-btn">Buy</a>
      {state.isModalOpen && <Modal />}
    </div>
  );
}
export default MainCoinDisplayBox;
