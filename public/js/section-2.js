// SET RESPONSIVE FIGURE
function onGetRatio(val, width, height){
    if (width) {
      return val / width;
    } else {
      return val / height;
    }
}
 
// SET VARIABLES
var _canvasWidth = window.innerWidth < 1920 ? Math.floor(window.innerWidth): 1920;
var _canvasHeight = window.innerWidth < 1920 ? Math.floor(window.innerWidth / 2.14) : 900;
const _margin = {titleTop: _canvasHeight * onGetRatio(90, null, 900), bodyTop: _canvasHeight * onGetRatio(150, null, 900), all: _canvasWidth * onGetRatio(80, 1920, null), offset: _canvasWidth * onGetRatio(20, 1920, null)}
const _treeMapWidth = _canvasWidth * onGetRatio(860, 1920, null);
const _treeMapheight = _canvasHeight * onGetRatio(630, null, 900);
const _descSec2 = [{title: "Who imports the most?", body: "Top Importing Countries (2020)", titleX: _margin.all, titleY: _margin.titleTop, bodyX: _canvasWidth/2 - _margin.offset, bodyY: _margin.bodyTop},
                   {title: "Who exports the most?", body:"Top Exporting Countries (2020)", titleX: _canvasWidth * onGetRatio(980, 1920, null), titleY: _margin.titleTop, bodyX: _canvasWidth - _margin.all, bodyY: _margin.bodyTop}];
const _columns = ['share_in_market', '1Year_growth_in_value', '1Year_growth_in_qty'];

const tree = d3.stratify()
                .id(d => d.country)
                .parentId(d => d.type);

