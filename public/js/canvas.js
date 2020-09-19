// SET VARIABLES
const _canvas = document.getElementById('cavas-area');

const _descSec1 = {title: "Avocado’s nutrition and feature.",
                   body: "The avocado is prized for its high nutrient value and is added to various dishes due to its good flavor and rich texture (healthline.com). \nThese days, this food has become an incredibly popular food among health-conscious individuals. It’s often referred to as a superfood, which is not surprising given its health properties (Hass avocado composition and potential health effects).",
                   resource: "Source: www.tridge.com, www.hassavocadoboard.com",
                   caption: "1/3 Medium (50g)",
                   main_nutrition_text: ['Copper', 'Total fat', 'Pantothenic acid', 'Multi vitamins', 'Other'],
                   sub_nutirition1: 'B6  B9  C  E  K',
                   sub_nutirition2: 'Carotenoids  Lutein  Zinc  Fiber  Mangaese  Magnesium  Thiamin  Niacin  Iron',
                   nutrition_pct: [5, 5, 14, 36, 40],
                   layer_dsc: ['Exocarp', 'Mesocarp', 'Endocarp', 'Seed']};
const _descSec3 = {title: "Total U.S. unit sales annual growth, 2020",
                   option: "Current Market",
                   table: "Midsouth"}
const _spacingSec1 = {scaleRatio: [1, 0.95, 0.9, 0.76, 0.4], 
                      avocado1XRatio: [1.4, 1.36, 1.32, 1.23, 1.16], 
                      avocado1YRatio: [1.1, 1.27, 1.56, 2.36, 3.3], 
                      avocado2XRatio: [0.84, 0.84, 0.86, 0.855], 
                      avocado2YRatio: [1.05, 1.5, 2.29, 2.8]};
const _color =  { scale: ['#bfb23c', '#92a740', '#528736', '#385e2b', '#213a1a'],
                  bg : ['#eeefd3', '#cfd6b9', '#94593f'],
                  brown: '#423b2b',
                  lighterBrown: '#605849',
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
let _startX, _startY, _sec1TitleY, _sec1BodyY, _sec1CaptionY, _sec1Avocado1X, _sec1Avocado1Y, _sec1Avocado2X;
let newHeight = 0;


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

function onWrapText(ctx, text, startX, startY, maxTextWidth, lineHeight){
  let words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    let testWidth = Math.floor(metrics.width);
    if (line.includes('\n')) {
      line = line.split('\n');
      ctx.fillText(line[0], startX, startY);
      startY += (lineHeight / 2) + lineHeight;
      line = line[1] + words[n] + ' ';
    } else if (testWidth > maxTextWidth && n > 0 ) {
      ctx.fillText(line, startX, startY);
      line = words[n] + ' ';
      startY += lineHeight;
    } else {
      line = testLine;  
    }
  }
  ctx.fillText(line, startX, startY);
};

