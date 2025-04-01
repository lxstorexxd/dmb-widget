// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: magic;
module.exports = class ArcProgressBar {
    constructor(settings) {
        this.size = settings.screenSize;
        this.thickness = settings.thickness;
        this.fontSize = settings.fontSize;
        this.canvas = new DrawContext();
        this.canvas.opaque = false;
        this.canvas.size = new Size(this.size, this.size);
        this.canvas.respectScreenScale = true;
    }

    draw({ daysPassed, daysLeft, percentage }) {
        const center = new Point(this.size / 2, this.size / 2);
        const radius = this.size / 2 - this.thickness / 2;

        this._drawCircle("#00382c", radius);
        this._drawProgressArc("#24ffd7", radius, percentage);
        this._drawText(center, daysPassed, daysLeft, percentage);

        return this.canvas.getImage();
    }

    _drawCircle(color, radius) {
        this.canvas.setStrokeColor(new Color(color));
        this.canvas.setLineWidth(this.thickness);
        this.canvas.strokeEllipse(new Rect(
            this.size / 2 - radius, this.size / 2 - radius,
            radius * 2, radius * 2
        ));
    }

    _drawProgressArc(color, radius, percentage) {
        this.canvas.setFillColor(new Color(color));
        for (let angle = -90; angle < -90 + percentage * 3.6; angle += 1.5) {
            let x = this.size / 2 + radius * Math.cos(angle * Math.PI / 180);
            let y = this.size / 2 + radius * Math.sin(angle * Math.PI / 180);
            this.canvas.fillEllipse(new Rect(x - this.thickness / 2, y - this.thickness / 2, this.thickness, this.thickness));
        }
    }
    
    _drawText(center, daysPassed, daysLeft, percentage) {
        this._drawCenteredText(`${daysPassed} | ${daysLeft}`, center.y - 15, this.fontSize + 4, "#ffffff");
        this._drawCenteredText(`${percentage}%`, center.y + 15, this.fontSize, "#aaaaaa");
    }

    _drawCenteredText(text, y, size, color) {
        this.canvas.setFont(Font.boldSystemFont(size));
        this.canvas.setTextColor(new Color(color));
        this.canvas.setTextAlignedCenter();
        this.canvas.drawTextInRect(text, new Rect(0, y, this.size, 30));
    }
};