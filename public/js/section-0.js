// SET VARIABLES
const _descSec1 = ["Avocado’s nutrition and feature.",
                   `The avocado is prized for its high nutrient value and is added to various dishes due to its good flavor and rich texture (health line.com). \nThese days, this food has become an incredibly popular food among health conscious individuals. It’s often referred to as a superfood, which is not surprising given its health properties (Hass avocado composition and potential health effects).`,
                    "Source: www.tridge.com, www.hassavocadoboard.com",
                    "1/3 Medium (50g)"]
const sec1SVGSources = ["img/avocado_outline.SVG", "img/avocado_layer_00.SVG", 
                        "img/avocado_layer_01.SVG", "img/avocado_layer_02.SVG", 
                        "img/avocado_layer_03.SVG"];
const avocado1Desc = {main_nutrition_text: ['Copper', 'Total fat', 'Pantothenic acid', 'Multi vitamins', 'Other'],
                      sub_nutirition1: 'B6  B9  C  E  K',
                      sub_nutirition2: 'Carotenoids  Lutein  Zinc  Fiber  Mangaese  Magnesium  Thiamin  Niacin  Iron',
                      nutrition_pct: [5, 5, 14, 36, 40],
                      layer_dsc: ['Exocarp', 'Mesocarp', 'Endocarp', 'Seed']}              
const _spacingSec1 = {scaleRatio: [1, 0.95, 0.9, 0.76, 0.4], 
                      avocado1XRatio: [1.4, 1.36, 1.32, 1.23, 1.16], 
                      avocado1YRatio: [1.1, 1.27, 1.56, 2.36, 3.3], 
                      avocado2XRatio: [0.84, 0.84, 0.86, 0.855], 
                      avocado2YRatio: [1.05, 1.5, 2.29, 2.8]};
const _color =  { scale: ['#bfb23c', '#92a740', '#528736', '#385e2b', '#213a1a'],
                  bg : ['#eeefd3', '#cfd6b9', '#94593f'],
                  brown: '#423b2b',
                  lighterBrown: '#725744',
                  yellow: '#f2eaa7',
                  darkerGreen: '#6a8939',
                  lighterGreen: '#92a740',
                  darkerIvory: '#a8a09b',
                  orangeLine: '#f7931e',
                  orangelineText: '#725744',
                  soil: '#94593f',
                  ivory: '#f4f3ce'};
var _fontStyle = { title: { weight: '900', size: 0, family: 'Alegreya Sans SC', lineHeight: 0},
                   subtitle: { weight: '400', size:0, family: 'Roboto', lineHeight: 0},
                   body: { weight: '400', size:0, family: 'Roboto', lineHeight:  0},
                   caption: { weight: '400', size:0, family: 'Roboto', lineHeight: 0}}

const _colorArr = { brownDark:'rgba(66, 59, 43, ', brownLighter: 'rgba(96, 88, 73, ', brownLightest: 'rgba(168, 160, 155, '};
let _canvasWidth, _canvasHeight, _startX, _startY, _sec1TitleY, _sec1BodyY, _sec1CaptionY, _sec1Avocado1X, _sec1Avocado1LineX, _sec1Avocado1Y, _sec1Avocado2X, _sec1Avocado2LineX
const svgNS = "http://www.w3.org/2000/svg";


//  SET PREFIX
window.requestAnimationFrame = (function(){
  return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback){
          window.setTimeout(callback, 1000 / 60);
      };
})();

// SET FUNCTIONS
function onGetRatio(val1, val2, isFloor = false){
  if (isFloor) {
    return Math.floor(val1 / val2);
  } else {
    return val1 / val2;
  }
}


