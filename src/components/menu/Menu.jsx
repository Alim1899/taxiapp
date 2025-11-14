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
const Menu = ({ balance }) => {
  return (
    <div className={classes.menu}>
      <nav className={classes.firstNav}>
        <MenuItem
          icon={<FaPeopleGroup className={classes.svg} />}
          text="რეფერალები"
        />
        <MenuItem notif={1} icon={<MdCloudDownload />} text="აპლიკაცია" />
        <MenuItem icon={<TbZoomMoney />} text="ბონუსები" />
        <MenuItem icon={<MdCarRental />} text="დაქირავება" />
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
        <MenuItem icon={<MdCloudUpload />} text="თანხის გატანა" />
        <MenuItem icon={<MdSend />} text="სხვასთან გადარიცხვა" />
        <MenuItem icon={<FaPlus />} text="ბალანსის შევსება" />
        <MenuItem icon={<GiCctvCamera />} text="ვიდეო ჯარიმები" />
      </nav>
    </div>
  );
};

export default Menu;
