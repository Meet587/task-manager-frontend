import { Navbar, Button } from "reactstrap";
import { logout } from "../utils/auth";

function NavHeader(args) {
  return (
    <div>
      <Navbar className="flex-end">
        <Button role="link" onClick={logout}>
          Logout
        </Button>
      </Navbar>
    </div>
  );
}

export default NavHeader;