function onTweenSec1(sec1Svg) {
  const setAvoWidth         = _canvasWidth * onGetRatio(380, 1920);
  const setAvoHeight        = _canvasHeight * onGetRatio(568, 900);
  const AvoMargin           = _canvasWidth * onGetRatio(2, 1920);
  const rect1RefHeight      = (setAvoHeight - (AvoMargin * 2)) * -1 * _spacingSec1.scaleRatio[0];
  const rect2RefHeight      = (setAvoHeight - (AvoMargin * 2)) * -1 * _spacingSec1.scaleRatio[1];
  const rect3RefHeight      = (setAvoHeight - (AvoMargin * 2)) * -1 * _spacingSec1.scaleRatio[2];
  const rect4RefHeight      = (setAvoHeight - (AvoMargin * 2)) * -1 * _spacingSec1.scaleRatio[3];
  const rect5RefHeight      = (setAvoHeight - (AvoMargin * 2)) * -1 * _spacingSec1.scaleRatio[4];
  const Avo2CenterX         = _sec1Avocado2X + (setAvoWidth / 2);
  const Avo2CenterY         = _sec1Avocado1Y + (setAvoHeight / 2);
  const parentEl = document.createElementNS(svgNS, 'g');
        parentEl.setAttributeNS(null, 'id', 'sec1-avocado1');
  const parentE2 = document.createElementNS(svgNS, 'g');
        parentE2.setAttributeNS(null, 'id', 'sec1-avocado2');

   // draw rect
   console.log(_sec1Avocado1X + AvoMargin, setAvoHeight + _sec1Avocado1Y - AvoMargin, setAvoWidth - (AvoMargin * 2), rect1RefHeight)
   const rectEl1 = document.createElementNS(svgNS, 'rect');
         rectEl1.setAttributeNS(null, 'x', _sec1Avocado1X + AvoMargin);
         rectEl1.setAttributeNS(null, 'y', setAvoHeight + _sec1Avocado1Y - AvoMargin);
         rectEl1.setAttributeNS(null, 'width', setAvoWidth - (AvoMargin * 2));
         rectEl1.setAttributeNS(null, 'height', rect1RefHeight)
   const rectEl2 = document.createElementNS(svgNS, 'rect');
   const rectEl3 = document.createElementNS(svgNS, 'rect');
   const rectEl4 = document.createElementNS(svgNS, 'rect');
   const rectEl5 = document.createElementNS(svgNS, 'rect');
         parentEl.appendChild(rectEl1);
         parentEl.appendChild(rectEl2);
         parentEl.appendChild(rectEl3);
         parentEl.appendChild(rectEl4);
         parentEl.appendChild(rectEl5);
  // draw avocado1
  const avocadoImg1 = document.createElementNS(svgNS, 'image');
        avocadoImg1.setAttributeNS(null, 'href', sec1SVGSources[0]);
        avocadoImg1.setAttributeNS(null, 'x', _sec1Avocado1X);
        avocadoImg1.setAttributeNS(null, 'y', _sec1Avocado1Y);
        avocadoImg1.setAttributeNS(null, 'width', setAvoWidth);
        avocadoImg1.setAttributeNS(null, 'height', setAvoHeight)
        parentEl.appendChild(avocadoImg1);
        sec1Svg.appendChild(parentEl);

  // draw avocado2
  const avocadoImg2a = document.createElementNS(svgNS, 'image');
        avocadoImg2a.setAttributeNS(null, 'href', sec1SVGSources[1]);
        avocadoImg2a.setAttributeNS(null, 'x', Avo2CenterX - (setAvoWidth/2));
        avocadoImg2a.setAttributeNS(null, 'y', Avo2CenterY - (setAvoHeight/2));
        avocadoImg2a.setAttributeNS(null, 'width', setAvoWidth);
        avocadoImg2a.setAttributeNS(null, 'height', setAvoHeight)
  const avocadoImg2b = document.createElementNS(svgNS, 'image');
        avocadoImg2b.setAttributeNS(null, 'href', sec1SVGSources[2]);
        avocadoImg2b.setAttributeNS(null, 'x', Avo2CenterX - (setAvoWidth/2));
        avocadoImg2b.setAttributeNS(null, 'y', Avo2CenterY - (setAvoHeight/2));
        avocadoImg2b.setAttributeNS(null, 'width', setAvoWidth);
        avocadoImg2b.setAttributeNS(null, 'height', setAvoHeight)
  const avocadoImg2c = document.createElementNS(svgNS, 'image');
        avocadoImg2c.setAttributeNS(null, 'href', sec1SVGSources[3]);
        avocadoImg2c.setAttributeNS(null, 'x', Avo2CenterX - (setAvoWidth/2));
        avocadoImg2c.setAttributeNS(null, 'y', Avo2CenterY - (setAvoHeight/2));
        avocadoImg2c.setAttributeNS(null, 'width', setAvoWidth);
        avocadoImg2c.setAttributeNS(null, 'height', setAvoHeight)
  const avocadoImg2d = document.createElementNS(svgNS, 'image');
        avocadoImg2d.setAttributeNS(null, 'href', sec1SVGSources[4]);
        avocadoImg2d.setAttributeNS(null, 'x', Avo2CenterX - (setAvoWidth/2));
        avocadoImg2d.setAttributeNS(null, 'y', Avo2CenterY - (setAvoHeight/2));
        avocadoImg2d.setAttributeNS(null, 'width', setAvoWidth);
        avocadoImg2d.setAttributeNS(null, 'height', setAvoHeight)
        parentE2.appendChild(avocadoImg2a);
        parentE2.appendChild(avocadoImg2b);
        parentE2.appendChild(avocadoImg2c);
        parentE2.appendChild(avocadoImg2d);
        sec1Svg.appendChild(parentE2);
  
}

