// SET VARIABLES
const _canvases = [document.getElementById('section_1'), document.getElementById('section_2'), document.getElementById('section_3')];

const _descSec1 = {title: "Avocado’s nutrition and feature.",
                   body: "The avocado is prized for its high nutrient value and is added to various dishes due to its good flavor and rich texture (healthline.com). \nThese days, this food has become an incredibly popular food among health-conscious individuals. It’s often referred to as a superfood, which is not surprising given its health properties (Hass avocado composition and potential health effects).",
                   resource: "Source: www.tridge.com, www.hassavocadoboard.com",
                   caption: "1/3 Medium (50g)",
                   avocado_nutrition_text: ['Copper', 'Total fat', 'Pantothenic acid', {'Multi vitamins': 'B6  B9  C  E  K'}, {'Other': 'Carotenoids  Lutein  Zinc  Fiber  Mangaese  Magnesium  Thiamin  Niacin  Iron'}],
                   avocado_nutrition_pct: [5, 5, 14, 36, 40],
                   avocado_layer_dsc: ['Exocarp', 'Mesocarp', 'Endocarp', 'Seed']};
const _descSec2 = {title: ["Who imports the most?", "Who exports the most?"],
                   body: ["Top Importing Countries (2020)", "Top Exporting Countries (2020)"]};
const _descSec3 = {title: "Total U.S. unit sales annual growth, 2020",
                   option: "Current Market",
                   table: "Midsouth"}
const _spacingSec1 = {scaleRatio: [1, 0.95, 0.9, 0.76, 0.4], avo1XRatio: [1.4, 1.36, 1.32, 1.23, 1.16], avo1YRatio: [1.1, 1.27, 1.56, 2.36, 3.4], avo2XRatio: [2.088, 2, 2.07, 2.1], avo2YRatio: [1.09, 1.5, 2.4, 3]};
const _color =  { scale: ['#b2ae24', '#7ea93d', '#4a882c', '#46663b', '#324a2d'],
                  bg : ['#eeefd3', '#f4f3ce', '#935644'],
                  brown: '#423b2b',
                  lighterBrown: '#605849',
                  yellow: '#f2eaa7',
                  lighterGreen: '#92a740',
                  darkerIvory: '#b2aba4',
                  orangeLine: '#f7931e',
                  orangelineText: '#725744',
                  soil: '#935644',
                  ivory: '#f4f3ce'};
var _fontStyle = { title: { weight: '900', size: 0, family: 'Alegreya Sans SC', lineHeight: 0},
                   subtitle: { weight: '900', size:0, family: 'Alegreya Sans SC', lineHeight: 0},
                   body: { weight: '400', size:0, family: 'Roboto', lineHeight:  0},
                   caption: { weight: '400', size:0, family: 'Roboto', lineHeight: 0}}

const _svgSources = {section_1 : ["img/avocado_outline.SVG", "img/avocado_layer_00.SVG", "img/avocado_layer_01.SVG", "img/avocado_layer_02.SVG", "img/avocado_layer_03.SVG"]};

var _startX, _startY, _sec1TitleY, _sec1BodyY, _sec1CaptionY, _sec1Avocado1X, _sec1Avocado1Y, _sec1Avocado2X;

// SET FUNCTIONS

function onGetRatio(val1, val2, isFloor = false){
  if (isFloor) {
    return Math.floor(val1 / val2);
  } else {
    return val1 / val2;
  }
}

