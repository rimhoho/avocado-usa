// SET RESPONSIVE FIGURE
function onGetRatio(val, width, height){
    if (width) {
      return val / width;
    } else {
      return val / height;
    }
  }
 
// SET VARIABLES
const canvasWidth = window.innerWidth < 1920 ? Math.floor(window.innerWidth): 1920;
const canvasHeight = window.innerWidth < 1920 ? Math.floor(window.innerWidth / 2.14) : 900;

const margin = {bodyTop: canvasHeight * onGetRatio(140, null, canvasHeight), all: canvasWidth * onGetRatio(80, canvasWidth, null), offset: canvasWidth * onGetRatio(20, canvasWidth, null)}
const treeMapWidth = canvasWidth/2 - margin.all - margin.offset;
const treeMapheight = canvasHeight - (margin.all * 2);
const _descSec2 = { title: ["Who imports the most?", "Who exports the most?"],
                    body: ["Top Importing Countries (2020)", "Top Exporting Countries (2020)"],
                    position: [margin.all, canvasWidth/2 + margin.offset]};

const svg = d3.select('#d3-area')
                .attr('width', canvasWidth)
                .attr('height', canvasHeight)
const treeGroup = svg.append('g')
                       .attr('id', 'treemapGroup')

const tree = d3.stratify()
               .id(d => d.country)
               .parentId(d => d.type);
console.log(treeMapWidth, treeMapheight);

// READ DATA
d3.csv("data/avocado_import.csv").then(data => {
    let treeData = tree(data).sum(d => d['Share in market']);
    d3.treemap().size([treeMapWidth, treeMapheight])(treeData);
    console.log(treeData.descendants());

    console.log(d3.entries(_descSec2))
    // svg.selectAll('text')
    //     .datum()
    //     .data(d3.entries(_descSec2))
    //       .enter()
    //     .append('text')
    //       .attr('x', d => d.position)
    //       .attr('y', margin.all)
    //       .text(d => d.title);
    // let nodes = treeGroup.selectAll('#treemapGroup')
    //                      .data(treeData.descendants())
    //                        .enter()
    //                      .append('g')
    //                        .attr('transform', d => `translate(${[d.x0, d.y0]})`);
    nodes.append('rect')
           .attr('width', d => d.x1 - d.x0)
           .attr('height', d => d.y1 - d.y0)
})
.catch((error) => {
    console.error(error);
});
// SET FUNCTIONS
// 1-Year Growth in Qty: "",
// 1-Year Growth in Value: "",
// Concentration of Import Destinations: "",
// Country: "",
// Quantity: "",
// Share in market: "",
// Type: "",
// Unit Price: ""