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
import { useState } from "react";
import Modal from "./modal/Modal";
import Balance from "./balance/Balance";
import Transactions from "./transactions/transactions";
const Menu = ({ firstName, lastName, rating, balance }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalDetails, setModalDetails] = useState({});
  const { name, header } = modalDetails;
  const modalHandler = (e) => {
    setShowModal(true);
    console.log(e.currentTarget);
    setModalDetails({
      name: e.currentTarget.getAttribute("name"),
      header: e.currentTarget.getAttribute("header"),
    });
  };
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
        onClick={(e) => modalHandler(e)}
      />
      <nav className={classes.secondNav}>
        {/* <MenuItem
          icon={<MdCloudUpload />}
          text="თანხის გატანა"
          name="withdraw"
          onClick={(e) => modalHandler(e)}
        /> */}
        {showModal && (
          <Modal
            close={() => setShowModal(false)}
            header={header}
            name={name}
          />
        )}

        {/* <MenuItem
          icon={<GiCctvCamera />}
          name="camera"
          text="ვიდეო ჯარიმები"
          onClick={(e) => modalHandler(e)}
        /> */}
      </nav>
      <Transactions />
    </div>
  );
};

export default Menu;
