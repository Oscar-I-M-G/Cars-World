//this is my graphing script
// spatial graph

class Graph{
    constructor(points = [], segments = []){
        this.points = points;
        this.segments = segments;
    }

    // Point Section
    // -------------------------------------------------
    //function to add points
    addPoint(point){
        this.points.push(point);
    }
    //funtion to check if point already exists
    containsPoint(point){
        return this.points.find((p) => p.equals(point));
    }

    tryAddPoint(point){
        if (!this.containsPoint(point)){
            this.addPoint(point);
            return true;
        }
        return false;
    }
    removePoint(point){
        const segs = this.getSegmentWithPoint(point);
        for (const seg of segs){
            this.removeSegment(seg);
        }
        this.points.splice(this.points.indexOf(point),1);
        
    }


    // converts the info into objects to load it into the graph
    static load(info){
        const points = info.points.map((i) => new Point(i.x, i.y));
        const segments = info.segments.map((i) => new Segment(
            points.find((p)=> p.equals(i.p1)),
            points.find((p) => p.equals(i.p2))
            ));
        return new Graph(points, segments);
    }

// Segment section
// ----------------------------------------------------------
    containsSegment(seg){
        return this.segments.find((s) => s.equals(seg));
    }
    addSegment(seg){
        this.segments.push(seg);
    }
    tryAddSegment(seg){
        if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)){
            this.addSegment(seg);
            return true;
        }
        return false;
    }
    removeSegment(seg){
        this.segments.splice(this.segments.indexOf(seg), 1);
    }

    getSegmentWithPoint(point){
        const segs = [];
        for (const seg of this.segments){
            if (seg.includes(point)){
                segs.push(seg);
            }
        }
        return segs;
    }
    
    // to delete the whole canvas
    dispose(){
        this.points.length = 0;
        this.segments.length = 0;
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