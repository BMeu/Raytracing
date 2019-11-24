/**
 * List of all boundaries in the sketch.
 * @type {Boundary[]}
 */
let walls = [];

/**
 * Prepare the sketch.
 */
function setup() {
    createCanvas(windowWidth, windowHeight);

    createWalls(5);
}

/**
 * Update the state of the sketch and draw it.
 */
function draw() {
    background(0, 0, 0);

    onUpdate();
    onDraw();
}

/**
 * Update the state of the sketch.
 */
function onUpdate() {
}

/**
 * Draw the current state of the sketch.
 */
function onDraw() {
    // Draw the walls.
    for (let wall of walls) {
        wall.draw();
    }
}

/**
 * Create walls as boundaries for the rays.
 *
 * Create the given amount of walls at random locations within the sketch. Additionally, create walls around canvas.
 *
 * @param amount {number}: The number of walls to create.
 */
function createWalls(amount) {
    // Create the walls within the sketch.
    for (let i = 0; i < amount; i++) {
        let start = createVector(random(width), random(height));
        let end = createVector(random(width), random(height));
        walls.push(new Boundary(start, end))
    }

    // Create the outer walls of the sketch.
    walls.push(new Boundary(createVector(0, 0), createVector(width, 0)));
    walls.push(new Boundary(createVector(width, 0), createVector(width, height)));
    walls.push(new Boundary(createVector(width, height), createVector(width, 0)));
    walls.push(new Boundary(createVector(0, height), createVector(0, 0)));
}
