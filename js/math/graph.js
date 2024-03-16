//this is my graphing script
// spatial graph

class Graph{
    constructor(points = [], segments = []){
        this.points = points;
        this.segments = segments;
    }
    //function to add points
    addPoint(point){
        this.points.push(point);
    }
    //funtion to check if point already exists
    containsPoint(point){
        return this.points.find((p) => p.equals(point));
    }
    draw(context){
        for(const seg of this.segments){
            seg.draw(context);
        }
        for (const point of this.points){
            point.draw(context);
        }
    }
}