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
        }
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
        for (let ray of this.rays) {
            ray.draw();
        }

        // Draw this particle as a circle.
        noStroke();
        fill(255, 255, 255);
        circle(this.position.x, this.position.y, 10);
    }
}
