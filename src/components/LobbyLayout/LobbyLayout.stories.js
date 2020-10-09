import React from "react";
import LobbyLayout from "./LobbyLayout";

export default {
  title: "Components/LobbyLayout",
  component: LobbyLayout,
};

const Template = (args) => <LobbyLayout {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
