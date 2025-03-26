//JSON FILE
d3.json("data/buildings.json").then((data)=> {
    console.log(data);
});

//String to Integer
d3.json("data/buildings.json").then((data)=> {
    data.forEach((d)=>{
        d.height= +d.height;
    });
    console.log(data);

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 600)
    .attr("height", 500);

var rect = svg.selectAll("rect")
    .data(data);

    rect.enter()
        .append("rect")
        .attr("x", function(d,i) {
                return 50 * i;
        })
        .attr("y", function(d){
            return 500 - (d.height/2);
        })
        .attr("width", 40)
        .attr("height", function(d) {
                return d.height;
        })
        .attr("fill", function(d,i){
            return i%2==0 ? "lightgreen" : "lightblue"
        });

    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => 20 ) 
        .attr("y", 0) 
        .attr("font-size", "12px")
        .attr("fill", "black")
        .attr("transform", (d, i) => `translate(${50 * i + 25},510) rotate(-90)`) // Primero mover, luego rotar
        .text(d => d.name);
});
