import PanelButton from "../PanelButton";
import options from "options";
import nix from "service/nix";

const hyprland = await Service.import("hyprland");

const { icon, label, action } = options.bar.launcher;

const Spinner = () => Widget.Icon({
    icon: icon.icon.bind(),
    class_name: icon.colored.bind().as(c => `${c ? "colored" : ""}`),
  });

const WindowTitle = () =>
  Widget.Label({
    class_name: "window-title",
    visible: hyprland.active.client
      .bind("class")
      .as((addr) => !!addr),
    max_width_chars: 20,
    truncate: "end",
    label: hyprland.active.client.bind("class"),
    tooltip_text: hyprland.active.client.bind("title"),
  });

export default () =>
  PanelButton({
    window: "launcher",
    child: Spinner(),
  });
