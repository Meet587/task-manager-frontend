import { Button } from "reactstrap";
import { logout } from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

function NavHeader(args) {
  return (
    <>
      <nav className="d-flex justify-content-end mb-4 mt-1">
        <Button color="danger" onClick={logout}>
          <FontAwesomeIcon icon={faPowerOff} />
        </Button>
      </nav>
    </>
  );
}

export default NavHeader;