const onWrapText = (ctx, text, startX, startY, maxTextWidth, lineHeight) => {
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

const onSec1Visual = (ctx, imgSrc, avo1X, avo1Y, avo1LineX, avo2X, avo2Y, avo2LineX) => {
  let setAvoWidth = _canvases[0].width * onGetRatio(416, 1920);
  let setAvoHeight = _canvases[0].height * onGetRatio(604, 900);
  let AvoMargin = _canvases[0].width * onGetRatio(2, 1920);
  let textPaddingToLine = _canvases[0].width * onGetRatio(12, 1920);
  // top rect
  ctx.fillStyle = _color.brown;
  ctx.fillRect(_startX, _startX, _canvases[0].width - (_startX * 2), _canvases[0].height * 0.01);
  // avocado stacked bar graph
  for (var i = 0; i < 5; i++) {
    ctx.fillStyle = _color.scale[i];
    console.log(setAvoHeight, _spacingSec1.scaleRatio[i] * -1 * (setAvoHeight - (AvoMargin * 2)))
    ctx.fillRect(avo1X + AvoMargin, setAvoHeight - AvoMargin + avo1Y, setAvoWidth - (AvoMargin * 2), _spacingSec1.scaleRatio[i] * -1 * (setAvoHeight - (AvoMargin * 2)));
  }
  // load avocado outline svg
  var avocadoOutline = new Image();
  avocadoOutline.src = imgSrc[0];
  var numAvoLayer = 0;
  // avo1X = _sec1Avocado1X, avo1Y = _sec1Avocado1Y, avo2X = _sec1Avocado2X, avo2Y = _sec1Avocado1Y;
  avocadoOutline.addEventListener('load', (evt) => {
    numAvoLayer++;
    ctx.drawImage(avocadoOutline, avo1X, avo1Y, setAvoWidth, setAvoHeight);
    if (numAvoLayer == 1) {
      var forceTXT2center;
      for (var i = 0; i < 5; i++) {
        // draw nutrition text
        ctx.fillStyle = 'white';
        ctx.font = `${_fontStyle.caption.weight} ${_fontStyle.caption.size}px ${_fontStyle.caption.family}`;
        if (typeof _descSec1.avocado_nutrition_text[i] == 'string') {
          ctx.textAlign = 'center';
          ctx.fillText(_descSec1.avocado_nutrition_text[i], avo1X + (setAvoWidth / 1.6), avo1Y * _spacingSec1.avo1YRatio[i] + (AvoMargin * 3));
        } else {
          for (const key in _descSec1.avocado_nutrition_text[i]) {
            ctx.textAlign = 'left';
            ctx.fillText(key, avo1X + (_canvases[0].width * onGetRatio(160, 1920)), avo1Y * _spacingSec1.avo1YRatio[i] + (AvoMargin * 3));
            ctx.fillStyle = _color.lighterGreen;
            ctx.textAlign = 'center';
            ctx.font = `${_fontStyle.caption.weight} ${_fontStyle.caption.size}px ${_fontStyle.caption.family}`;
            if (key == 'Multi vitamins') {
              forceTXT2center = avo1X + (_canvases[0].width * onGetRatio(234, 1920));
            } else {
              forceTXT2center = avo1X + (_canvases[0].width * onGetRatio(218, 1920));
            }
            onWrapText(ctx, _descSec1.avocado_nutrition_text[i][key], forceTXT2center, avo1Y * _spacingSec1.avo1YRatio[i] + (_canvases[0].width * onGetRatio(40, 1920)), setAvoWidth - (AvoMargin * 80), _fontStyle.caption.lineHeight);
          }
        }
        // draw avocado outline line
        onDrawDotLine(ctx, avo1LineX * _spacingSec1.avo1XRatio[i], avo1LineX, avo1Y * _spacingSec1.avo1YRatio[i], _color.orangeLine, true, _canvases[0].width * 0.002, _color.orangeLine);
        // draw nutrition percentage text
        ctx.fillStyle = _color.orangelineText;
        ctx.textAlign = 'right';
        ctx.font = `${_fontStyle.body.weight} ${_fontStyle.body.size}px ${_fontStyle.body.family}`;
        ctx.fillText(`${_descSec1.avocado_nutrition_pct[i]}%`, avo1LineX - textPaddingToLine, avo1Y * _spacingSec1.avo1YRatio[i] + (AvoMargin * 4));
        ctx.textAlign = 'left';
      }
    }
  })
  // load avocado layers svg
  for (var i = 0; i < 4; i++) {
    var layer = new Image();
    layer.src = imgSrc[i + 1];
    var numAvoLayer = 0;
    layer.addEventListener('load', (evt) => {
      numAvoLayer++;
      ctx.drawImage(evt.target, avo2X, avo2Y, setAvoWidth, setAvoHeight);
      if (numAvoLayer == 5) {
        for (var i = 0; i < 4; i++) {
          // draw avocado layers line
          onDrawDotLine(ctx, avo1LineX * _spacingSec1.avo2XRatio[i], avo2LineX, avo2Y * _spacingSec1.avo2YRatio[i], _color.orangeLine, true, _canvases[0].width * 0.002, _color.orangeLine);
          // draw layer_dsc text
          ctx.textAlign = 'left'
          ctx.fillStyle = _color.orangelineText;
          ctx.font = `${_fontStyle.caption.weight} ${_fontStyle.caption.size}px ${_fontStyle.caption.family}`;
          ctx.fillText(_descSec1.avocado_layer_dsc[i], avo2LineX + textPaddingToLine, avo2Y * (_spacingSec1.avo2YRatio[i]) + (AvoMargin * 4));
        }
      }
    })
  }
};

const onSec2Visual = (ctx, src, startX, startY) => {

};

const onSec3Visual = (ctx, src, startX, startY) => {

};

const onInitVisuals = () => {
  var ctx;
  for (var i = 0; i < _canvases.length; i++) {
    ctx = _canvases[i].getContext('2d');
    if (i == 0) { //texts on canvas 1
      // title
      ctx.fillStyle = _color.brown;
      ctx.font = `${_fontStyle.title.weight} ${_fontStyle.title.size}px ${_fontStyle.title.family}`;
      onWrapText(ctx, _descSec1.title, _startX, _sec1TitleY, Math.floor(_canvases[0].width / 3.1) - _startX, _fontStyle.title.lineHeight);
      // body
      ctx.fillStyle = _color.lighterBrown;
      ctx.font = `${_fontStyle.body.weight} ${_fontStyle.body.size}px ${_fontStyle.body.family}`;
      onWrapText(ctx, _descSec1.body, _startX, _sec1BodyY, Math.floor(_canvases[0].width / 3.1) - _startX, _fontStyle.body.lineHeight);
      // resource
      ctx.fillStyle = _color.darkerIvory;
      ctx.font = `${_fontStyle.caption.weight} ${_fontStyle.caption.size}px ${_fontStyle.caption.family}`;
      onWrapText(ctx, _descSec1.resource, _startX, _sec1CaptionY, Math.floor(_canvases[0].width / 3) - _startX, _fontStyle.caption.lineHeight);
      // call visual
      onSec1Visual(ctx, _svgSources.section_1, _sec1Avocado1X, _sec1Avocado1Y, _sec1Avocado1LineX, _sec1Avocado2X, _sec1Avocado1Y, _sec1Avocado2LineX);
      // caption
      ctx.fillStyle = _color.darkerIvory;
      ctx.font = `${_fontStyle.caption.weight} ${_fontStyle.caption.size}px ${_fontStyle.caption.family}`;
      onWrapText(ctx, _descSec1.caption, _canvases[0].width - (_canvases[0].width / 2.48), _sec1CaptionY, Math.floor(_canvases[0].width / 3) - _startX, _fontStyle.caption.lineHeight);
 
    } else if (i == 1) { //texts on canvas 2

    } else { //texts on canvas 3

    }
  }
};

const onDrawDotLine = (ctx, x1, x2, y, lineColor, isDot = false, dotSize = null, dotColor = null) => {
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.strokeStyle = lineColor;
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x1, y, dotSize, 0, Math.PI * 2, false);
  ctx.fillStyle = dotColor;
  ctx.fill();
};

