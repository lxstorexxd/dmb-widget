// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: magic;
const ArcProgressBar = importModule('progressBar');
const EventManager = importModule('eventManager');

module.exports = class MediumWidget {
    constructor(widget, settings, progressData) {
        this.widget = widget;
        this.settings = settings;
        this.progressData = progressData;
    }

    build() {
        let stack = this.widget.addStack();
        stack.layoutHorizontally();
        stack.centerAlignContent();

        // Прогресс-бар
        const progressImage = new ArcProgressBar(this.settings).draw(this.progressData);
        let progressStack = stack.addStack();
        // progressStack.size = new Size(this.settings.screenSize - 10, this.settings.screenSize - 10);
        progressStack.addImage(progressImage);

        stack.addSpacer(16);

        // Список событий
        let eventsStack = stack.addStack();
        eventsStack.layoutVertically();

        let events = EventManager.getUpcomingEvents();
        if (events.length > 0) {
            let mainEvent = events.shift(); // Берем первое событие

            let bigText = eventsStack.addText(`${mainEvent.daysLeft} дней`);
            bigText.font = Font.boldSystemFont(22);
            bigText.textColor = Color.white();
            bigText.centerAlignText();

            let eventDate = new Date(mainEvent.date);
let dateText = eventsStack.addText(eventDate.toLocaleString("ru-RU", { day: "numeric", month: "long" }));
            dateText.font = Font.mediumSystemFont(12);
            dateText.textColor = new Color("#aaaaaa");

            let titleText = eventsStack.addText(mainEvent.title);
            titleText.font = Font.mediumSystemFont(12);
            titleText.textColor = Color.white();
            titleText.lineLimit = 1; // Ограничиваем в одну строку

            eventsStack.addSpacer(8);
        }

        // Остальные события (мелкий список)
        for (let event of events) {
            let eventText = eventsStack.addText(`${event.daysLeft} — ${event.title}`);
            eventText.font = Font.systemFont(12);
            eventText.textColor = Color.white();
            eventText.lineLimit = 1;
            eventsStack.addSpacer(2);
        }
    }
};