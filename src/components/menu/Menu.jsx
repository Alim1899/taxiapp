import {
  MdCarRental,
  MdCloudUpload,
  MdCloudDownload,
  MdSend,
} from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbZoomMoney } from "react-icons/tb";
import { FaStar, FaPlus } from "react-icons/fa";
import { GiCctvCamera } from "react-icons/gi";
import classes from "./Menu.module.css";
import MenuItem from "./MenuItem";
import { useMemo, useState } from "react";
import Modal from "./modal/Modal";
import Balance from "./balance/Balance";
import Transactions from "./transactions/transactions";
import { getWithdrawCooldown } from "../Hooks/useWithdrawCooldown";
import { useTransactions } from "../Hooks/useTransactions";
import useAuth from "../context/AuthContext/useAuth";
const Menu = ({ firstName, lastName, rating, balance }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalDetails, setModalDetails] = useState({});
  const [cooldownKey, setCooldownKey] = useState(0);
  const { name, header } = modalDetails;
  const modalHandler = (e) => {
    setShowModal(true);
    setModalDetails({
      name: e.currentTarget.getAttribute("name"),
      header: e.currentTarget.getAttribute("header"),
    });
  };

  const { state } = useAuth();
  const { token } = state; // 👈 token not data
  const { data } = useTransactions(token);
  const transactions = useMemo(
    () => data?.pages.flatMap((p) => p.data ?? p) ?? [],
    [data],
  );
  const { isOnCooldown, remainingTime } = useMemo(
    () => getWithdrawCooldown(transactions),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactions, cooldownKey],
  );
console.log(transactions);
  return (
    <div className={classes.menu}>
      <nav className={classes.firstNav}>
        <MenuItem
          icon={<FaPeopleGroup className={classes.svg} />}
          name="refs"
          text=""
          onClick={(e) => modalHandler(e)}
        />
        <MenuItem
          notif={1}
          name="app"
          icon={<MdCloudDownload />}
          text=""
          onClick={(e) => modalHandler(e)}
        />
        <MenuItem
          name="bonus"
          icon={<TbZoomMoney />}
          text=""
          onClick={(e) => modalHandler(e)}
        />
        <MenuItem
          name="rent"
          icon={<MdCarRental />}
          text=""
          onClick={(e) => modalHandler(e)}
        />
      </nav>
      <Balance
        balance={balance}
        lastName={lastName}
        firstName={firstName}
        rating={rating}
        text="თანხის გატანა"
        name="withdraw"
        onClick={(e) => !isOnCooldown && modalHandler(e)}
        isOnCooldown={isOnCooldown}
        remainingTime={remainingTime?.minutes}
        onRefresh={() => setCooldownKey((prev) => prev + 1)}
      />
      <nav className={classes.secondNav}>
        {showModal && (
          <Modal
            close={() => setShowModal(false)}
            header={header}
            name={name}
          />
        )}
      </nav>
      <Transactions />
    </div>
  );
};

export default Menu;