// READ DATA
Promise.all([
  d3.csv("data/avocado_import.csv"),
  d3.csv("data/avocado_export.csv")
]).then(function([data1, data2]) {

  function genelateTreeData(treeOption) {
    let importTreeData = tree(data1);
        importTreeData.sum(d => { if (Math.abs(d[treeOption]) < 2) {
                                  return Math.abs(d[treeOption] * 1.8)
                                  } else { return Math.abs(d[treeOption]);}
                                });
    let exportTreeData = tree(data2);
        exportTreeData.sum(d => { if (Math.abs(d[treeOption]) < 2) {
                                    return Math.abs(d[treeOption] * 2.5)
                                    } else { return Math.abs(d[treeOption]);}
                                  });
    d3.treemap().tile(d3.treemapSquarify).size([_treeMapWidth, _treeMapheight]).padding(1)(importTreeData);
    d3.treemap().tile(d3.treemapSquarify).size([_treeMapWidth, _treeMapheight]).padding(1)(exportTreeData);

    let treeDataCollection = {Import: importTreeData.descendants(), Export: exportTreeData.descendants()};
    return treeDataCollection;
  }
  
  function onDropdownTreemap(svgId, treeData, dropdownOpt) {

    let svg = d3.select(`#${svgId}`);
    let colorScale = d3.scaleOrdinal()
                       .domain(treeData.map(x => x.value))
                       .range(_color.treemap);
    let treeGroup = svg.append('g')
                        .attr('id', `treemap${svgId}`)
                        .attr('transform', `translate(0, ${_margin.bodyTop + (_margin.offset * 2.5)})`);
    let nodes = treeGroup.selectAll('g')
                          .data(treeData)
                            .enter()
                          .append('g')
                            .attr('transform', d => `translate(${[d.x0, d.y0]})`);
        nodes.append('rect') 
                .attr('width', d => d.x1 - d.x0)
                .attr('height', d => (d.y1 - d.y0))
                .attr('fill', d => { while (d.depth > 1) d = d.parent; return colorScale(d.value); })
  
        nodes.append('text')
              .attr('x', _margin.offset)
              .attr('y', _margin.offset * 2)
              .text(d => {
                if (d.id != 'Import' && d.id != 'Export') {
                  return d.id;
                }
              })
              .attr('class', 'mint-caption');
        nodes.append('text')
              .attr('x', _margin.offset)
              .attr('y', _margin.offset * 3.4)
              .text(d => {
                if (d.id != 'Import' && d.id != 'Export') {
                  return `${d.data[dropdownOpt]}%`;
                }
              })
              .attr('class', 'mint-body');

    let dropdown = svg.append("g")
                      .attr("id", `dropdown${svgId}`)
                      .attr('transform', `translate(0, -${_margin.all/2.4})`)
        dropdown.append("rect")
                    .attr("x", 0)
                    .attr("y",  _margin.bodyTop)
                    .attr("class", `select${svgId}`)
                    .attr("width", _canvasWidth * onGetRatio(320, 1920, null))
                    .attr("height", _canvasHeight * onGetRatio(56, null, 900))
                    .attr('fill', _color.bg[0])
                    .attr('stroke', _color.lighterBrown);
        dropdown.append("text")
                    .attr("x", _margin.offset)
                    .attr("y", _margin.bodyTop + (_margin.offset / 1.2))
                    .attr("alignment-baseline", 'hanging')
                    .attr("class", 'body')
                    .text(dropdownOpt)
                    .attr("cursor", "pointer");
        dropdown.append("text")
                    .text("▾")
                    .attr("x", _canvasWidth * onGetRatio(288, 1920, null))
                    .attr("y", _margin.bodyTop + (_margin.offset * 1.7))
                    .attr("class", 'green-big-body')
                    .attr("fill",  _color.lighterBrown)
                    .attr("cursor", "pointer");
      let options = svg.append("g")
                          .attr("id", `option${svgId}`)
                          .attr('transform', `translate(0, ${_margin.bodyTop - _canvasHeight * onGetRatio(34, null, 900)})`)
                          .attr("opacity", 0)
                          .on("click", handleSelectClick);
          options.append("rect")
                    .attr('class', 'option')
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", _canvasWidth * onGetRatio(320, 1920, null))
                    .attr("height", _canvasHeight * onGetRatio(168, null, 900))
                    .attr('fill', _color.bg[0])
                    .attr('stroke', _color.lighterBrown);
          options.selectAll('text.body')
                  .data(_columns)
                    .enter()
                  .append("text")
                    .attr("alignment-baseline", 'hanging')
                    .attr("class", 'body')
                    .attr("x", () => _margin.offset)
                    .attr("y", (d, i) => _margin.offset - 1 + (_margin.offset * 2.5 * i))
                    .text(d => d)
                    .attr("cursor", "pointer");
          options.append("text")
                    .text("▴")
                    .attr("x", _canvasWidth * onGetRatio(284, 1920, null))
                    .attr("y", (_margin.offset * 1.84))
                    .attr("class", 'green-big-body')
                    .attr("fill",  _color.lighterBrown)
                    .attr("cursor", "pointer");


      // SET FUNCTIONS
      function handleSelectClick(event){
        let selectedOpt;
        const visibility = d3.select(this).attr("opacity") == 0 ? 1 : 0;
        d3.select(this).attr("opacity", visibility);
        // console.log('open Opt', visibility);
        const callSVG = d3.select(this).attr('id').split('option')[1];
        if (event.target.classList.value == 'body' && visibility == 0 && event.target.childNodes[0].textContent !== dropdownOpt) {
          selectedOpt = event.target.childNodes[0].textContent;
          treeDataCollection = genelateTreeData(selectedOpt);
          onDropdownTreemap(callSVG, treeDataCollection[callSVG], selectedOpt);
        }
      }
  }
  
  function onInitSec2(){

    if (document.getElementById('Import') || document.getElementById('Export')) {
        d3.select(`#Import`).remove();
        d3.select(`#Export`).remove();
    };

    let section = d3.select('#section-2')
                      .attr('width', _canvasWidth)
                      .attr('height', _canvasHeight);
        section.append('rect')
                  .attr('x', 0)
                  .attr('y', 0)
                  .attr('width', _canvasWidth)
                  .attr('height', _canvasHeight)
                  .attr('fill', _color.bg[1]);
        section.append('g')
                  .attr('id', 'Import')
                  .attr('transform', `translate(${_margin.all}, 0)`);
        section.append('g')
                  .attr('id', 'Export')
                  .attr('transform', `translate(${_canvasWidth * onGetRatio(980, 1920, null)}, 0)`);

    let titleGroup = section.append('g')
                              .attr('id', 'sec2Title')
                            .selectAll('text')
                            .data(_descSec2)
                              .enter();
        titleGroup.append('text')
                        .attr('x', d => d.titleX)
                        .attr('y', d => d.titleY)
                        .text(d => d.title)
                        .attr('class', 'subtitle')
        titleGroup.append('text')
                        .attr("text-anchor", "end")
                        .attr('x', d => d.bodyX)
                        .attr('y', d => d.bodyY)
                        .text(d => d.body)
                        .attr('class', 'brown-caption');

    treeDataCollection = genelateTreeData(_columns[0]);       
    onDropdownTreemap('Import', treeDataCollection.Import, _columns[0]);
    onDropdownTreemap('Export', treeDataCollection.Export, _columns[0]);
  }
  onInitSec2();

  // ON WINDOW RESIZE
  window.addEventListener('resize', () => {
    // console.log(window.innerWidth)
    if (window.innerWidth > 541) {
      // console.log('Should\'t under 541', window.innerWidth);
      onInitSec2();
    }
  });
  
}).catch(function(err) {
  console.log(err);
})

