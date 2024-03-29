/**
 * A particle is an object that emits rays into all directions.
 */
class Particle extends Drawable {

    /**
     * Create a new particle.
     * @param position {p5.Vector}: The initial position of the particle.
     */
    constructor(position) {
        super();

        /**
         * The current position of the particle.
         * @type {p5.Vector}
         */
        this.position = position;

        /**
         * The rays emitted by the particles.
         * @type {Ray[]}
         */
        this.rays = [];
    }

    /**
     * Update the state of this particle.
     *
     * @param boundaries {Boundary[]}: All boundaries in the sketch to check at which the particle emits its rays.
     */
    update(boundaries) {
        this.position = createVector(mouseX, mouseY);

        this.createRays(boundaries);

        for (let ray of this.rays) {
            ray.update(this.position, boundaries);
        }
    }

    /**
     * Create the rays emitted by this particle.
     *
     * @param (boundaries {Boundary[]}: All boundaries in the sketch to check at which the particle emits its rays.
     */
    createRays(boundaries) {
        this.rays = [];
        for (let boundary of boundaries) {
            this.createRayTowardsTarget(boundary.start);
            this.createRayTowardsTarget(boundary.end);

            for (let intersection of boundary.intersections) {
                this.createRayTowardsTarget(intersection);
            }
        }

        // Sort the rays by their angle so we can correctly draw the shape that is enlightened by the rays.
        this.rays.sort((ray1, ray2) => {
            return ray1.angle - ray2.angle;
        });
    }

    /**
     * Cast a ray towards the target and two additional rays slightly to each side of the target to account for
     * potential boundaries behind the target.
     *
     * @param target {p5.Vector}: The target towards which the newly created ray will be cast.
     */
    createRayTowardsTarget(target) {
        let direction = p5.Vector.sub(target, this.position);
        let angle = direction.heading();

        // Create one ray to each side of the target to hit boundaries behind the target.
        let offset = 0.00001;
        this.rays.push(new Ray(this.position, angle - offset));
        this.rays.push(new Ray(this.position, angle));
        this.rays.push(new Ray(this.position, angle + offset));
    }

    /**
     * Draw this particle.
     */
    onDraw() {
        // Draw the area enlightened by the rays.
        beginShape();
        fill(238, 234, 98);
        for (let ray of this.rays) {
            ray.draw();
        }
        endShape(CLOSE);
    }
}
