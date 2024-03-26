class World{
    constructor(graph, roadWidth = 100, roadRoundness = 12){
        this.graph = graph;
        this.roadWidth = roadWidth;
        this.roadRoundness = roadRoundness

        this.envelopes = [];
        this.roadBorders = [];

        this.generate();
    }

    generate(){
        this.envelopes.length = 0;
        for (const seg of this.graph.segments){
            this.envelopes.push(
                new Envelope(seg, this.roadWidth, this.roadRoundness)
            );
        }

        this.roadBorders = Polygon.union(this.envelopes.map((e) => e.poly));
    }

    draw(context){
        for (const env of this.envelopes){
            env.draw(context, {fill: "#BBB", stroke:"#BBB", lineWidth : 15 });
        }
        for (const seg of this.graph.segments){
            seg.draw(context, {color: "white", width:4, dash: [10,10]});
        }
        for (const seg of this.roadBorders){
            seg.draw(context, {color: "white", width: 6});
        }
    }
}
