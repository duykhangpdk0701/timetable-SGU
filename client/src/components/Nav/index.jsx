import React from "react";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Nav.module.scss";

const Nav = (props) => {
  const { handleChangeTabValue, tabValue, handleLogout } = props;
  const info = useSelector((state) => state.auth.current);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo_container}>
        <Typography variant="h6">
          <Link to="/timetable" className={styles.link}>
            Timetable
          </Link>
        </Typography>
      </div>
      <div className={styles.tab_container}>
        <Tabs value={tabValue} onChange={handleChangeTabValue}>
          <Tab label="Week" value="1" />
          <Tab label="Day" value="2" />
        </Tabs>
      </div>
      <div className={styles.name_container}>
        <Button
          onClick={handleLogout}
          sx={{ marginRight: 2 }}
          variant="outlined">
          Đăng xuất
        </Button>
        <Typography variant="h6">{info.name}</Typography>
      </div>
    </nav>
  );
};

export default Nav;
