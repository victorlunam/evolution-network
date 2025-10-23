// import logoSrc from "@assets/images/logo-v1.png";
import logoSrc from "@assets/brand.png";
import { Link } from "react-router-dom";

type BrandLogoProps = {
  to: string;
};

const BrandLogo = ({ to }: BrandLogoProps) => {
  return (
    <Link to={to} style={{
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     gap: '1rem'
    }}>
      <img src={logoSrc} alt="Evolution Network" height={36} /> Agent Referral System
    </Link>
  );
};

export default BrandLogo;
