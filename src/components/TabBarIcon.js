import React from "react";
import PropTypes from "prop-types";
import { Icon } from "expo";

import Colors from "../constants/Colors";

const TabBarIcon = props => {
  const { name, focused } = props;
  return (
    <Icon.Ionicons
      name={name}
      size={32}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
};

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired
};

export default TabBarIcon;
