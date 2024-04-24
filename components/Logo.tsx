import React from "react";
import logo from "@/public/platven_logo.png";
import Image from "next/image";

type Props = {
  size?: number;
};

const Logo: React.FC<Props> = ({ size = 80 }) => {
  return (
    <div>
      <Image
        className="dark:hidden"
        src={logo}
        alt="The hive logo"
        width={size}
        height={size}
      />
    </div>
  );
};

export default Logo;
