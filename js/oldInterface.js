function addRandomPoint(){
    const success = graph.tryAddPoint(
        new Point(
            Math.random() * myCanvas.width,
            Math.random() * myCanvas.height
        )
    );
    context.clearRect(0,0,myCanvas.width,myCanvas.height);
    graph.draw(context);
    console.log(success);
}

function removeRandomPoint(){
    if(graph.points.length == 0){
        console.log("No more points to remove");
        return ;
    }
    const index = Math.floor(Math.random() * graph.points.length);
    graph.removePoint(graph.points[index]);
    context.clearRect(0,0,myCanvas.width,myCanvas.height);
    graph.draw(context);
}

function addRandomSegment(){
    //added a clause to check if we have enough points
    if (graph.points.length > 1){
        const index1 = Math.floor(Math.random() * graph.points.length);
        const index2 = Math.floor(Math.random() * graph.points.length);
        const  success = graph.tryAddSegment(
                new Segment(graph.points[index1],graph.points[index2])
            );
        context.clearRect(0,0,myCanvas.width,myCanvas.height);
        graph.draw(context);
        console.log(success);
    }else{
        console.log("No enough points found");
    }

}

function removeRandomSegment(){
    if (graph.segments.length == 0){
        console.log("no segments");
        return;
    }
    const index = Math.floor(Math.random() * graph.segments.length);
    graph.removeSegment(graph.segments[index]);
    context.clearRect(0,0,myCanvas.width,myCanvas.height);
    graph.draw(context);
}

function removeAll(){
    graph.dispose();
    context.clearRect(0,0,myCanvas.width,myCanvas.height);
    graph.draw(context);
}

