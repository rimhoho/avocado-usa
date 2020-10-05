// SET RESPONSIVE FIGURE
function onGetRatio(val, width, height){
  if (width) {
    return val / width;
  } else {
    return val / height;
  }
}
const _tablePadding = {left: _canvasWidth * onGetRatio(58, 1920, null), top: _canvasHeight * onGetRatio(46, null, 900)}
const _tableColumn = ['City', 'Total Sale', '1 Year Growth'];
const _RankColumn = ['Rank', 'City', '1 Year Growth'];
const _rowRatio = [0, _canvasWidth * onGetRatio(280, 1920, null), _canvasWidth * onGetRatio(420, 1920, null)];
const _lookup = {
  "42" : "PA", "36" : "NY", "06" : "CA", "25" : "MA", "09" : "CT", "17" : "IL", "18" : "IN", 
  "39" : "OH", "26" : "MI", "24" : "MD", "51" : "VA", "37" : "NC", "21" : "KY", "47" : "TN", 
  "29" : "MO", "13" : "GA", "12" : "FL", "48" : "TX", "22" : "LA", "16" : "ID", "41" : "OR", 
  "08" : "CO", "04" : "AZ", "32" : "NV", "53" : "WA"
}
const _regions = [
    {"name": "Northeast",     "states": {"PA":[ "Philadelphia","Harrisburg","Pittsburgh" ], "NY":[ "Buffalo","Albany","New York","Syracuse" ], "MA":[ "Boston" ], "CT": [ "Hartford" ]} },
    {"name": "Great Lakes",   "states": {"IL":[ "Chicago" ], "IN":[ "Indianapolis"], "OH": [ "Cincinnati","Dayton","Columbus" ],"MI": [ "Detroit"]} },
    {"name": "Midsouth",      "states": {"MD":[ "Baltimore" ], "VA": [ "Richmond","Roanoke" ], "NC": [ "Charlotte","Raleigh"], "KY": [ "Louisville" ], "TN": [ "Nashville" ]} },
    {"name": "Southeast",     "states": {"GA":[ "Atlanta" ], "FL": [ "Orlando","Tampa","Jacksonville" ]} },
    {"name": "Plains",        "states": {"MO":[ "St. Louis" ]} },
    {"name": "South Central", "states": {"TX":[ "Dallas","Houston" ], "LA": [ "New Orleans" ]} },
    {"name": "West",          "states": {"ID":[ "Boise" ], "OR": [ "Portland" ], "WA": [ "Spokane","Seattle" ], "CO": [ "Denver" ], "AZ": [ "Phoenix" ], "NV": [ "Las Vegas" ]} },
    {"name": "California",    "states": {"CA":[ "San Diego","San Francisco","Sacramento","Los Angeles" ]} }
  ];

