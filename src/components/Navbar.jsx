import { Navbar, Button } from "reactstrap";
import { logout } from "../utils/auth";

function NavHeader(args) {
  return (
    <>
      <nav className="d-flex justify-content-end">
        <Button role="link" onClick={logout}>
          Logout
        </Button>
      </nav>
    </>
  );
}

export default NavHeader;
