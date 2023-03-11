// User Story #1: I can see a title element that has a corresponding id="title".
        // done - PASS

// User Story #2: I can see an x-axis that has a corresponding id="x-axis".
        // done - PASS

// User Story #3: I can see a y-axis that has a corresponding id="y-axis".
        // done - PASS
// User Story #4: I can see dots, that each have a class of dot, which represent the data being plotted.
        // done - PASS

// User Story #5: Each dot should have the properties data-xvalue and data-yvalue containing their corresponding x and y values.
        // done - PASS 

// User Story #6: The data-xvalue and data-yvalue of each dot should be within the range of the actual data and in the correct data format. For data-xvalue, integers (full years) or Date objects are acceptable for test evaluation. For data-yvalue (minutes), use Date objects.
        // done - PASS
                                                                                                                                                                                        
// User Story #7: The data-xvalue and its corresponding dot should align with the corresponding point/value on the x-axis.
        // done - PASS

// User Story #8: The data-yvalue and its corresponding dot should align with the corresponding point/value on the y-axis.
        // done - PASS

// User Story #9: I can see multiple tick labels on the y-axis with %M:%S time format.
        // done - PASS

// User Story #10: I can see multiple tick labels on the x-axis that show the year.
        // done - PASS

// User Story #11: I can see that the range of the x-axis labels are within the range of the actual x-axis data.
        // done - PASS

// User Story #12: I can see that the range of the y-axis labels are within the range of the actual y-axis data.
        // done - PASS

// User Story #13: I can see a legend containing descriptive text that has id="legend".
        // done - PASS

// User Story #14: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
        // done - PASS

// User Story #15: My tooltip should have a data-year property that corresponds to the data-xvalue of the active area.
        // done - PASS
 
// -CREATE VARIABLES-
// define w & h of svg
const svg_w = 1100;
const svg_h = 670;

// define padding variable
const paddingHor = 30;
const paddingVert = 30;
const adj = 34;

// define radius of circles
const circleRad = 6;

// define colors for circle fill - colors picked using "i want hue"
const doping = "#963B00";
const noDoping = "#6874FF";

// enter d3.json api
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
    .then(dataObj => {

    //create timeParse obj for min
    const parseMin = d3.timeParse("%M:%S")

    // create timeYear obj for year
    const parseYear = d3.timeParse("%Y")

    // make array of minutes (y axis) for extent
    const justMin = [];
    for (let obj of dataObj) {
        justMin.push(parseMin(obj.Time));
    }    

    // make array of years (x axis) for extent
    const justYear = [];
    for (let obj of dataObj) {
        justYear.push(parseYear(obj.Year))
    }

    // find min & max of Y axis (minutes)
    const domainMin = d3.extent(justMin);
    
    // find min & max x axis (years)
    const domainYear = d3.extent(justYear)

    // create xScale
    const xScale = d3.scaleTime()
                    .domain(domainYear)
                    .range([paddingHor + 14 + adj, svg_w - paddingHor])
    
    // create yScale
    const yScale = d3.scaleTime()
                    .domain(domainMin)
                    .range([svg_h - paddingVert, paddingVert])
    
    // create yScaleA (IN ORDER TO FLIP Y AXIS)
    const yScaleA = d3.scaleTime()
                    .domain(domainMin)
                    .range([paddingVert, svg_h - paddingVert])

    // create x axis
    const xAxis = d3.axisBottom(xScale)

    const timeFormat = d3.timeFormat("%M:%S")
    // create y axis
    const yAxis = d3.axisLeft(yScaleA).tickFormat(timeFormat)

    // create svg obj - give dimensions
    const svg = d3.select(".forSvg")
                    .append("svg")
                    .attr("height", svg_h)
                    .attr("width", svg_w)
    
    // create tooltip div in .forSvg
    const tooltip = d3.select(".forSvg")