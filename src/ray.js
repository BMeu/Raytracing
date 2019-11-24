/**
 * A single rays cast from its position into a specific direction.
 */
class Ray extends Drawable {

    /**
     * Create a new ray.
     *
     * @param origin {p5.Vector} The position from which this ray originates.
     * @param angle {number}: The angle in radians into which the ray is cast.
     */
    constructor(origin, angle) {
        super();

        /**
         * The origin of this ray.
         * @type {p5.Vector}
         */
        this.origin = origin;

        /**
         * The direction into which the ray is cast.
         * @type {p5.Vector}
         */
        this.direction = p5.Vector.fromAngle(angle);

        /**
         * The point onto which this ray is cast.
         * @type {?p5.Vector}
         */
        this.castPoint = null;
    }

    /**
     * Update the state of this ray.
     *
     * @param origin {p5.Vector}: The new origin of the ray if it has moved.
     * @param boundaries {Boundary[]}: All boundaries in the sketch to check at which the ray is cast.
     */
    update(origin, boundaries) {
        // Update the origin.
        this.origin = origin;

        // Find the point at which this ray is cast.
        this.castPoint = null;
        let minimalDistance = Infinity;
        for (let boundary of boundaries) {
            const point = this.cast(boundary);

            // If the ray is cast onto the current wall, check if this wall is the closest wall to the origin of the ray.
            if (point != null) {
                const distance = p5.Vector.dist(this.origin, point);
                if (distance < minimalDistance) {
                    minimalDistance = distance;
                    this.castPoint = point;
                }
            }
        }
    }

    /**
     * Cast this ray at the given boundary. If they intersect, return their intersection point.
     *
     * @param boundary {Boundary}: The boundary at which the ray will be cast.
     * @return {?p5.Vector}: If the ray intersects the boundary, the point at which they intersect. 'null' otherwise.
     *
     * @see: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
     */
    cast(boundary) {
        const denominator = (boundary.start.x - boundary.end.x) * -this.direction.y - (boundary.start.y - boundary.end.y) * -this.direction.x;
        if (denominator === 0) {
            // If the denominator is 0, the ray and the boundary are parallel to each other (or are coincident).
            return null;
        }

        const t = ((boundary.start.x - this.origin.x) * -this.direction.y - (boundary.start.y - this.origin.y) * -this.direction.x) / denominator;
        const u = -((boundary.start.x - boundary.end.x) * (boundary.start.y - this.origin.y) - (boundary.start.y - boundary.end.y) * (boundary.start.x - this.origin.x)) / denominator;
        if (0 < t && t < 1 && u > 0) {
            // If t is between 0 and 1 and u is greater than 0, the ray intersects the boundary.
            const intersection = createVector();
            intersection.x = boundary.start.x + t * (boundary.end.x - boundary.start.x);
            intersection.y = boundary.start.y + t * (boundary.end.y - boundary.start.y);
            return intersection;
        }

        return null;
    }

    /**
     * Draw this ray if it is cast on a boundary.
     */
    onDraw() {
        if (this.castPoint === null) {
            return;
        }

        stroke(255, 255, 255, 100);
        line(this.origin.x, this.origin.y, this.castPoint.x, this.castPoint.y);
    }
}
