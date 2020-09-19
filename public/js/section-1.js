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
const margin = {titleTop: canvasHeight * onGetRatio(110, null, 900), bodyTop: canvasHeight * onGetRatio(180, null, 900), all: canvasWidth * onGetRatio(80, 1920, null), offset: canvasWidth * onGetRatio(20, 1920, null)}
const treeMapWidth = canvasWidth/2 - margin.all - margin.offset;
const treeMapheight = canvasHeight - (margin.all + margin.bodyTop);
const _descSec2 = [{title: "Who imports the most?", body: "Top Importing Countries (2020)", titleX: margin.all, titleY: margin.titleTop, bodyX: canvasWidth/2 - margin.offset, bodyY: margin.bodyTop},
                   {title: "Who exports the most?", body:"Top Exporting Countries (2020)", titleX: canvasWidth/2 + margin.offset, titleY: margin.titleTop, bodyX: canvasWidth - margin.all, bodyY: margin.bodyTop}];
const tree = d3.stratify()
                .id(d => d.country)
                .parentId(d => d.type);
const svg = d3.select('#d3-area')
                .attr('width', canvasWidth)
                .attr('height', canvasHeight);
const color = d3.scaleOrdinal()
                .domain(["boss1", "boss2", "boss3"])
                .range([ "#402D54", "#D18975", "#8FD175"]);
const treeGroup = svg.append('g')
                       .attr('id', 'treemapGroup')
                       .attr('transform', d => `translate(${margin.all}, ${margin.all + margin.bodyTop})`);

const textGroup = svg.selectAll('text')
                     .data(_descSec2)
                       .enter()
textGroup.append('text')
          .attr('x', d => d.titleX)
          .attr('y', d => d.titleY)
          .text(d => d.title)
          .attr('class', 'd3_subtitle');
          
textGroup.append('text')
          .attr("text-anchor", "end")
          .attr('x', d => d.bodyX)
          .attr('y', d => d.bodyY)
          .text(d => d.body)
          .attr('class', 'd3_caption');

// READ DATA
d3.csv("data/avocado_import.csv").then(data => {
  // console.log(data);

  let treeData = tree(data);
  treeData.sum(d => Math.abs(d['share_in_market']));
  d3.treemap().size([treeMapWidth, treeMapheight]).paddingOuter(12)(treeData);
  
  // console.log(treeData.descendants())
  let nodes = treeGroup.selectAll('#treemapGroup')
                        .data(treeData.descendants())
                          .enter()
                        .append('g')
                          .attr('transform', d => `translate(${[d.x0, d.y0]})`);
  nodes.append('rect') 
          .attr('width', d => d.x1 - d.x0)
          .attr('height', d => d.y1 - d.y0);
  nodes.append('text')
        .attr('x', 8)
        .attr('y', 20)
        .text(d => {
          if (d.id != 'Import') {
            return d.id;
          }
        })
        .attr('class', 'd3_body');
})
.catch((error) => {
    console.error(error);
});
// SET FUNCTIONS
