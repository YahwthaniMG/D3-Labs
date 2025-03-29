d3.json("data/revenues.json").then((data) => {
    // CONVERT DATA VALUES TO THE CORRECT TYPES
    data.forEach((d) => {
        d.month = d.month;
        d.revenue = d.revenue;
    });
    console.log(data);
    
    // DEFINE MARGINS AND CHART DIMENSIONS
    var margin = {top: 10, right: 10, bottom: 100, left: 100};
    var width = 600;
    var height = 400;

    // CREATE SVG CANVAS
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom);
        
    // CREATE A GROUP ELEMENT TO APPLY MARGIN TRANSFORMATION
    var g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // DEFINE X SCALE (CATEGORICAL DATA - MONTHS)
    const x = d3.scaleBand()
        .domain(data.map(d => d.month))  
        .range([0, width]) 
        .paddingInner(0.3)
        .paddingOuter(0.3);
    
    // DEFINE Y SCALE (NUMERICAL DATA - REVENUE)
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.revenue)])  
        .range([height, 0]);
    
    // DEFINE COLOR SCALE FOR DIFFERENT MONTHS
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.month)) 
        .range(d3.schemeSet3);
    
    // BIND DATA TO RECTANGLES (BARS)
    var rect = g.selectAll("rect")
        .data(data);
    
    // ENTER SELECTION: APPEND RECTANGLES FOR NEW DATA
    rect.enter()
        .append("rect")
        .attr("x", d => x(d.month))  
        .attr("y", d => y(d.revenue))  
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.revenue))  
        .attr("fill", "yellow");  // STATIC COLOR FOR BARS
    
    // CREATE AND ADD X AXIS
    var xAxis = d3.axisBottom(x);
    g.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-40)")
        .attr("x", -5)
        .attr("y", 10)
        .attr("text-anchor", "end");
    
    // CREATE AND ADD Y AXIS
    var yAxis = d3.axisLeft(y)
        .ticks(10)
        .tickFormat(d => "$" + d);  
        
    g.append("g")
        .call(yAxis);
    
    // ADD X AXIS LABEL
    g.append("text")
        .attr("x", width / 2)
        .attr("y", height + 60)
        .attr("text-anchor", "middle")
        .text("MONTH");  
    
    // ADD Y AXIS LABEL
    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", -60)
        .attr("text-anchor", "middle")
        .text("REVENUE ($)");  

}).catch((error) => {
    console.log(error); // HANDLE DATA LOADING ERRORS
});
