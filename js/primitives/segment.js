class Segment{
    constructor(p1, p2){
        this.p1 = p1;
        this.p2 = p2;
    }

    draw(context , width = 2, color = "black"){
        context.beginPath();
        context.lineWidth = width;
        context.strokeStyle = color;
        context.moveTo(this.p1.x,this.p1.y);
        context.lineTo(this.p2.x,this.p2.y);
        context.stroke();
    }
}