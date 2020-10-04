// SET VARIABLES
const _sec1WrapText = ["Avocado’s nutrition and feature.",
                   `The avocado is prized for its high nutrient value and is added to various dishes due to its good flavor and rich texture (health line.com). \nThese days, this food has become an incredibly popular food among health conscious individuals. It’s often referred to as a superfood, which is not surprising given its health properties (Hass avocado composition and potential health effects).`,
                    "Source: www.tridge.com, www.hassavocadoboard.com",
                    "1/3 Medium (50g)"]
const _sec1SVGSources = ["img/avocado_outline.SVG", "img/avocado_layer_00.SVG", 
                        "img/avocado_layer_01.SVG", "img/avocado_layer_02.SVG", 
                        "img/avocado_layer_03.SVG"];
const _sec1ImgDesc = {innerDesc: ['Copper', 'Total fat', 'Pantothenic acid', 'Multi vitamins', 'Other', 'B6  B9  C  E  K', 'Carotenoids  Lutein  Zinc  Fiber  Mangaese  Magnesium  Thiamin  Niacin  Iron'],
                      outerDesc: [5, 5, 14, 36, 40, 'Exocarp', 'Mesocarp', 'Endocarp', 'Seed']}              
const _sec1PSpacing = {scaleRatio: [1, 0.6, 0.24, 0.1, 0.05],
                       avocado1innerDescRatio: [1.1, 1.25, 1.56, 2.26, 3.24, 2.4, 3.4],
                       avocadoDescXRatio: [1.4, 1.36, 1.32, 1.23, 1.16, 0.84, 0.84, 0.86, 0.868], 
                       avocadoDescYRatio: [1.1, 1.27, 1.56, 2.36, 3.3, 1.05, 1.5, 2.27, 2.8]};
const _color =  { scale: ['#213a1a', '#385e2b', '#528736', '#92a740', '#af9a1c'],
                  bg : ['#eeefd3', '#cfd6b9', '#384435'],
                  treemap: ['#423b2b', '#423b2b', '#364430', '#385e2b', '#528736', '#92a740', '#af9a1c'],
                  brown: '#423b2b',
                  lighterBrown: '#605849',
                  lighterGreen: '#92a740',
                  orangeLine: '#f7931e',
                  lime: '#e6eca2',
                  mapSelect: '#e6eca2',
                  citySelect: '#94593f',
                  ivory: '#f7f5e7',
                  darkerGreen: '#4e6047'};
var _fontStyle = { title: { weight: '900', size: 0, family: 'Alegreya Sans SC', lineHeight: 0},
                   subtitle: { weight: '400', size:0, family: 'Roboto', lineHeight: 0},
                   body: { weight: '400', size:0, family: 'Roboto', lineHeight:  0},
                   caption: { weight: '400', size:0, family: 'Roboto', lineHeight: 0}}

let _canvasWidth, _canvasHeight, _startX, _startY, _sec1TitleY, _sec1BodyY, _sec1CaptionY, _sec1Avocado1X, _sec1Avocado1LineX, _sec1Avocado1Y, _sec1Avocado2X, _sec1Avocado2LineX;
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
function onGetRatio(val, width, height){
  if (width) {
    return val / width;
  } else {
    return val / height;
  }
}

