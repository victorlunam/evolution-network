import logoSrc from "@assets/images/logo-v1.png";
import { Link } from "react-router-dom";

type BrandLogoProps = {
  to: string;
};

const BrandLogo = ({ to }: BrandLogoProps) => {
  return (
    <Link to={to}>
      <img src={logoSrc} alt="Evolution Network" height={36} />
    </Link>
  );
};

export default BrandLogo;
