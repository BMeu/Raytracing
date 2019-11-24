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

        this.createRays();
    }

    /**
     * Update the state of this particle.
     *
     * @param boundaries {Boundary[]}: All boundaries in the sketch to check at which the particle emits its rays.
     */
    update(boundaries) {
        for (let ray of this.rays) {
            ray.update(boundaries);
        }
    }

    /**
     * Create the rays emitted by this particle.
     */
    createRays() {
        for (let angle = 0; angle < 360; angle += 1) {
            this.rays.push(new Ray(this.position, radians(angle)));
        }
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