function onTweenSec1(sec1Svg) {
  const setAvoWidth         = _canvasWidth * onGetRatio(412, 1920, null);
  const setAvoHeight        = _canvasHeight * onGetRatio(600, null, 900);
  const AvoMargin           = _canvasWidth * onGetRatio(2, 1920, null);
  const Avo2CenterX         = _sec1Avocado2X + (setAvoWidth / 2);
  const Avo2CenterY         = _sec1Avocado1Y + (setAvoHeight / 2);
  const parentEl = document.createElementNS(svgNS, 'g');
        parentEl.setAttributeNS(null, 'id', 'avocado1');
  const parentE2 = document.createElementNS(svgNS, 'g');
        parentE2.setAttributeNS(null, 'id', 'avocado2');
  let Avo1CenterX, textClass, descX1, descX2, targetEl, tNode, textAnchor, textPaddingToLine;
  // console.log('setAvoWidth', setAvoWidth, 'setAvoWidth', setAvoHeight);
  // draw rects
  for (var j = 0; j < 5; j++) {
    let rectEls = document.createElementNS(svgNS, 'rect');
        rectEls.setAttributeNS(null, 'id', `rectEl${j}`);
        rectEls.setAttributeNS(null, 'x', _sec1Avocado1X);
        rectEls.setAttributeNS(null, 'y', _sec1Avocado1Y);
        rectEls.setAttributeNS(null, 'width', setAvoWidth - (AvoMargin * 2));
        rectEls.setAttributeNS(null, 'height', setAvoHeight * _sec1PSpacing.scaleRatio[j] - AvoMargin);
        rectEls.setAttributeNS(null, 'fill', _color.scale[j]);
        parentEl.appendChild(rectEls);
  }

  // draw avocado1
  const avocadoImg1 = document.createElementNS(svgNS, 'image');
        avocadoImg1.setAttributeNS(null, 'href', _sec1SVGSources[0]);
        avocadoImg1.setAttributeNS(null, 'x', _sec1Avocado1X - AvoMargin);
        avocadoImg1.setAttributeNS(null, 'y', _sec1Avocado1Y - AvoMargin);
        avocadoImg1.setAttributeNS(null, 'width', setAvoWidth);
        avocadoImg1.setAttributeNS(null, 'height', setAvoHeight + AvoMargin)
        parentEl.appendChild(avocadoImg1);

  // draw avocado2
  for (var h = 1; h < 5; h++) {
    const avocadoImg2 = document.createElementNS(svgNS, 'image');
    avocadoImg2.setAttributeNS(null, 'id', `avocadoImg${h}`);
        avocadoImg2.setAttributeNS(null, 'href', _sec1SVGSources[h]);
        avocadoImg2.setAttributeNS(null, 'x', Avo2CenterX - (setAvoWidth/2));
        avocadoImg2.setAttributeNS(null, 'y', Avo2CenterY - (setAvoHeight/2));
        avocadoImg2.setAttributeNS(null, 'width', setAvoWidth);
        avocadoImg2.setAttributeNS(null, 'height', setAvoHeight)
        parentE2.appendChild(avocadoImg2);
  }

  // draw innerText - avocado1 only
  for(var k = 0; k < 7; k++) {
    if (k < 6) {
      textClass = 'avo-white-caption';
      Avo1CenterX = _sec1Avocado1X + (_canvasWidth * onGetRatio(260, 1920, null));
      if (k == 3) {
        Avo1CenterX = _sec1Avocado1X + (_canvasWidth * onGetRatio(220, 1920, null));
      } else if (k == 4) {
        Avo1CenterX = _sec1Avocado1X + (_canvasWidth * onGetRatio(210, 1920, null));
      } else if (k == 5) {
        textClass = 'avo-green-caption';
        Avo1CenterX = _sec1Avocado1X + (_canvasWidth * onGetRatio(224, 1920, null));
      }
      let avoInnerTextEls = document.createElementNS(svgNS, 'text');
          avoInnerTextEls.setAttributeNS(null, 'id', `avoInnerText${k}`);
          avoInnerTextEls.setAttributeNS(null, 'class', textClass);
          avoInnerTextEls.setAttributeNS(null, 'text-anchor', 'middle');
          avoInnerTextEls.setAttributeNS(null, 'x', Avo1CenterX);
          avoInnerTextEls.setAttributeNS(null, 'y', _sec1Avocado1Y * _sec1PSpacing.avocado1innerDescRatio[k]);
      let textNode = document.createTextNode(_sec1ImgDesc.innerDesc[k]);
          avoInnerTextEls.appendChild(textNode);
          parentEl.appendChild(avoInnerTextEls);
    } else {
      Avo1CenterX = _sec1Avocado1X + (_canvasWidth * onGetRatio(210, 1920, null));
      let innerDescText = _sec1ImgDesc.innerDesc[k].split('Mangaese');
        let textGroupEl = document.createElementNS(svgNS, 'g');
            textGroupEl.setAttributeNS(null, 'class', 'copyG');
        let textElement1 = document.createElementNS(svgNS,"text");
            textElement1.setAttributeNS(null, "class", 'avo-green-caption');
            textElement1.setAttributeNS(null, "text-anchor", 'middle');
        let textElement2 = document.createElementNS(svgNS,"text");
            textElement2.setAttributeNS(null, "y", setAvoHeight * onGetRatio(40, null, 900));
            textElement2.setAttributeNS(null, "class", 'avo-green-caption');
            textElement2.setAttributeNS(null, "text-anchor", 'middle');
        let tsponNode1 = document.createTextNode(innerDescText[0]);
        let tsponNode2 = document.createTextNode(innerDescText[1]);
            textElement1.appendChild(tsponNode1);
            textElement2.appendChild(tsponNode2);
            textGroupEl.appendChild(textElement1);
            textGroupEl.appendChild(textElement2);
            parentEl.appendChild(textGroupEl);
        textGroupEl.setAttributeNS(null, 'transform', `translate(${Avo1CenterX}, ${_sec1Avocado1Y * _sec1PSpacing.avocado1innerDescRatio[k]})`);
    }
  }

  for (var i = 0; i < 9; i++) { 
    // draw circles
    if (i < 5) {
      descX1 = _sec1Avocado1LineX * _sec1PSpacing.avocadoDescXRatio[i]
      descX2 = _sec1Avocado1LineX;
      targetEl = parentEl;
      tNode = `${_sec1ImgDesc.outerDesc[i]}%`;
      textAnchor = 'end'
      textPaddingToLine = _canvasWidth * onGetRatio(12, 1920, null);
    } else {
      descX1 = _sec1Avocado2LineX * _sec1PSpacing.avocadoDescXRatio[i]
      descX2 = _sec1Avocado2LineX;
      targetEl = parentE2;
      tNode = `${_sec1ImgDesc.outerDesc[i]}`;
      textAnchor = 'start'
      textPaddingToLine = _canvasWidth * onGetRatio(12, 1920, null) * -1;
    }
    let avoCircleEls = document.createElementNS(svgNS, 'circle');
        avoCircleEls.setAttributeNS(null, 'id', `avocadoDescCircle${i}`);
        avoCircleEls.setAttributeNS(null, 'cx', descX1);
        avoCircleEls.setAttributeNS(null, 'cy', _sec1Avocado1Y * _sec1PSpacing.avocadoDescYRatio[i]);
        avoCircleEls.setAttributeNS(null, 'r', setAvoWidth * 0.01);
        avoCircleEls.setAttributeNS(null, 'fill', _color.orangeLine);
        targetEl.appendChild(avoCircleEls);
    // draw lines
    let avoLineEls = document.createElementNS(svgNS, 'line');
        avoLineEls.setAttributeNS(null, 'id', `avocadoDescLine${i}`);
        avoLineEls.setAttributeNS(null, 'x1', descX1);
        avoLineEls.setAttributeNS(null, 'x2', descX2);
        avoLineEls.setAttributeNS(null, 'y1', _sec1Avocado1Y * _sec1PSpacing.avocadoDescYRatio[i]);
        avoLineEls.setAttributeNS(null, 'y2', _sec1Avocado1Y * _sec1PSpacing.avocadoDescYRatio[i]);
        avoLineEls.setAttributeNS(null, 'stroke', _color.orangeLine);
        targetEl.appendChild(avoLineEls);
    //  draw outerText
    let avoOuterTextEls = document.createElementNS(svgNS, 'text');
        avoOuterTextEls.setAttributeNS(null, 'id', `avoOuterText${i}`);
        avoOuterTextEls.setAttributeNS(null, 'class', 'body');
        avoOuterTextEls.setAttributeNS(null, 'alignment-baseline', 'middle')
        avoOuterTextEls.setAttributeNS(null, 'text-anchor', textAnchor)
        avoOuterTextEls.setAttributeNS(null, 'x',  descX2 - textPaddingToLine);
        avoOuterTextEls.setAttributeNS(null, 'y',  _sec1Avocado1Y * _sec1PSpacing.avocadoDescYRatio[i]);
    let textNode = document.createTextNode(tNode);
        avoOuterTextEls.appendChild(textNode);
        targetEl.appendChild(avoOuterTextEls);
  }  
  sec1Svg.appendChild(parentEl);
  sec1Svg.appendChild(parentE2);
}

