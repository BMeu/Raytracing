/**
 * Drawable is an abstract base class for all objects that can be rendered in the sketch.
 */
class Drawable {

    /**
     * Update the state of this drawable object.
     */
    update() {}

    /**
     * Draw this object on the screen, within its own style context.
     *
     * Do not override this method as it saves and restores the current drawing style to give each drawable object a
     * clean style. Use 'onDraw()' instead for implementing the actual drawing of this object.
     */
    draw() {
        push();
        this.onDraw();
        pop();
    }

    /**
     * Draw this object on the screen.
     *
     * Called by 'draw()'. Implement the drawing logic in this method instead of in 'draw()'.
     */
    onDraw() {}
}
