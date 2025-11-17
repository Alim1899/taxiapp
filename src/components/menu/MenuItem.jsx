import classes from "./Menu.module.css";
const MenuItem = ({ icon, text, notif, onClick, name }) => {
  return (
    <div className={classes.icon} name={name} header={text} onClick={onClick}>
      {icon}
      {notif > 0 && <div className={classes.notif}>{notif}</div>}
      <h3>{text}</h3>
    </div>
  );
};

export default MenuItem;