function onSec1WrapText(text, textStyle, maxTextWidth, sec1TextGroup){
  let words = text.split(' ');
  let line = '';
  let startY = 0;

  let textGroupEl = document.createElementNS(svgNS, 'g');
      textGroupEl.setAttributeNS(null, 'class', 'textGroups');
  let textElement = document.createElementNS(svgNS,"text")
      textElement.setAttributeNS(null, "class", textStyle.class);
  let tspanElement = document.createElementNS(svgNS,"tspan");
      tspanElement.setAttributeNS(null, "id", "PROCESSING");
  let tsponNode = document.createTextNode("busy");
      tspanElement.appendChild(tsponNode);
      textElement.appendChild(tspanElement);
      textGroupEl.appendChild(textElement);
      sec1TextGroup.appendChild(textGroupEl);
  let lineHeight = textElement.getBoundingClientRect().height;
  if (textElement.classList[0] == 'title') {
    lineHeight = lineHeight * 0.72;
  }
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let testElem = document.getElementById('PROCESSING');
    testElem.innerHTML = testLine;
    var testWidth = testElem.getBoundingClientRect().width;

    if (testLine.includes('\n')) {
      line = line.split('\n');
      if (line[0] != 'undefined') {
        textElement.innerHTML += `<tspan x="0" dy="${startY}" alignment-baseline="${textStyle['alignment-baseline']}" text-anchor="${textStyle['text-anchor']}"class="${textStyle.class}">${line[0]}</tspan>`;
      }
      line = line[1] + words[n] + ' ';
    } else if (testWidth > maxTextWidth && n > 0 ) {
      startY = lineHeight;
      if (line.startsWith('These')){
        startY = startY + (lineHeight * 0.8)
      }
      textElement.innerHTML += `<tspan x="0" dy="${startY}" alignment-baseline="${textStyle['alignment-baseline']}" text-anchor="${textStyle['text-anchor']}"class="${textStyle.class}">${line}</tspan>`;
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  textElement.innerHTML += `<tspan x="0" dy="${startY}" alignment-baseline="${textStyle['alignment-baseline']}" text-anchor="${textStyle['text-anchor']}"class="${textStyle.class}">${line}</tspan>`;
  document.getElementById("PROCESSING").remove();
  textGroupEl.setAttributeNS(null, 'transform', `translate(${textStyle.x}, ${textStyle.y})`);
  
};

function onSec1init() {
  const sec1TxtStyle = [{ x: _startX, y: _sec1TitleY, 'alignment-baseline': "hanging", 'text-anchor': "start", class: 'title'},
                        { x: _startX, y: _sec1BodyY, 'alignment-baseline': "hanging", 'text-anchor': "start", class: 'body'},
                        { x: _startX, y: _sec1CaptionY, 'alignment-baseline': "baseline", 'text-anchor': "start", class: 'caption'},
                        { x: _canvasWidth/3 * 2, y: _sec1CaptionY, 'alignment-baseline': "baseline", 'text-anchor': "end", class: 'caption'}]
  const sec1Svg = document.getElementById('section-0');
        sec1Svg.setAttribute('width', _canvasWidth);
        sec1Svg.setAttribute('height', _canvasHeight);
  const sec1TextGroup = document.createElementNS(svgNS, 'g');
        sec1TextGroup.setAttributeNS(null, 'id', 'sec1-text');
  const sec1BgGroup = document.createElementNS(svgNS, 'g');
        sec1BgGroup.setAttributeNS(null, 'id', 'sec1-bg&bar');
  const rectBG = document.createElementNS(svgNS, 'rect');
        rectBG.setAttributeNS(null, 'x', 0);
        rectBG.setAttributeNS(null, 'y', 0);
        rectBG.setAttributeNS(null, 'width', _canvasWidth);
        rectBG.setAttributeNS(null, 'height', _canvasHeight)
        rectBG.setAttributeNS(null, 'fill', _color.bg[0]);
        sec1BgGroup.appendChild(rectBG);
  const rectBar = document.createElementNS(svgNS, 'rect');
        rectBar.setAttributeNS(null, 'x', _startX);
        rectBar.setAttributeNS(null, 'y', _startX);
        rectBar.setAttributeNS(null, 'width', _canvasWidth - (_startX * 2));
        rectBar.setAttributeNS(null, 'height', _canvasHeight * onGetRatio(10, 900));
        rectBar.setAttributeNS(null, 'fill', _color.brown);
        sec1BgGroup.appendChild(rectBar);
        sec1Svg.appendChild(sec1BgGroup);
        sec1Svg.appendChild(sec1TextGroup);
  for (var i = 0; i < 4; i++) {
    onSec1WrapText(_descSec1[i], sec1TxtStyle[i], _canvasWidth * onGetRatio(480, 1920), sec1TextGroup);
  }
  onTweenSec1(sec1Svg)
}

//  Set Initial settings of canvas
function onInit(){
    _canvasWidth = window.innerWidth < 1920 ? Math.floor(window.innerWidth): 1920;
    _canvasHeight = window.innerWidth < 1920 ? Math.floor(window.innerWidth / 2.14) : 900;
    console.log('Width', _canvasWidth, 'Height', _canvasHeight)
    _startX                         = _canvasWidth * onGetRatio(80, 1920);
    _startY                         = _canvasWidth * onGetRatio(120, 1920);
    _sec1TitleY                     = _canvasHeight * onGetRatio(120, 900);
    _sec1BodyY                      = _canvasHeight * onGetRatio(370, 900);
    _sec1CaptionY                   = _canvasHeight * onGetRatio(819, 900);
    _sec1Avocado1X                  = _canvasWidth * onGetRatio(788, 1920);
    _sec1Avocado1LineX              = _canvasWidth * onGetRatio(712, 1920);
    _sec1Avocado1Y                  = _canvasHeight * onGetRatio(198, 900);
    _sec1Avocado2X                  = _canvasWidth * onGetRatio(1280, 1920);
    _sec1Avocado2LineX              = _canvasWidth * onGetRatio(1738, 1920);
    
    onSec1init();
};

onInit();

// ON WINDOW RESIZE
window.addEventListener('resize', () => {
    var x = window.innerWidth;
    var y = window.innerHeight / 3;
    console.log("resize", x, y);
});