let _sec1Avocado1LineX;
let v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = 0;
function onTweenSec1_3of3(){
  let ctx                 = _canvas.getContext('2d');
  let AvoMargin           = _canvas.width * onGetRatio(2, 1920);
  let textPaddingToLine   = _canvas.width * onGetRatio(12, 1920);
  let line0Start = _sec1Avocado1LineX * _spacingSec1.avocado1XRatio[0];
  let line1Start = _sec1Avocado1LineX * _spacingSec1.avocado1XRatio[1];
  let line2Start = _sec1Avocado1LineX * _spacingSec1.avocado1XRatio[2];
  let line3Start = _sec1Avocado1LineX * _spacingSec1.avocado1XRatio[3];
  let line4Start = _sec1Avocado1LineX * _spacingSec1.avocado1XRatio[4];
  let line5Start = _sec1Avocado2LineX * _spacingSec1.avocado2XRatio[0];
  let line6Start = _sec1Avocado2LineX * _spacingSec1.avocado2XRatio[1];
  let line7Start = _sec1Avocado2LineX * _spacingSec1.avocado2XRatio[2];
  let line8Start = _sec1Avocado2LineX * _spacingSec1.avocado2XRatio[3];
  let lineAvocado1End = _sec1Avocado1LineX;
  let lineAvocado2End = _sec1Avocado2LineX;
  
  if (v0 == 0) {
    v0 = line0Start;
    v1 = line1Start;
    v2 = line2Start;
    v3 = line3Start;
    v4 = line4Start;
    v5 = line5Start;
    v6 = line6Start;
    v7 = line7Start;
    v8 = line8Start;
    requestAnimationFrame(onTweenSec1_3of3);
  } else if (v0 - lineAvocado1End < 1) {
    v0 = lineAvocado1End;
    v1 = lineAvocado1End;
    v2 = lineAvocado1End;
    v3 = lineAvocado1End;
    v4 = lineAvocado1End;
    v5 = lineAvocado2End;
    v6 = lineAvocado2End;
    v7 = lineAvocado2End;
    v8 = lineAvocado2End;
  } else {
    v0 = v0 - ((v0 - lineAvocado1End) / 6);
    v1 = v1 - ((v1 - lineAvocado1End) / 6);
    v2 = v2 - ((v2 - lineAvocado1End) / 6);
    v3 = v3 - ((v3 - lineAvocado1End) / 6);
    v4 = v4 - ((v4 - lineAvocado1End) / 6);
    v5 = v5 - ((v5 - lineAvocado2End) / 6);
    v6 = v6 - ((v6 - lineAvocado2End) / 7);
    v7 = v7 - ((v7 - lineAvocado2End) / 6);
    v8 = v8 - ((v8 - lineAvocado2End) / 6);
    requestAnimationFrame(onTweenSec1_3of3);
  }
  ctx.lineWidth = 0.1;
  onDrawLine(ctx, line0Start, v0, _sec1Avocado1Y * _spacingSec1.avocado1YRatio[0]);
  onDrawLine(ctx, line1Start, v1, _sec1Avocado1Y * _spacingSec1.avocado1YRatio[1]);
  onDrawLine(ctx, line2Start, v2, _sec1Avocado1Y * _spacingSec1.avocado1YRatio[2]);
  onDrawLine(ctx, line3Start, v3, _sec1Avocado1Y * _spacingSec1.avocado1YRatio[3]);
  onDrawLine(ctx, line4Start, v4, _sec1Avocado1Y * _spacingSec1.avocado1YRatio[4]);
  onDrawLine(ctx, line5Start, v5, _sec1Avocado1Y * _spacingSec1.avocado2YRatio[0]);
  onDrawLine(ctx, line6Start, v6, _sec1Avocado1Y * _spacingSec1.avocado2YRatio[1]);
  onDrawLine(ctx, line7Start, v7, _sec1Avocado1Y * _spacingSec1.avocado2YRatio[2]);
  onDrawLine(ctx, line8Start, v7, _sec1Avocado1Y * _spacingSec1.avocado2YRatio[3]);
  if (v0 == lineAvocado1End) {
    ctx.fillStyle = _color.orangelineText;
    for (var i = 0; i < 5; i++) {
      // Draw nutrition percentage
      ctx.textAlign = 'right';
      ctx.font = `${_fontStyle.body.weight} ${_fontStyle.body.size}px ${_fontStyle.body.family}`;
      ctx.fillText(`${_descSec1.nutrition_pct[i]}%`, _sec1Avocado1LineX - textPaddingToLine, _sec1Avocado1Y * _spacingSec1.avocado1YRatio[i] + (AvoMargin * 4));
      // Draw description text
      ctx.textAlign = 'left'
      ctx.font = `${_fontStyle.caption.weight} ${_fontStyle.caption.size}px ${_fontStyle.caption.family}`;
      ctx.fillText(_descSec1.layer_dsc[i], _sec1Avocado2LineX + textPaddingToLine, _sec1Avocado1Y * (_spacingSec1.avocado2YRatio[i]) + (AvoMargin * 4));
    }
  }
}

