// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
const settings = importModule('settings');
const EventManager = importModule('eventManager');
const SmallWidget = importModule('smallWidget');
const MediumWidget = importModule('mediumWidget');


class DateHelper {
    static isValidDate(param) {
        if (!param) return false;
        if (!/^\d{2}\.\d{2}\.\d{4}$/.test(param)) return false;
        return !isNaN(this.parseDate(param).getTime());
    }

    static getDaysLeft(targetDate) {
        return Math.ceil((targetDate - new Date()) / 86400000);
    }

    static getDaysPassed(targetDate) {
        let pastDate = new Date(targetDate);
        pastDate.setFullYear(pastDate.getFullYear() - 1);
        return Math.ceil((new Date() - pastDate) / 86400000);
    }

    static parseDate(dateString) {
        const [day, month, year] = dateString.split(".").map(Number);
        return new Date(year, month - 1, day);
    }

    static percentToTarget(targetDate) {
        const totalDays = this.getDaysLeft(targetDate) + this.getDaysPassed(targetDate);
        return totalDays ? Math.round((this.getDaysPassed(targetDate) / totalDays) * 100) : 0;
    }
}


class DemobCounterWidget {
    constructor() {
        this.widget = new ListWidget();
        this._setBackground();
    }

    _setBackground() {
        const gradient = new LinearGradient();
        gradient.colors = [new Color("#191b1b"), new Color("#2d2e2f")];
        gradient.locations = [0, 0.61, 1];
        this.widget.backgroundGradient = gradient;
    }

    async create() {
        const widgetSize = config.widgetFamily || "small";
        const setting = settings[widgetSize];
        this.widget.setPadding(...setting.padding);

        const param = args.widgetParameter;
        if (!DateHelper.isValidDate(param)) {
            return this._showError(setting.fontSize);
        }

        const targetDate = DateHelper.parseDate(param);
        const progressData = {
            daysLeft: DateHelper.getDaysLeft(targetDate),
            daysPassed: DateHelper.getDaysPassed(targetDate),
            percentage: DateHelper.percentToTarget(targetDate)
        };

        let widgetClass;
        switch (widgetSize) {
            case "medium":
                widgetClass = new MediumWidget(this.widget, setting, progressData);
                break;
            case "accessoryCircular":
                break;
            case "accessoryRectangular":
                break;
            default:
                widgetClass = new SmallWidget(this.widget, setting, progressData);
        }

        widgetClass.build();
        return this.widget;
    }

    _showError(fontSize) {
        const errorText = this.widget.addText("Введите дату дембеля (ДД.ММ.ГГГГ)");
        errorText.textColor = Color.white();
        errorText.font = Font.boldSystemFont(fontSize);
        errorText.centerAlignText();
        return this.widget;
    }
}


// Запуск виджета
const widget = await new DemobCounterWidget().create();

if (config.runsInWidget) {
    Script.setWidget(widget);
} else {
    await widget.presentSmall();
}

Script.complete();