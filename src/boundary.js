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

        /**
         * The start point of the boundary.
         * @type {p5.Vector}
         */
        this.start = start;

        /**
         * The end point of the boundary.
         * @type {p5.Vector}
         */
        this.end = end;

        /**
         * All intersections this boundary has with any other boundary in the sketch.
         * @type {p5.Vector[]}
         */
        this.intersections = [];
    }

    /**
     * Check if this boundary intersects any other boundaries in the sketch. If so, set the points of intersection.
     *
     * @param boundaries {Boundary[]}: All boundaries in the sketch.
     */
    checkIntersections(boundaries) {
        this.intersections = [];
        for (let boundary of boundaries) {
            if (this === boundary) {
                continue;
            }

            let intersection = this.intersects(boundary);
            if (intersection) {
                this.intersections.push(intersection);
            }
        }
    }

    /**
     * Check if this boundary intersects the given other boundary.
     *
     * @param boundary {Boundary}: The boundary to check.
     * @return {?p5.Vector}: If this boundary intersects the other boundary, the point at which they intersect. 'null'
     *                       otherwise.
     *
     * @see: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
     */
    intersects(boundary) {
        const denominator = (boundary.start.x - boundary.end.x) * (this.start.y - this.end.y) -
                            (boundary.start.y - boundary.end.y) * (this.start.x - this.end.x);
        if (denominator === 0) {
            // If the denominator is 0, the two boundaries are parallel to each other (or are coincident).
            return null;
        }

        const t = ((boundary.start.x - this.start.x) * (this.start.y - this.end.y) -
                  (boundary.start.y - this.start.y) * (this.start.x - this.end.x)) /
                  denominator;
        const u = -((boundary.start.x - boundary.end.x) * (boundary.start.y - this.start.y) -
                  (boundary.start.y - boundary.end.y) * (boundary.start.x - this.start.x)) /
                  denominator;
        if (0 < t && t < 1 && 0 < u && u < 1) {
            const intersection = createVector();
            intersection.x = boundary.start.x + t * (boundary.end.x - boundary.start.x);
            intersection.y = boundary.start.y + t * (boundary.end.y - boundary.start.y);
            return intersection;
        }

        return null;
    }

    /**
     * Draw this boundary.
     */
    onDraw() {
        stroke(255, 255, 255);
        line(this.start.x, this.start.y, this.end.x, this.end.y);

        for (let intersection of this.intersections) {
            strokeWeight(10);
            stroke(255, 0, 0);
            point(intersection.x, intersection.y)
        }
    }
}