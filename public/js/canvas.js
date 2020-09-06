// SET VARIABLES
const canvases = [document.getElementById('section_1'), document.getElementById('section_2'), document.getElementById('section_3')];
const data = { contents: {0: {title: "Avocado’s nutrition and feature.",
                              body: "The avocado is prized for its high nutrient value and is added to various dishes due to its good flavor and rich texture (healthline.com). These days, this food has become an incredibly popular food among health-conscious individuals. It’s often referred to as a superfood, which is not surprising given its health properties (Hass avocado composition and potential health effects).",
                              add: "Source: www.tridge.com, https://hassavocadoboard.com"},
                          1: {title: ["Who imports the most?", "Who exports the most?"],
                              body: ["Top Importing Countries (2020)", "Top Exporting Countries (2020)"]},
                          2: {title: "Total U.S. unit sales annual growth, 2020",
                              add: "Current Market",
                              table: "Midsouth"}
                          },
               avo_dsc: ['Copper', 'Total fat', 'Pantothenic acid', {'Multi vitamins': 'B6 B9 C E K'}, {'Other': 'Fiber Iron Zinc Carotenoids Magnesium'}],
               avo_text: [5, 5, 14, 36, 40],
               avo_ratio: [1, 0.95, 0.9, 0.76, 0.4],
               avo_spacingTX: [40, 58, 62, 54, 46],
               avo_spacingLine: [2, 26, 42, 72, 108]};
const color = { scale: ['#b2ae24', '#7ea93d', '#4a882c', '#46663b', '#324a2d'],
                bg : ['#f2eaa7', '#f4f3ce', '#935644'],
                brown: '#423b2b',
                soil: '#935644',
                darkerG: '#455238',
                lighterG: '#7ea93d',
                yellow: '#f2eaa7',
                ivory: '#f4f3ce'};
const font = { title: {weight : '800', size: '40px', family: 'Alegreya Sans SC'},
               table : {weight : '400', size: '26px', family: 'Alegreya Sans SC'},
               body: {weight: '400', size: '12px', family: 'Roboto'}};
const padding = {top: 40, left: 40, offset: 100, bottom: 80};

// SET FUNCTIONS
const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
  let words = text.split(' ');
  let line = '';
  for(let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    let testWidth = Math.floor(metrics.width);
    if (x == 'center') {
      x = Math.floor((window.innerWidth - ctx.measureText(text).width) / 2);
    };
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
};

const initTexts = (ctx, i, x, y) => {
  ctx.textBaseline = "top";
  let maxWidth = Math.floor(window.innerWidth/4.2);
  let lineHeight = 15;
  
  if (data.contents[i].body) {
    if (typeof data.contents[i].title == 'string') {
      ctx.fillStyle = color.darkerG;
      ctx.font = `${font.title.weight} ${font.title.size} ${font.title.family}`;
      wrapText(ctx, data.contents[i].title, x, y, maxWidth, lineHeight + 10);
      ctx.font = `${font.body.weight} ${font.body.size} ${font.body.family}`;
      wrapText(ctx, data.contents[i].body, x, y + 100, maxWidth, lineHeight);
    } else {
      for (var j = 0; j < data.contents[i].title.length; j++) {
        let newX = x + (window.innerWidth*j*0.5);
        ctx.fillStyle = color.darkerG;
        ctx.font = `${font.title.weight} ${font.table.size} ${font.title.family}`;
        wrapText(ctx, data.contents[i].title[j], newX, y, Math.floor(window.innerWidth/2), lineHeight);
        ctx.font = `${font.body.weight} ${font.body.size} ${font.body.family}`;
        wrapText(ctx, data.contents[i].body[j], newX, y + 30, maxWidth, lineHeight);
      };
    }
  } else {
    ctx.fillStyle = color.yellow;
    ctx.font = `${font.title.weight} ${font.title.size} ${font.title.family}`;
    wrapText(ctx, data.contents[i].title, 'center', y, canvases[i].width , lineHeight - 6);
    // Table

  }
  if(data.contents[i].add) {
    console.log(data.contents[i].add);
    ctx.fillStyle = color.lighterG;
    ctx.font = `${font.body.weight} ${font.body.size} ${font.body.family}`;
    wrapText(ctx, data.contents[i].add, x, Math.floor(window.innerWidth/3), maxWidth , lineHeight);
  };
};