let avocadoOutline, loadImgCollection;
let imageloaded       = false;
let imageCount        = 0;
const sec1SVGName     = [ "avocado_outline", "avocado_layer_00", "avocado_layer_01", 
                          "avocado_layer_02", "avocado_layer_03"];
const sec1SVGSources  = [ "img/avocado_outline.SVG", "img/avocado_layer_00.SVG", 
                          "img/avocado_layer_01.SVG", "img/avocado_layer_02.SVG", 
                          "img/avocado_layer_03.SVG"];
let currentAvo2Width0 = currentAvo2Height0 = 0;
let currentAvo2Width1 = currentAvo2Height1 = 0;
let currentAvo2Width2 = currentAvo2Height2 = 0;
let currentAvo2Width3 = currentAvo2Height3 = 0;
let rect1height       = rect2height = rect3height = rect4height = rect5height = 0;
function onTweenSec1_2of3(){
  let ctx                 = _canvas.getContext('2d');
  let setAvoWidth         = _canvas.width * onGetRatio(416, 1920);
  let setAvoHeight        = _canvas.height * onGetRatio(604, 900);
  let AvoMargin           = _canvas.width * onGetRatio(2, 1920);
  // Avocado 1
  let rect1RefHeight      = (setAvoHeight - (AvoMargin * 2)) * -1 * _spacingSec1.scaleRatio[0];
  let rect2RefHeight      = (setAvoHeight - (AvoMargin * 2)) * -1 * _spacingSec1.scaleRatio[1];
  let rect3RefHeight      = (setAvoHeight - (AvoMargin * 2)) * -1 * _spacingSec1.scaleRatio[2];
  let rect4RefHeight      = (setAvoHeight - (AvoMargin * 2)) * -1 * _spacingSec1.scaleRatio[3];
  let rect5RefHeight      = (setAvoHeight - (AvoMargin * 2)) * -1 * _spacingSec1.scaleRatio[4];
  // Avocado 2
  let Avo2CenterX         = _sec1Avocado2X + (setAvoWidth / 2);
  let Avo2CenterY         = _sec1Avocado1Y + (setAvoHeight / 2);
  
  //check image loaded
  if (!imageloaded) {
    loadImgCollection = {};
    for (var i = 0; i < 5; i++) {
      loadImgCollection[sec1SVGName[i]] = new Image();
      loadImgCollection[sec1SVGName[i]].src = sec1SVGSources[i];
      loadImgCollection[sec1SVGName[i]].addEventListener('load', (evt) => {
        imageCount++;
        if(imageCount == 5){//total SVG:5
          imageloaded = true;
          onTweenSec1_2of3();
        }
      })
    }
  } else {
    if (Math.abs(rect1RefHeight - rect1height) < 1) {
      rect1height = rect1RefHeight;
      rect2height = rect2RefHeight;
      rect3height = rect3RefHeight;
      rect4height = rect4RefHeight;
      rect5height = rect5RefHeight;
      //avo2 width, height
      currentAvo2Width0   = currentAvo2Width1   = currentAvo2Width2   = currentAvo2Width3   = setAvoWidth;
      currentAvo2Height0  = currentAvo2Height1  = currentAvo2Height2  = currentAvo2Height3  = setAvoHeight;
    } else {
      rect1height += (rect1RefHeight - rect1height) / 14;
      rect2height += (rect2RefHeight - rect2height) / 14;
      rect3height += (rect3RefHeight - rect3height) / 14;
      rect4height += (rect4RefHeight - rect4height) / 14;
      rect5height += (rect5RefHeight - rect5height) / 14;
      currentAvo2Width0  += (setAvoWidth - currentAvo2Width0) / 4;
      currentAvo2Height0 += (setAvoHeight - currentAvo2Height0) / 4;
      currentAvo2Width1  += (setAvoWidth - currentAvo2Width1) / 8;
      currentAvo2Height1 += (setAvoHeight - currentAvo2Height1) / 8;
      currentAvo2Width2  += (setAvoWidth - currentAvo2Width2) / 12;
      currentAvo2Height2 += (setAvoHeight - currentAvo2Height2) / 12;
      currentAvo2Width3  += (setAvoWidth - currentAvo2Width3) / 14;
      currentAvo2Height3 += (setAvoHeight - currentAvo2Height3) / 14;
    }
    // First avocado //
    ctx.clearRect(_canvas.width / 3, _sec1Avocado1Y, _canvas.width / 3.2 - _startX, setAvoHeight);
    ctx.fillStyle = _color.bg[0];
    ctx.fillRect(_canvas.width / 3, _sec1Avocado1Y, _canvas.width / 3.2 - _startX + AvoMargin, setAvoHeight + (AvoMargin * 2));
    // Draw rect
    ctx.fillStyle = _color.scale[0];
    ctx.fillRect(_sec1Avocado1X + AvoMargin, setAvoHeight + _sec1Avocado1Y - AvoMargin, setAvoWidth - (AvoMargin * 2), rect1height);
    ctx.fillStyle = _color.scale[1];
    ctx.fillRect(_sec1Avocado1X + AvoMargin, setAvoHeight + _sec1Avocado1Y - AvoMargin, setAvoWidth - (AvoMargin * 2), rect2height);
    ctx.fillStyle = _color.scale[2];
    ctx.fillRect(_sec1Avocado1X + AvoMargin, setAvoHeight + _sec1Avocado1Y - AvoMargin, setAvoWidth - (AvoMargin * 2), rect3height);
    ctx.fillStyle = _color.scale[3];
    ctx.fillRect(_sec1Avocado1X + AvoMargin, setAvoHeight + _sec1Avocado1Y - AvoMargin, setAvoWidth - (AvoMargin * 2), rect4height);
    ctx.fillStyle = _color.scale[4];
    ctx.fillRect(_sec1Avocado1X + AvoMargin, setAvoHeight + _sec1Avocado1Y - AvoMargin, setAvoWidth - (AvoMargin * 2), rect5height);
    ctx.drawImage(loadImgCollection['avocado_outline'], _sec1Avocado1X, _sec1Avocado1Y, setAvoWidth, setAvoHeight);
    // Second avocado //
    ctx.clearRect(_sec1Avocado2X, _sec1Avocado1Y, _canvas.width / 2.8 - _startX, setAvoHeight);
    ctx.fillStyle = _color.bg[0];
    ctx.fillRect(_sec1Avocado2X, _sec1Avocado1Y, _canvas.width / 2.8 - _startX + AvoMargin, setAvoHeight);
    ctx.drawImage(loadImgCollection['avocado_layer_00'], Avo2CenterX - (currentAvo2Width0/2), Avo2CenterY - (currentAvo2Height0/2), currentAvo2Width0, currentAvo2Height0);
    ctx.drawImage(loadImgCollection['avocado_layer_01'], Avo2CenterX - (currentAvo2Width1/2), Avo2CenterY - (currentAvo2Height1/2), currentAvo2Width1, currentAvo2Height1);
    ctx.drawImage(loadImgCollection['avocado_layer_02'], Avo2CenterX - (currentAvo2Width2/2), Avo2CenterY - (currentAvo2Height2/2), currentAvo2Width2, currentAvo2Height2);
    ctx.drawImage(loadImgCollection['avocado_layer_03'], Avo2CenterX - (currentAvo2Width3/2), Avo2CenterY - (currentAvo2Height3/2), currentAvo2Width3, currentAvo2Height3);
   
    if(rect1height == rect1RefHeight){
      // Draw description text
      ctx.textAlign = 'center';
      ctx.font = `${_fontStyle.caption.weight} ${_fontStyle.caption.size}px ${_fontStyle.caption.family}`;
      for (var i = 0; i < 5; i++) {
        if (i < 3) {
          ctx.fillStyle = 'white';
          ctx.fillText(_descSec1.main_nutrition_text[i], _sec1Avocado1X + (_canvas.width * onGetRatio(260, 1920)), _sec1Avocado1Y * _spacingSec1.avocado1YRatio[i] + AvoMargin);
        } else if (i == 3){
          ctx.fillStyle = 'white';
          ctx.fillText(_descSec1.main_nutrition_text[i], _sec1Avocado1X + (_canvas.width * onGetRatio(230, 1920)), _sec1Avocado1Y * _spacingSec1.avocado1YRatio[i] - (AvoMargin * 12));
          ctx.fillStyle = _color.lighterGreen;
          onWrapText(ctx, _descSec1.sub_nutirition1, _sec1Avocado1X + (_canvas.width * onGetRatio(224, 1920)), _sec1Avocado1Y * _spacingSec1.avocado1YRatio[i] + (AvoMargin * 3), setAvoWidth - (AvoMargin * 80), _fontStyle.caption.lineHeight);
        } else {
          ctx.fillStyle = 'white';
          ctx.fillText(_descSec1.main_nutrition_text[i], _sec1Avocado1X + (_canvas.width * onGetRatio(210, 1920)), _sec1Avocado1Y * _spacingSec1.avocado1YRatio[i] - (AvoMargin * 12));
          ctx.fillStyle = _color.lighterGreen;
          onWrapText(ctx, _descSec1.sub_nutirition2, _sec1Avocado1X + (_canvas.width * onGetRatio(210, 1920)), _sec1Avocado1Y * _spacingSec1.avocado1YRatio[i] + (AvoMargin * 3), setAvoWidth - (AvoMargin * 80), _fontStyle.caption.lineHeight);
        }
        // Draw description circle
        onDrawCircle(ctx, _sec1Avocado1LineX * _spacingSec1.avocado1XRatio[i], _sec1Avocado1Y * _spacingSec1.avocado1YRatio[i], _canvas.width * 0.002);
        if (i < 4) {
          onDrawCircle(ctx, _sec1Avocado2LineX * _spacingSec1.avocado2XRatio[i], _sec1Avocado1Y * _spacingSec1.avocado2YRatio[i], _canvas.width * 0.002);
        }
      }
      onTweenSec1_3of3();
    } else {
      requestAnimationFrame(onTweenSec1_2of3);
    }
  }
}

