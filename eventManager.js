// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: magic;
module.exports = {
    getUpcomingEvents() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const events = [
            { date: "2025-04-08", title: "Осталась четверть службы" },
            { date: "2025-05-05", title: "300 дней после призива" },
            { date: "2025-05-19", title: "Водку в холодильник" },
            { date: "2025-06-01", title: "Лето" },
            { date: "2025-07-09", title: "Дембель" },
        ];

        return events
            .map(event => {
                const eventDate = new Date(event.date);
                const daysLeft = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
                return { ...event, daysLeft };
            })
            .filter(event => event.daysLeft > 0)
            .sort((a, b) => a.daysLeft - b.daysLeft); // Сортируем по возрастанию
    }
};