import { Link } from "react-router-dom";
import styled from "styled-components";

import logoIcon from "/logo.svg";

const LogoImg = styled.img`
  height: 36px;
  width: auto;
`;

export default function Logo() {
  return (
    <Link to={"/"}>
      <LogoImg src={logoIcon} alt="Logo Icon" />
    </Link>
  );
}