var titleAlpha = 0.0;
var bodyAlpha = 0.0;
function onTweenSec1_1of3(){
  let ctx = _canvas.getContext('2d');
  // Clear Sec1_1of3
  ctx.clearRect(0, 0, _canvas.width, _canvas.height);
  // BG
  ctx.fillStyle = _color.bg[0];
  ctx.fillRect(0, 0, _canvas.width, _canvas.height);
  // Top line
  ctx.fillStyle = _color.brown;
  ctx.fillRect(_startX, _startY, _canvas.width - (_startX * 2), _canvas.height * 0.01);
  // Caption left
  ctx.fillStyle = _color.darkerIvory;
  ctx.font = `${_fontStyle.caption.weight} ${_fontStyle.caption.size}px ${_fontStyle.caption.family}`;
  onWrapText(ctx, _descSec1.resource, _startX, _sec1CaptionY, Math.floor(_canvas.width / 3) - _startX, _fontStyle.caption.lineHeight);
  // Caption Right
  ctx.fillStyle = _color.darkerIvory;
  ctx.font = `${_fontStyle.caption.weight} ${_fontStyle.caption.size}px ${_fontStyle.caption.family}`;
  onWrapText(ctx, _descSec1.caption, _canvas.width - (_canvas.width / 2.48), _sec1CaptionY, Math.floor(_canvas.width / 3) - _startX, _fontStyle.caption.lineHeight);
  // Animation
  titleAlpha = titleAlpha >= 1.0 ? titleAlpha = 1.0 : titleAlpha += 0.03;
  bodyAlpha = bodyAlpha >= 1.0 ? bodyAlpha = 1.0 : bodyAlpha += 0.018;
  // Title
  ctx.fillStyle = _colorArr.brownDark + titleAlpha + ')';
  ctx.font = `${_fontStyle.title.weight} ${_fontStyle.title.size}px ${_fontStyle.title.family}`;
  onWrapText(ctx, _descSec1.title, _startX, _sec1TitleY, Math.floor(_canvas.width / 3.1) - _startX, _fontStyle.title.lineHeight);
  // Body
  ctx.fillStyle = _colorArr.brownLighter + bodyAlpha + ')';
  ctx.font = `${_fontStyle.body.weight} ${_fontStyle.body.size}px ${_fontStyle.body.family}`;
  onWrapText(ctx, _descSec1.body, _startX, _sec1BodyY, Math.floor(_canvas.width / 3.1) - _startX, _fontStyle.body.lineHeight);
  if (bodyAlpha >= 1.0) {
    onTweenSec1_2of3();
  } else {
    requestAnimationFrame(onTweenSec1_1of3);
  }
}

