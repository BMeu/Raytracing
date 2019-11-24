/**
 * A boundary for all rays.
 */
class Boundary extends Drawable {

    /**
     * Create a new boundary between the given points.
     *
     * @param start {p5.Vector}: 2D vector defining the start point of the boundary.
     * @param end {p5.Vector}: 2D vector defining the end point of the boundary.
     */
    constructor(start, end) {
        super();

        this.start = start;
        this.end = end;
    }

    /**
     * Draw this boundary.
     */
    onDraw() {
        stroke(255, 255, 255);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }
}