const drawLine = (ctx, x1, x2, y) => {
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.stroke();
};

const drawAvocaados = (ctx, x, y) => {
  const sources = {"nutrition" : "img/avocado_outline.SVG", 
                   "feature": ["img/feature_01.SVG", "img/feature_02.SVG", "img/feature_03.SVG", "img/feature_04.SVG"]};
  for (const property in sources) {
    let new_image = {}
    var imageWidth;
    if (property == "nutrition") {
      new_image[property] = new Image();
      new_image[property].src = sources[property];
      new_image[property].addEventListener('load', () => {
        imageWidth = new_image[property].width * 2;
        for (var i = 0; i < data.avo_text.length; i++) {
          var itemWidth = Math.floor((y * data.avo_ratio[i] *-1) + y + 44);
            ctx.fillStyle = color.scale[i];
            ctx.fillRect(x, y + (padding.bottom / 2), imageWidth, data.avo_ratio[i] * -1 * y);
            ctx.textAlign = "center";
            ctx.font = `${font.title.weight} ${data.avo_text[i] + 6}px ${font.body.family}`;
            ctx.fillStyle = color.ivory;
            ctx.textBaseline = "top";
            ctx.fillText(`${data.avo_text[i]}%`, x + imageWidth / 2 + data.avo_spacingTX[i], itemWidth); 
        };
        ctx.drawImage(new_image[property], x, padding.top, imageWidth, y);
      });
      for (var i = 0; i < data.avo_dsc.length; i++) {
        var itemWidth = Math.floor((y * data.avo_ratio[i] *-1) + y + 48);
        ctx.lineWidth = 0.5;
        ctx.strokeColor = color.darkerG;
        drawLine(ctx, x - padding.offset, imageWidth + (x - padding.offset) - data.avo_spacingLine[i], itemWidth);
        ctx.textBaseline = "bottom";
        ctx.textAlign = "left";
        ctx.font = `${font.body.weight} ${font.body.size} ${font.body.family}`;
        ctx.fillStyle = color.darkerG;
        if (typeof data.avo_dsc[i] == 'object') {
          for (const property in data.avo_dsc[i]) {
            ctx.fillText(property, x - padding.offset, itemWidth - 4);
            ctx.textBaseline = "top";
            ctx.fillStyle = color.lighterG;
            let maxWidth = 120;
            let lineHeight = 14;
            wrapText(ctx, data.avo_dsc[i][property], x - padding.offset, itemWidth + 6, maxWidth, lineHeight);
          };
        } else {
          ctx.fillText(data.avo_dsc[i], x - padding.offset, itemWidth - 1);
        };
      };
    } else {
      new_image[property] = new Image();
      for (var i = 0; i < sources[property].length; i++) {
        new_image[property].addEventListener('load', () => {
          let imageWidth = new_image[property].width * 2;
          ctx.drawImage(new_image[property], canvases[0].width/2 + (padding.offset * 2), padding.top, imageWidth, y);    
        });
        new_image[property].src = sources[property][i];
      };
    }
  }
};

const init = () => {
  for (var i = 0; i < canvases.length; i++) {
    let ctx = canvases[i].getContext('2d');
    canvases[i].width = window.innerWidth;
    canvases[i].height = window.innerHeight / 3;

    // Background BG
    ctx.fillStyle = color.bg[i];
    ctx.fillRect(0, 0, canvases[i].width, canvases[i].height);
    
    // Text
    initTexts(canvases[i].getContext('2d'), i, padding.top, padding.left);
  };
  
  // Two Avocaados
  drawAvocaados(canvases[0].getContext('2d'), Math.floor(canvases[0].width/3) + padding.offset, canvases[0].height - padding.bottom)
};

init();

// ON WINDOW RESIZE
window.addEventListener('resize', () => {
    var x = window.innerWidth;
    var y = window.innerHeight / 3;
    console.log("resize", x, y);
})