function onDrawLine(ctx, x1, x2, y) { //, isDot = false, dotSize = null, dotColor = null){
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.strokeStyle = _color.orangeLine;
  ctx.lineCap = 'round';
  ctx.stroke();
};

function onDrawCircle(ctx, x1, y, dotSize){
  ctx.beginPath();
  ctx.arc(x1, y, dotSize, 0, Math.PI * 2, false);
  ctx.fillStyle = _color.orangeLine;
  ctx.fill();
};

//  Set Initial settings of canvas
function onInit(){
    _canvas.width = window.innerWidth < 1920 ? Math.floor(window.innerWidth): 1920;
    _canvas.height = window.innerWidth < 1920 ? Math.floor(window.innerWidth / 2.14) : 900;

    let canvasWidth                 = _canvas.width;
    let canvasHeight                = _canvas.height;

    _startX                         = canvasWidth * onGetRatio(80, 1920);
    _startY                         = canvasWidth * onGetRatio(120, 1920);
    _sec1TitleY                     = canvasHeight * onGetRatio(240, 900);
    _sec1BodyY                      = canvasHeight * onGetRatio(418, 900);
    _sec1CaptionY                   = canvasHeight * onGetRatio(819, 900);
    _sec1Avocado1X                  = canvasWidth * onGetRatio(788, 1920);
    _sec1Avocado1LineX              = canvasWidth * onGetRatio(712, 1920);
    _sec1Avocado1Y                  = canvasHeight * onGetRatio(198, 900);
    _sec1Avocado2X                  = canvasWidth * onGetRatio(1280, 1920);
    _sec1Avocado2LineX              = canvasWidth * onGetRatio(1738, 1920);
    // font
    _fontStyle.title.size           = canvasWidth * onGetRatio(80, 1920);
    _fontStyle.title.lineHeight     = canvasHeight * onGetRatio(60, 900);
    _fontStyle.subtitle.size        = canvasWidth * onGetRatio(32, 1920);
    _fontStyle.subtitle.lineHeight  = canvasHeight * onGetRatio(63, 900);
    _fontStyle.body.size            = canvasWidth * onGetRatio(24, 1920);
    _fontStyle.body.lineHeight      = canvasHeight * onGetRatio(35, 900);
    _fontStyle.caption.size         = canvasWidth * onGetRatio(22, 1920);
    _fontStyle.caption.lineHeight   = canvasHeight * onGetRatio(27, 900);

    onTweenSec1_1of3();
};

onInit();

// ON WINDOW RESIZE
window.addEventListener('resize', () => {
    var x = window.innerWidth;
    var y = window.innerHeight / 3;
    console.log("resize", x, y);
});
