import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function PageButtons() {
  const [pages, setPages] = useState(1);
  function loadButtons() {
    if (pages == 1) {
      return (
        <ul>
          <Link to={`/${pages + 1}`}>
            <li>Next &raquo;</li>
          </Link>
        </ul>
      );
    }
  }

  return (
    <div className="PageButtons">
      <nav></nav>
    </div>
  );
}

export default PageButtons;