// READ DATA
Promise.all([
  d3.csv('data/avocados_market.csv'),
  d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'),
  d3.json('https://opendata.arcgis.com/datasets/85d0ca4ea1ca4b9abf0c51b9bd34de2e_0.geojson')
]).then(function([csv, us, cities]) {

let features = topojson.feature(us, us.objects.states).features;
let reCsv = d3.nest().key(function(d) { return d.Region; }).entries(csv);
console.log('csv', reCsv, 'us', features, 'cities', cities.features);

// SET FUNCTIONS
function handleTabClick(event){
  let tabId = (event.target.id).split('-')[1];
  if (tabId == 'tab1') {
    d3.select('#sec3-leftCard').remove();
    onInitSec3('tab1');
    onCurrentMarketSec3(previousRegion);
  } else {
    onInitSec3('tab2');
    onTopMarketSec3(previousRegion);
  }
}

function handleSelectClick(event){
  const visibility = d3.select(this).attr("opacity") == 0 ? 1 : 0;
  d3.select(this).attr("opacity", visibility);
  let regionId = event.target.id.split('_')[1];
  if (regionId != undefined && !visibility) { handleOptClick(regionId);}
}

function handleOptClick(regionId) {
  previousRegion = regionId;
  d3.select('#sec3-table').remove();
  onCurrentMarketSec3(regionId);
}

function tablePerRow(column, valueArr, index, y, fontClass){
  let sec3Table = d3.select('#sec3-table')
                    .append('g')
                        .attr('class', `sec3-row-group`)
                        .attr('transform', `translate(${_tablePadding.left}, ${_margin.bodyTop * 1.6})`);
  if (index == 0) {
      sec3Table.selectAll('text')
                  .data(column)
                  .enter()
                .append('text')
                  .attr('x', (d, i) => _rowRatio[i])
                  .attr('y', y)
                  .attr("class", 'lime-caption')
                  .attr('text-anchor', (d, i) => { if(i != 0) { return 'end'}})
                  .text(d => d);
      sec3Table.append('rect')
                  .attr("x", 0)
                  .attr("y", y + _margin.offset)
                  .attr("width", _canvasWidth / 3.6 - (_tablePadding.left * 2))
                  .attr("height", _canvasHeight * onGetRatio(2, null, 900))
                  .attr('fill', _color.lime);
  }
      sec3Table.selectAll('.row')
                  .data(valueArr)
                  .enter()
                .append('text')
                  .attr('x', (d, i) => _rowRatio[i])
                  .attr('y', () => index * _canvasHeight * onGetRatio(40, null, 900) + (y + _margin.offset * 3))
                  .attr("class", `row ${fontClass}`)
                  .attr('text-anchor', (d, i) => { if(i != 0) { return 'end'}})
                  .text(d => d);
}

function onCurrentMapSec3(regionOpt){
  d3.select('#sec3-map').remove();

  // filtered _regions data with regionOpt in us.objects.states
  let getStateIds = [], getCityNames = [];
  _regions.forEach(item => {
    if (item.name == regionOpt) {
      getStateIds.push(Object.keys(item.states));
      Object.values(item.states).forEach(cityarr => {
        getCityNames.push(...cityarr)
      });
    }
  })
  let mapWidth = _canvasWidth - (_canvasWidth / 3.2) - _margin.all;
  let mapHeight = _canvasHeight - _margin.bodyTop;
  let projection = d3.geoAlbersUsa().fitSize([mapWidth, mapHeight], topojson.feature(us, us.objects.states));
  let geoPath = d3.geoPath().projection(projection);

  let mapSvg = d3.select('#section-3')
                 .append('g')
                    .attr('transform', `translate(${_canvasWidth * onGetRatio(588, 1920, null)}, ${_margin.titleTop})`)
                    .attr('id', 'sec3-map');
      mapSvg.selectAll('.state')
              .data(features)
              .enter()  
            .append('path')
              .attr('id', d => 'state_' + d.properties.name)
              .attr('class', 'state')
              .attr('d', geoPath)
              .style("fill", d => {
                if (getStateIds[0].includes(_lookup[d.id])) {
                  return _color.mapSelect;
                } else {
                  return _color.ivory;
                }
              })
              .style("stroke-width", "0.5")
              .style("stroke", _color.brown)
              .style('opacity', d => {if(d.properties.name == 'Alaska') {return 0}})

    let cityPoints = mapSvg.selectAll('.city')
                              .data(cities.features)
                              .enter();
        cityPoints.append('path')
                      .attr('id', d => 'city_' + d.properties.NAME)
                      .attr('class', 'city')
                      .attr('d', geoPath)
                      .style("fill", d => {
                        if (getCityNames.includes(d.properties.NAME) && getStateIds[0].includes(d.properties.ST)) {
                          return _color.citySelect;
                        } else {
                          return 'none';
                        }
                      })
                      .attr("cursor", "pointer")
                      .on("mouseover", event => {
                        d3.select('#sec3-tooltip').remove();
                        let cityId = event.target.id;
                        let cityName = cityId.replace('city_', '');
                        let stateName;
                        _regions.forEach(arr => {
                          for (const [key, value] of Object.entries(arr.states)) {
                            if (value.includes(cityName)) {
                              stateName = key;
                            }
                          }
                        })
                        let tooltipArr = [];
                        cities.features.forEach(cityArr => {
                          if (cityArr.properties.NAME == cityName  && cityArr.properties.ST == stateName) {
                            tooltipArr.push(['State', cityArr.properties.ST], ['City', cityArr.properties.NAME], ['Population', (cityArr.properties.POPULATION).toLocaleString()], ['# of Households', (cityArr.properties.HOUSEHOLDS).toLocaleString()], ['Median Age', cityArr.properties.MED_AGE], ['Avg. Family Size', cityArr.properties.AVE_FAM_SZ])
                          }
                        })
                        let tooltipG = d3.select('#sec3-map')
                                          .append('g')
                                              .attr('transform', `translate(${event.offsetX - _canvasWidth / 3}, ${event.offsetY - _canvasHeight / 4})`)
                                              .attr('id', 'sec3-tooltip')
                            tooltipG.append('rect')
                                        .attr("x", parseInt('-' + _margin.all))
                                        .attr("y", parseInt('-' + (_margin.all * 1.4)))
                                        .attr('width', _canvasWidth / 6.8)
                                        .attr('height', _canvasHeight / 4)
                                        .attr('fill', _color.citySelect)
                                        .attr('opacity', .94);

                        let tooltipText = tooltipG.selectAll('.tooltip-text')
                                                    .data(tooltipArr)
                                                    .enter()
                            tooltipText.append('text')
                                          .attr('x', parseInt('-' + _canvasHeight * onGetRatio(50, null, 900)))
                                          .attr('y', (d, i) => i * _canvasHeight * onGetRatio(28, null, 900) - _canvasHeight * onGetRatio(60, null, 900))
                                          .attr("class", 'tooltip-text mint-caption')
                                          .text((d, i) => d[0]);
                            tooltipText.append('text')
                                          .attr('x', _canvasWidth / 6.8 - _canvasHeight * onGetRatio(100, null, 900))
                                          .attr('y', (d, i) => i * _canvasHeight * onGetRatio(28, null, 900) - _canvasHeight * onGetRatio(60, null, 900))
                                          .attr("class", 'tooltip-text avo-white-caption')
                                          .attr('text-anchor', 'end')
                                          .text(d => d[1]);
                      })
                      .on("mouseout", event => {
                        d3.select('#sec3-tooltip').remove();
                      });
}
function onTopMapSec3(totalTopMarket){
  d3.select('#sec3-map').remove();
  let topStates = [], topCities = [];
  totalTopMarket.forEach(cityArr => {
    let stateName;
    _regions.forEach(item => {
      Object.values(item.states).filter((city, i) => {
        if (city.includes(cityArr[1])) {
          stateName = Object.keys(item.states)[i];
        }
      })
    })
    topCities.push(cityArr[1])
    topStates.push(stateName);
  })

  let mapWidth = _canvasWidth - (_canvasWidth / 3.2) - _margin.all;
  let mapHeight = _canvasHeight - _margin.bodyTop;
  let projection = d3.geoAlbersUsa().fitSize([mapWidth, mapHeight], topojson.feature(us, us.objects.states));
  let geoPath = d3.geoPath().projection(projection);

  let mapSvg = d3.select('#section-3')
                 .append('g')
                    .attr('transform', `translate(${_canvasWidth * onGetRatio(588, 1920, null)}, ${_margin.titleTop})`)
                    .attr('id', 'sec3-map');
      mapSvg.selectAll('.state')
              .data(features)
              .enter()  
            .append('path')
              .attr('id', d => 'state_' + d.properties.name)
              .attr('class', 'state')
              .attr('d', geoPath)
              .style("fill", d => {
                if (topStates.includes(_lookup[d.id])) {
                  return _color.mapSelect;
                } else {
                  return _color.ivory;
                }
              })
              .style("stroke-width", "0.5")
              .style("stroke", _color.brown)
              .style('opacity', d => {if(d.properties.name == 'Alaska') {return 0}})

    let cityPoints = mapSvg.selectAll('.city')
                              .data(cities.features)
                              .enter();
        cityPoints.append('path')
                      .attr('id', d => 'city_' + d.properties.NAME)
                      .attr('class', 'city')
                      .attr('d', geoPath)
                      .style("fill", d => {
                        if (topCities.includes(d.properties.NAME) && topStates.includes(d.properties.ST)) {
                          return _color.citySelect;
                        } else {
                          return 'none';
                        }
                      })
                      .attr("cursor", "pointer")
                      .on("mouseover", event => {
                        d3.select('#sec3-tooltip').remove();
                        let cityId = event.target.id;
                        let cityName = cityId.replace('city_', '');
                        let stateName;
                        _regions.forEach(arr => {
                          for (const [key, value] of Object.entries(arr.states)) {
                            if (value.includes(cityName)) {
                              stateName = key;
                            }
                          }
                        })
                        let tooltipArr = [];
                        cities.features.forEach(cityArr => {
                          if (cityArr.properties.NAME == cityName  && cityArr.properties.ST == stateName) {
                            tooltipArr.push(['State', cityArr.properties.ST], ['City', cityArr.properties.NAME], ['Population', (cityArr.properties.POPULATION).toLocaleString()], ['# of Households', (cityArr.properties.HOUSEHOLDS).toLocaleString()], ['Median Age', cityArr.properties.MED_AGE], ['Avg. Family Size', cityArr.properties.AVE_FAM_SZ])
                          }
                        })
                        let tooltipG = d3.select('#sec3-map')
                                          .append('g')
                                              .attr('transform', `translate(${event.offsetX - _canvasWidth / 3}, ${event.offsetY - _canvasHeight / 4})`)
                                              .attr('id', 'sec3-tooltip')
                            tooltipG.append('rect')
                                        .attr("x", parseInt('-' + _margin.all))
                                        .attr("y", parseInt('-' + (_margin.all * 1.4)))
                                        .attr('width', _canvasWidth / 6.8)
                                        .attr('height', _canvasHeight / 4)
                                        .attr('fill', _color.citySelect)
                                        .attr('opacity', .94);

                        let tooltipText = tooltipG.selectAll('.tooltip-text')
                                                    .data(tooltipArr)
                                                    .enter()
                            tooltipText.append('text')
                                          .attr('x', parseInt('-' + _canvasHeight * onGetRatio(50, null, 900)))
                                          .attr('y', (d, i) => i * _canvasHeight * onGetRatio(28, null, 900) - _canvasHeight * onGetRatio(60, null, 900))
                                          .attr("class", 'tooltip-text mint-caption')
                                          .text((d, i) => d[0]);
                            tooltipText.append('text')
                                          .attr('x', _canvasWidth / 6.8 - _canvasHeight * onGetRatio(100, null, 900))
                                          .attr('y', (d, i) => i * _canvasHeight * onGetRatio(28, null, 900) - _canvasHeight * onGetRatio(60, null, 900))
                                          .attr("class", 'tooltip-text avo-white-caption')
                                          .attr('text-anchor', 'end')
                                          .text(d => d[1]);
                      })
                      .on("mouseout", event => {
                        d3.select('#sec3-tooltip').remove();
                      });
}
function onTopMarketSec3() {
  let valueArr = [], cityGrowth = [], totalTopMarket = [];
  let count = 0;
  reCsv.forEach(item => {
    item.values.map(value => {
      cityGrowth.push({ city: value['City'], growth: parseFloat(value['annual_growth_in_unit_sales'])})
      valueArr.push(parseFloat(value['annual_growth_in_unit_sales']))
      valueArr.sort((a, b)  => b - a);
     })
     return;
  })
  
  d3.select('#sec3-leftCard')
    .append('g')
        .attr('id', 'sec3-table');
        
  for (var i = 0; i < cityGrowth.length; i++) {
    for (var j = 0; j < valueArr.length; j++) {
      if (valueArr[i] == cityGrowth[j].growth) {
        count += 1;
        let topMarket = [count, cityGrowth[j].city, `+${valueArr[i]}%`];
        if (count < 13) {
          tablePerRow(_RankColumn, topMarket, count-1, _margin.titleTop * -1.2, 'mint-body')
          totalTopMarket.push(topMarket)
        }
      }
    }
  }
  onTopMapSec3(totalTopMarket);
}

function onCurrentMarketSec3(regionOpt){
  let dropdown = d3.select('#sec3-leftCard')
                  .append("g")
                      .attr("id", `dropdown_${regionOpt}`)
                      .attr('transform', `translate(${_tablePadding.left}, -${_margin.all/2.4})`);
      dropdown.append("rect")
                  .attr("x", 0)
                  .attr("y",  _margin.bodyTop)
                  .attr("class", `select_${regionOpt}`)
                  .attr("width", _canvasWidth / 3.6 - (_tablePadding.left * 2))
                  .attr("height", _canvasHeight * onGetRatio(56, null, 900))
                  .attr('stroke', _color.bg[2])
                  .attr('fill', _color.lime);
      dropdown.append("text")
                  .attr("x", _margin.offset)
                  .attr("y", _margin.bodyTop + (_margin.offset / 1.2))
                  .attr("alignment-baseline", 'hanging')
                  .attr("class", 'green-body')
                  .text(regionOpt);
      dropdown.append("text")
                  .text("▾")
                  .attr("x", _canvasWidth * onGetRatio(386, 1920, null))
                  .attr("y", _margin.bodyTop + (_margin.offset * 1.8))
                  .attr("font-size", '110%')
                  .attr("fill",  _color.bg[2]);
      let sec3Table = d3.select('#sec3-leftCard')
                  .append('g')
                      .attr('id', 'sec3-table')

      reCsv.forEach(item => {
        if(item.key == regionOpt) {
         item.values.map((value, index) => {
            let valueArr = [value['City'], (parseInt(value['annual_volume_in_unit_sales'].replace(/"|\,|\./g, '')) * 0.000001).toFixed(1) + 'B', '+' + value['annual_growth_in_unit_sales']]
            tablePerRow(_tableColumn, valueArr, index, 0, 'green-body')
          })
        }
      })

      let options = d3.select('#sec3-leftCard')
                        .append("g")
                          .attr('transform', `translate(${_tablePadding.left}, ${_margin.bodyTop - _canvasHeight * onGetRatio(34, null, 900)})`)
                          .attr("opacity", 0)
                          .on("click", handleSelectClick)
                          .attr("cursor", "pointer");                    
      options.append("rect")
                .attr('class', 'option')
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", _canvasWidth / 3.6 - (_tablePadding.left * 2))
                .attr("height", _canvasHeight * onGetRatio(400, null, 900))
                .attr('fill', _color.lime)
                .attr('stroke', _color.bg[2]);
      options.selectAll('text.body')
                .data(reCsv)
                .enter()
                .append("text")
                .attr("id", d => `txt_${d.key}`)
                .attr("x", () => _margin.offset)
                .attr("y", (d, i) => _margin.offset + (_margin.offset * 2.34 * i) - (_canvasHeight * onGetRatio(3, null, 900)))
                .attr("alignment-baseline", 'hanging')
                .attr("class", 'green-body')
                .text(d => d.key);
      options.append("text")
                .text("▴")
                .attr("x", _canvasWidth * onGetRatio(380, 1920, null))
                .attr("y", (_margin.offset * 1.84))
                .attr("font-size", '110%')
                .attr("fill",  _color.bg[2]);
      
      onCurrentMapSec3(regionOpt);
}

function onInitSec3(tabOpt){
  console.log(tabOpt)
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
       section.append('text')
                .attr('class', 'mint-caption')
                .attr('x', _canvasWidth - _margin.all)
                .attr('y', _margin.titleTop)
                .attr('text-anchor', 'end')
                .text('Census Data will appear when you hovor any city point.');

  if (tabOpt == 'tab1') {
    let annualSale = section.append('g')
                              .attr('transform', `translate(${_margin.all}, ${_margin.bodyTop})`)
                              .attr('id', 'sec3-leftCard');
        annualSale.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', _canvasWidth / 3.6)
                    .attr('height', _canvasHeight - _margin.bodyTop - _margin.all)
                    .attr('fill', _color.lighterGreen);
        let tabSelected = annualSale.append('g')
                                      .attr('id', 'sec3-tab1')
                                      .attr('transform', `translate(0, 0)`)
                                      .on("click", handleTabClick)
                                      .attr("cursor", "pointer");
            tabSelected.append('rect')
                          .attr('x', 0)
                          .attr('y', 0)
                          .attr('id', 'rect-tab1')
                          .attr('width', _canvasWidth / 8.2)
                          .attr('height', _canvasHeight * onGetRatio(76, null, 900))
                          .attr('fill', _color.lighterGreen);
            tabSelected.append('text')
                          .attr('x', _tablePadding.left)
                          .attr('y', _tablePadding.top)
                          .attr('id', 'text-tab1')
                          .text('Current Market')
                          .attr('class', 'lime-body');

        let tabUnselected = annualSale.append('g')
                                          .attr('id', 'sec3-tab2')
                                          .attr('transform', `translate(${_canvasWidth / 8.2}, 0)`)
                                          .on("click", handleTabClick)
                                          .attr("cursor", "pointer");
        tabUnselected.append('rect')
                        .attr('x', 0)
                        .attr('y', 0)
                        .attr('id', 'rect-tab2')
                        .attr('width', _canvasWidth / 6.42)
                        .attr('height', _canvasHeight * onGetRatio(76, null, 900))
                        .attr('fill', _color.darkerGreen);
        tabUnselected.append('text')
                        .attr('x', _canvasWidth / 7.8)
                        .attr('y', _tablePadding.top)
                        .attr('id', 'text-tab2')
                        .attr('text-anchor', 'end')
                        .text('Top Reporting Market')
                        .attr('class', 'mint-body');
  } else {
    d3.select('#sec3-leftCard').remove();
      let annualSale = section.append('g')
                              .attr('transform', `translate(${_margin.all}, ${_margin.bodyTop})`)
                              .attr('id', 'sec3-leftCard');
        annualSale.append('rect')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', _canvasWidth / 3.6)
                    .attr('height', _canvasHeight - _margin.bodyTop - _margin.all)
                    .attr('fill', _color.darkerGreen);
    let tabUnselected = annualSale.append('g')
                                    .attr('id', 'sec3-tab1')
                                    .attr('transform', `translate(0, 0)`)
                                    .on("click", handleTabClick)
                                    .attr("cursor", "pointer");
        tabUnselected.append('rect')
                        .attr('x', 0)
                        .attr('y', 0)
                        .attr('id', 'rect-tab1')
                        .attr('width', _canvasWidth / 8.2)
                        .attr('height', _canvasHeight * onGetRatio(76, null, 900))
                        .attr('fill', _color.lighterGreen);
        tabUnselected.append('text')
                        .attr('x', _tablePadding.left)
                        .attr('y', _tablePadding.top)
                        .attr('id', 'text-tab1')
                        .text('Current Market')
                        .attr('class', 'lime-body');

    let tabSelected = annualSale.append('g')
                                      .attr('id', 'sec3-tab2')
                                      .attr('transform', `translate(${_canvasWidth / 8.2}, 0)`)
                                      .on("click", handleTabClick)
                                      .attr("cursor", "pointer");
        tabSelected.append('rect')
                      .attr('x', 0)
                      .attr('y', 0)
                      .attr('id', 'rect-tab2')
                      .attr('width', _canvasWidth / 6.42)
                      .attr('height', _canvasHeight * onGetRatio(76, null, 900))
                      .attr('fill', _color.darkerGreen);
        tabSelected.append('text')
                      .attr('x', _canvasWidth / 7.8)
                      .attr('y', _tablePadding.top)
                      .attr('id', 'text-tab2')
                      .attr('text-anchor', 'end')
                      .text('Top Reporting Market')
                      .attr('class', 'mint-body');
  }
}


let initTab = 'tab1';
let regionOpt = previousRegion = 'Northeast';
onInitSec3(initTab);
onCurrentMarketSec3(regionOpt);

}).catch(function(err) {
console.log(err);
})