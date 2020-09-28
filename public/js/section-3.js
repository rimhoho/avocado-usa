// SET RESPONSIVE FIGURE
function onGetRatio(val, width, height){
    if (width) {
      return val / width;
    } else {
      return val / height;
    }
}
let _tablePadding = {left: _canvasWidth * onGetRatio(70, 1920, null), top: _canvasHeight * onGetRatio(42, null, 900)}


function onTableSec3(regionOpt){
  let dropdown = d3.select('#sec3-annualSaleGroup')
                    .append("g")
                        .attr("id", `dropdown${regionOpt}`)
                        .attr('transform', `translate(${_tablePadding.left}, -${_margin.all/2.4})`);
      dropdown.append("rect")
                  .attr("x", 0)
                  .attr("y",  _margin.bodyTop)
                  .attr("class", `select${regionOpt}`)
                  .attr("width", _canvasWidth / 3.8 - (_tablePadding.left * 2))
                  .attr("height", _canvasHeight * onGetRatio(56, null, 900))
                  .attr('fill', _color.bg[0])
                  .attr('stroke', _color.lighterBrown);
      dropdown.append("text")
                  .attr("x", _margin.offset)
                  .attr("y", _margin.bodyTop + (_margin.offset / 1.2))
                  .attr("alignment-baseline", 'hanging')
                  .attr("class", 'body')
                  .text(regionOpt);
      dropdown.append("text")
                  .text("▾")
                  .attr("x", _canvasWidth * onGetRatio(284, 1920, null))
                  .attr("y", _margin.bodyTop + (_margin.offset * 1.9))
                  .attr("font-size", '110%')
                  .attr("fill",  _color.lighterBrown);

    let options = d3.select('#sec3-annualSaleGroup')
                    .append("g")
                      .attr("id", `option${regionOpt}`)
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
                .data(treeDropdownOpt)
                  .enter()
                .append("text")
                  .attr("x", () => _margin.offset)
                  .attr("y", (d, i) => {
                    switch(i){
                      case 0:
                        return _margin.offset * 0.88;
                        break;
                      case 1:
                        return _margin.offset * 3.3;
                        break;
                      case 2:
                        return _margin.offset * 5.6;
                        break;
                    }
                  })
                  .attr("alignment-baseline", 'hanging')
                  .attr("class", 'body')
                  .text(d => d);
        options.append("text")
                  .text("▴")
                  .attr("x", _canvasWidth * onGetRatio(284, 1920, null))
                  .attr("y", (_margin.offset * 1.84))
                  .attr("font-size", '110%')
                  .attr("fill",  _color.lighterBrown);


      // SET FUNCTIONS
      function handleSelectClick(event){
          let selectedOpt;
          const visibility = d3.select(this).attr("opacity") == 0 ? 1 : 0;
          d3.select(this).attr("opacity", visibility);
          const callSVG = d3.select(this).attr('id').split('option')[1];
          // console.log(visibility, event.target.classList.value)
          if (event.target.classList.value == 'body' && visibility == 0 && event.target.childNodes[0].textContent !== dropdownOpt) {
            selectedOpt = event.target.childNodes[0].textContent;
            console.log('data', callSVG, treeDataCollection[callSVG]);
            treeDataCollection = genelateTreeData(selectedOpt);
            handleOptionClick(callSVG, treeDataCollection[callSVG], selectedOpt);
          }
      }

      function handleOptionClick(svg, treedata, treeOpt) {
          onDropdownTreemap(svg, treedata, treeOpt);
      }
}
function onInitSec3(){
    let section = d3.select('#section-3')
                      .attr('width', _canvasWidth)
                      .attr('height', _canvasHeight);
        section.append('rect')
                  .attr('x', 0)
                  .attr('y', 0)
                  .attr('width', _canvasWidth)
                  .attr('height', _canvasHeight)
                  .attr('fill', _color.bg[2]);
        section.append('text')
                  .attr('class', 'ivory-subtitle')
                  .attr('x', _margin.all)
                  .attr('y', _margin.titleTop)
                  .text('Total U.S. unit sales annual growth, 2020');

    let annualSaleGroup = section.append('g')
                                    .attr('transform', `translate(${_margin.all}, ${_margin.bodyTop})`)
                                    .attr('id', 'sec3-annualSaleGroup');

        annualSaleGroup.append('rect')
                          .attr('x', 0)
                          .attr('y', 0)
                          .attr('width', _canvasWidth / 3.8)
                          .attr('height', _canvasHeight - _margin.bodyTop - _margin.all)
                          .attr('fill', _color.ivory);
        annualSaleGroup.append('rect')
                          .attr('x', _canvasWidth / 8.6)
                          .attr('y', 0)
                          .attr('width', _canvasWidth / 6.8)
                          .attr('height', _canvasHeight * onGetRatio(70, null, 900))
                          .attr('fill', _color.darkerIvory);
        annualSaleGroup.append('text')
                          .attr('x', _tablePadding.left)
                          .attr('y', _tablePadding.top)
                          .text('Current Market')
                          .attr('class', 'brick-big-caption');
        annualSaleGroup.append('text')
                          .attr('x', (_canvasWidth / 3.8) - _tablePadding.left)
                          .attr('y', _tablePadding.top)
                          .attr('text-anchor', 'end')
                          .text('Top Reporting Market')
                          .attr('class', 'grey-big-caption');
    let initialRegion = 'California';
    onTableSec3(initialRegion);
}

onInitSec3();