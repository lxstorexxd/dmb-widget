// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: magic;
const ArcProgressBar = importModule('progressBar');

module.exports = class SmallWidget {
    constructor(widget, settings, progressData) {
        this.widget = widget;
        this.settings = settings;
        this.progressData = progressData;
    }

    build() {
        const progressImage = new ArcProgressBar(this.settings).draw(this.progressData);
        this.widget.addImage(progressImage).centerAlignImage();
    }
};