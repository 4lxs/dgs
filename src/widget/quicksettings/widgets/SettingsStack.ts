import { Media } from "./Media";
import { SinkSelector, AppMixer } from "./Volume"
import Notifications from "../../datemenu/NotificationColumn"
import Calendar from "../../datemenu/DateColumn"

import icons from "lib/icons";

const layout = [
  {
    icon: "x-office-calendar",
    name: "calendar",
    widget: Calendar(),
  },
  {
    icon: icons.notifications.message,
    name: "notifications",
    widget: Notifications(),
  },
  {
    icon: icons.audio.type.card,
    name: "media",
    widget: Media(),
    // Widget.Box({
    //   visible: media.as((l) => l.length > 0),
    //   child: Media(),
    // }),
  },
];

const current = Variable(layout[0].name);

const Header = () =>
  Widget.Box({
    class_name: "header",
    children: layout.map(({ name, icon }) =>
      Widget.Button({
        vpack: "center",
        hexpand: true,
        class_name: current.bind().as((v) => (v === name ? "active" : "")),
        on_clicked: () => (current.value = name),
        child: Widget.Icon(icon),
      }),
    ),
  });

const Stack = () =>
  Widget.Stack({
    transition: "slide_left_right",
    children: layout.reduce(
      (obj, { name, widget }) => ({ ...obj, [name]: widget }),
      {},
    ),
    shown: current.bind() as never,
  });

export const SettingsStack = () =>
  Widget.Box({
    vertical: true,
    class_name: "settings-stack vertical",
    children: [Header(), Stack()],
  });
