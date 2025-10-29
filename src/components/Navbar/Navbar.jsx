import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Logo from "..//Logo/Logo";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <Logo />
      </Link>
      <Search placeholder="Search a song of your choice" />
      {/* <Button
        style={{
          backgroundColor: "black",
          color: "#90EE90", // Light green
          border: "none",
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
      >
        Give Feedback
      </Button> */}
      <Button
  style={{
    backgroundColor: "black",
    color: "#90EE90",
    border: "none",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    fontFamily: "'Poppins', sans-serif", // Explicitly set
  }}
>
  Give Feedback
</Button>
    </nav>
  );
}

export default Navbar;
