import {
  MdCarRental,
  MdCloudUpload,
  MdCloudDownload,
  MdSend,
} from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbZoomMoney } from "react-icons/tb";
import Withdraw from "../amount/withdraw/Withdraw";
import { FaStar, FaPlus } from "react-icons/fa";
import { GiCctvCamera } from "react-icons/gi";
import classes from "./Menu.module.css";
import MenuItem from "./MenuItem";
import { useState } from "react";
import Modal from "./modal/Modal";
const Menu = ({ balance }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalDetails, setModalDetails] = useState({});
  const { name, header } = modalDetails;

  const modalHandler = (e) => {
    setShowModal(true);
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
          text="რეფერალები"
          onClick={(e) => modalHandler(e)}
        />
        <MenuItem
          notif={1}
          name="app"
          icon={<MdCloudDownload />}
          text="აპლიკაცია"
          onClick={(e) => modalHandler(e)}
        />
        <MenuItem
          name="bonus"
          icon={<TbZoomMoney />}
          text="ბონუსები"
          onClick={(e) => modalHandler(e)}
        />
        <MenuItem
          name="rent"
          icon={<MdCarRental />}
          text="დაქირავება"
          onClick={(e) => modalHandler(e)}
        />
      </nav>
      <div className={classes.balance}>
        <h3 className={classes.driver}>
          Mamuka G. <FaStar className={classes.star} />
          5.0
        </h3>

        <h1>
          ჩემი ბალანსი:<br></br>
          {balance}
        </h1>
      </div>
      <nav className={classes.secondNav}>
        <MenuItem
          icon={<MdCloudUpload />}
          text="თანხის გატანა"
          name="withdraw"
          onClick={(e) => modalHandler(e)}
        />
        {showModal && (
          <Modal
            close={() => setShowModal(false)}
            header={header}
            name={name}
          />
        )}
        <MenuItem
          icon={<MdSend />}
          name="send"
          text="სხვასთან გადარიცხვა"
          onClick={(e) => modalHandler(e)}
        />
        <MenuItem
          icon={<FaPlus />}
          name="balance"
          text="ბალანსის შევსება"
          onClick={(e) => modalHandler(e)}
        />
        <MenuItem
          icon={<GiCctvCamera />}
          name="camera"
          text="ვიდეო ჯარიმები"
          onClick={(e) => modalHandler(e)}
        />
      </nav>
    </div>
  );
};

export default Menu;
