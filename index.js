// User Story #1: I can see a title element that has a corresponding id="title".

// User Story #2: I can see an x-axis that has a corresponding id="x-axis".

// User Story #3: I can see a y-axis that has a corresponding id="y-axis".

// User Story #4: I can see dots, that each have a class of dot, which represent the data being plotted.
        // done - PASS

// User Story #5: Each dot should have the properties data-xvalue and data-yvalue containing their corresponding x and y values.
        // done - PASS 

// User Story #6: The data-xvalue and data-yvalue of each dot should be within the range of the actual data and in the correct data format. For data-xvalue, integers (full years) or Date objects are acceptable for test evaluation. For data-yvalue (minutes), use Date objects.
        // done - PASS
                                                                                                                                                                                        
// User Story #7: The data-xvalue and its corresponding dot should align with the corresponding point/value on the x-axis.

// User Story #8: The data-yvalue and its corresponding dot should align with the corresponding point/value on the y-axis.

// User Story #9: I can see multiple tick labels on the y-axis with %M:%S time format.

// User Story #10: I can see multiple tick labels on the x-axis that show the year.

// User Story #11: I can see that the range of the x-axis labels are within the range of the actual x-axis data.

// User Story #12: I can see that the range of the y-axis labels are within the range of the actual y-axis data.

// User Story #13: I can see a legend containing descriptive text that has id="legend".

// User Story #14: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
        // gave tooltip id

// User Story #15: My tooltip should have a data-year property that corresponds to the data-xvalue of the active area.

// define w & h of svg
const svg_w = 1100;
const svg_h = 670;
// define padding variable
const paddingHor = 30;
const paddingVert = 30;
// define radius of circles
const circleRad = 4;

// define colors for circle fill
const doping = "aqua";
const noDoping = "red";

// enter d3.json api
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
    .then(dataObj => {
    console.log("🚀 ~ file: index.js:39 ~ dataObj:", dataObj)

    //create timeParse obj for min
    const parseMin = d3.timeParse("%M:%S")

    // create timeYear obj for year
    const parseYear = d3.timeParse("%Y")

    // make array of minutes (y axis) for extent
    const justMin = [];
    for (let obj of dataObj) {
        justMin.push(parseMin(obj.Time));
    }    
    // console.log(justMin)

    // make array of years (x axis) for extent
    const justYear = [];
    for (let obj of dataObj) {
        justYear.push(parseYear(obj.Year))
    }
    //console.log(justYear)

    // find min & max of Y axis (minutes)
    const domainMin = d3.extent(justMin);
    // console.log("🚀 ~ file: index.js:62 ~ domainMin:", domainMin)
    
    // find min & max x axis (years)
    const domainYear = d3.extent(justYear)
    console.log("🚀 ~ file: index.js:79 ~ domainYear:", domainYear)
    
    // create new Date obj for domainYear arr
    const domainFirst = new Date(domainYear[0])
    const domainLast = new Date(domainYear[1])
    
    // subtract 4 yrs 1st date obj
    domainFirst.setFullYear(domainFirst.getFullYear() - 4)
    console.log("🚀 ~ file: index.js:85 ~ domainFirst:", domainFirst)
    
    // add 4 yrs to 2st date obj
    domainLast.setFullYear(domainLast.getFullYear() + 4)
    console.log("🚀 ~ file: index.js:91 ~ domainYear:", domainYear)

    //domainYear[0] = domainFirst;
    //domainYear[1] = domainLast;
    console.log("🚀 ~ file: index.js:95 ~ domainYear:", domainYear)

    

    const xScale = d3.scaleTime()
                    .domain(domainYear)
                    .range([paddingHor, svg_w - paddingHor])
    //console.log("🚀 ~ file: index.js:74 ~ xScale:", xScale)
    
    const yScale = d3.scaleTime()
                    .domain(domainMin)
                    .range([svg_h - paddingVert, paddingVert])
    //console.log("🚀 ~ file: index.js:79 ~ yScale:", yScale)
    
    // create x axis
    const xAxis = d3.axisBottom(xScale)




    // create svg obj - give dimensions
    const svg = d3.select(".forSvg")
                    .append("svg")
                    .attr("height", svg_h)
                    .attr("width", svg_w)
    
    // create tooltip div in .forSvg
    const tooltip = d3.select(".forSvg")
                    .append("div")
                    .attr("id", "tooltip")

    // add circles with x, y values
    svg.selectAll("circle")
        .data(dataObj)
        .enter()
        .append("circle")
        // add cx, cy, r
        .attr("cx", (d, i) => xScale(parseYear(d.Year)))
        .attr("cy", (d, i) => svg_h - paddingVert - yScale(parseMin(d.Time)))
        .attr("r", circleRad)
        // outline circles
        .attr("stroke", "black")
        // fill with diff colors based on doping or not
        .attr("fill", (d) => d.Doping === "" ? noDoping : doping)
        // each circle gets .dot class
        .attr("class", "dot")
        // add required attributes
        .attr("data-xvalue", (d) => parseYear(d.Year))
        .attr("data-yvalue", (d) => parseMin(d.Time))

    // add x axis
    svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0, " + (svg_h - paddingVert) + ")")
        .call(xAxis)


    // exit d3.json().then     
    }) 
    // catch error & send to console
    .catch(error => console.log(error));