const onInit = () => {
    _canvases[0].width = _canvases[1].width = _canvases[2].width = window.innerWidth < 1920 ? Math.floor(window.innerWidth): 1920;
    _canvases[0].height = _canvases[1].height = _canvases[2].height = window.innerWidth < 1920 ? Math.floor(window.innerWidth / 2.14) : 900;

    let canvasWidth                 = _canvases[0].width;
    let canvasHeight                = _canvases[0].height;

    _startX                         = _startY = canvasWidth * onGetRatio(80, 1920);
    _sec1TitleY                     = canvasHeight * onGetRatio(198, 900);
    _sec1BodyY                      = canvasHeight * onGetRatio(396, 900);
    _sec1CaptionY                   = canvasHeight * onGetRatio(819, 900);
    _sec1Avocado1X                  = canvasWidth * onGetRatio(788, 1920);
    _sec1Avocado1LineX              = canvasWidth * onGetRatio(712, 1920);
    _sec1Avocado1Y                  = canvasWidth * onGetRatio(180, 1920);
    _sec1Avocado2X                  = canvasWidth * onGetRatio(1280, 1920);
    _sec1Avocado2LineX              = canvasWidth * onGetRatio(1738, 1920);
    // font
    _fontStyle.title.size           = canvasWidth * onGetRatio(84, 1920);
    _fontStyle.title.lineHeight     = canvasHeight * onGetRatio(63, 900);
    _fontStyle.subtitle.size        = canvasWidth * onGetRatio(92, 1920);
    _fontStyle.subtitle.lineHeight  = canvasHeight * onGetRatio(63, 900);
    _fontStyle.body.size            = canvasWidth * onGetRatio(25, 1920);
    _fontStyle.body.lineHeight      = canvasHeight * onGetRatio(35, 900);
    _fontStyle.caption.size         = canvasWidth * onGetRatio(23, 1920);
    _fontStyle.caption.lineHeight   = canvasHeight * onGetRatio(27, 900);

    //draw BG
    var ctx;
    for (var i = 0; i < _canvases.length; i++) {
      ctx =  _canvases[i].getContext('2d');      
      ctx.fillStyle = _color.bg[i];
      ctx.fillRect(0, 0, _canvases[i].width, _canvases[i].height); 
    };
    onInitVisuals();
};

onInit();

// ON WINDOW RESIZE
window.addEventListener('resize', () => {
    var x = window.innerWidth;
    var y = window.innerHeight / 3;
    console.log("resize", x, y);
})