function on_Sec1WrapText(text, textStyle, maxTextWidth, sec1TextGroup){
  let words = text.split(' ');
  let line = '';
  let startY = 0;

  let textGroupEl = document.createElementNS(svgNS, 'g');
      textGroupEl.setAttributeNS(null, 'class', 'copyG');
  let textElement = document.createElementNS(svgNS,"text")
      textElement.setAttributeNS(null, "class", textStyle.class);
  let tspanElement = document.createElementNS(svgNS,"tspan");
      tspanElement.setAttributeNS(null, "id", "PROCESSING");
  let tsponNode = document.createTextNode("PROCESSING");
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
                        { x: _startX, y: _sec1CaptionY, 'alignment-baseline': "baseline", 'text-anchor': "start", class: 'grey-caption'},
                        { x: _canvasWidth/2.9 * 2, y: _sec1CaptionY, 'alignment-baseline': "baseline", 'text-anchor': "end", class: 'grey-caption'}]
  const sec1Svg = document.getElementById('section-1');
        sec1Svg.setAttribute('width', _canvasWidth);
        sec1Svg.setAttribute('height', _canvasHeight);
  const sec1TextGroup = document.createElementNS(svgNS, 'g');
        sec1TextGroup.setAttributeNS(null, 'id', 'sec1-Title');
  const sec1BgGroup = document.createElementNS(svgNS, 'g');
        sec1BgGroup.setAttributeNS(null, 'id', 'sec1-Bg&Bar');
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
        rectBar.setAttributeNS(null, 'height', _canvasHeight * onGetRatio(10, null, 900));
        rectBar.setAttributeNS(null, 'fill', _color.brown);
        sec1BgGroup.appendChild(rectBar);
        sec1Svg.appendChild(sec1BgGroup);
        sec1Svg.appendChild(sec1TextGroup);
  for (var i = 0; i < 4; i++) {
    on_Sec1WrapText(_sec1WrapText[i], sec1TxtStyle[i], _canvasWidth / 3.8, sec1TextGroup);
  }
  onTweenSec1(sec1Svg)
}

