import React, { Fragment, useState } from "react";
import { HamburgerSpring } from "react-animated-burgers";

export default function Hamburger() {
  const [isActive, setIsActive] = useState(false);
  return (
    <Fragment>
      <HamburgerSpring
        isActive={isActive}
        toggleButton={() => setIsActive(isActive ? false : true)}
        buttonWidth={30}
        barColor="white"
      />
    </Fragment>
  );
}
