class GraphEditor {
    constructor(viewport, graph){
        this.viewport = viewport;
        this.canvas = viewport.canvas;
        this.graph = graph;

        this.context = this.canvas.getContext("2d");
        this.selected = null;
        this.hovered = null;
        this.dragging = false;
        this.mouse = null;

        this.#addEventListeners();
    }
    #addEventListeners(){
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
        //tio remove left click menu
        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
        // this makes the dragg thing to return to false
        this.canvas.addEventListener("mouseup",()=> this.dragging= false);
                
    }

    #select(point){
        if (this.selected){
            this.graph.tryAddSegment(new Segment(this.selected,point));
        }
        this.selected = point;
    }

    #handleMouseDown(evt){
        if (evt.button == 2){ //right click
            if(this.selected){
                this.selected = null;
            } else if (this.hovered) {
                this.#removePoint(this.hovered);
            }
        }
        if (evt.button == 0){ //left click
            if (this.hovered){
                this.#select(this.hovered);
                this.dragging = true;
                return;
            }
            // we add the new point
            this.graph.addPoint(this.mouse);
            this.#select(this.mouse);
            this.hovered = this.mouse;
            
        }
    }
    #handleMouseMove(evt){
        this.mouse = this.viewport.getMouse(evt, true);
        this.hovered = getNearestPoint(this.mouse, this.graph.points, 12 * this.viewport.zoom);
        if (this.dragging == true){
            this.selected.x = this.mouse.x;
            this.selected.y = this.mouse.y;
        }
    }
    //this remove the selection when ever we remove the point;
    #removePoint(point){
        this.graph.removePoint(point);
        this.hovered = null;
        if (this.selected == point){
            this.selected = null;
        }
    }
    dispose(){
        this.graph.dispose();
        this.selected = null;
        this.hovered = null;
    }

    display(){
        this.graph.draw(this.context);
        if (this.hovered) {
            this.hovered.draw(this.context, {fill: true});
        }
        if (this.selected) {
            // here we make the intended segmet stick to the hovered point
            const intent = this.hovered ? this.hovered : this.mouse;
            new Segment(this.selected, this.mouse).draw(context, {dash: [3,3]});
            this.selected.draw(this.context, {outline: true});
        }
    }
}