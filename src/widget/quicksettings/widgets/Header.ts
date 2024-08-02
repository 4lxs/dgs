import icons from "lib/icons"
import { uptime } from "lib/variables"
import options from "options"

const { sleep, reboot, logout, shutdown } = options.powermenu

const battery = await Service.import("battery")
const { image, size } = options.quicksettings.avatar

function up(up: number) {
    const h = Math.floor(up / 60)
    const m = Math.floor(up % 60)
    return `${h}h ${m < 10 ? "0" + m : m}m`
}

const Avatar = () => Widget.Box({
    class_name: "avatar",
    css: Utils.merge([image.bind(), size.bind()], (img, size) => `
        min-width: ${size}px;
        min-height: ${size}px;
        background-image: url('${img}');
        background-size: cover;
    `),
})

const ConfirmButton = ({ setup, on_clicked, ...rest }) => Widget.Button({
    on_clicked: (self) => {
        const context = self.get_style_context();
        if (context.has_class('activated')) {
            on_clicked()
            context.remove_class('activated');
        } else {
            context.add_class('activated');
        }
    },
    ...rest,
    setup: (self) => {
        if (setup) {
            setup(self);
        }

        self.connect('focus-out-event', () => {
            const context = self.get_style_context();
            context.remove_class('activated');
        })
    } 
})

const SysButton = (action: Action) => ConfirmButton({
    vpack: "center",
    child: Widget.Icon(icons.powermenu[action]),
    on_clicked: () => {
        const cmd = {
            sleep: sleep.value,
            reboot: reboot.value,
            logout: logout.value,
            shutdown: shutdown.value,
        }[action]

        Utils.exec(cmd)
    }
})

export const Header = () => Widget.Box(
    { class_name: "header horizontal" },
    Widget.Button({
        vpack: "center",
        child: Widget.Icon(icons.ui.settings),
        on_clicked: () => {
            App.closeWindow("quicksettings")
            App.closeWindow("settings-dialog")
            App.openWindow("settings-dialog")
        },
    }),
    Widget.Box({ hexpand: true }),
    SysButton("sleep"),
    SysButton("reboot"),
    SysButton("logout"),
    SysButton("shutdown"),
)