//  Set Initial settings of canvas
function onInit(){
    _canvasWidth = window.innerWidth < 1920 ? Math.floor(window.innerWidth): 1920;
    _canvasHeight = window.innerWidth < 1920 ? Math.floor(window.innerWidth / 2.14) : 900;
    console.log('Width', _canvasWidth, 'Height', _canvasHeight)
    _startX                         = _canvasWidth * onGetRatio(80, 1920, null);
    _startY                         = _canvasWidth * onGetRatio(120, 1920, null);
    _sec1TitleY                     = _canvasHeight * onGetRatio(120, null, 900);
    _sec1BodyY                      = _canvasHeight * onGetRatio(370, null, 900);
    _sec1CaptionY                   = _canvasHeight * onGetRatio(819, null, 900);
    _sec1Avocado1X                  = _canvasWidth * onGetRatio(788, 1920, null);
    _sec1Avocado1LineX              = _canvasWidth * onGetRatio(712, 1920, null);
    _sec1Avocado1Y                  = _canvasHeight * onGetRatio(198, null, 900);
    _sec1Avocado2X                  = _canvasWidth * onGetRatio(1280, 1920, null);
    _sec1Avocado2LineX              = _canvasWidth * onGetRatio(1722, 1920, null);
    
    onSec1init();
};

onInit();

// ON WINDOW RESIZE
window.addEventListener('resize', () => {
    var x = window.innerWidth;
    var y = window.innerHeight / 3;
    console.log("resize", x, y);
});
