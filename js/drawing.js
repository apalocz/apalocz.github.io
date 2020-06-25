/* drawing.js
 * Author: Alexandra Palocz
 * Description: 
 * JavaScript for js-playground.html.
 * 
 * Dependencies:
 * polyk.js (https://github.com/josdejong/mathjs)
 * local files geometry.js, parts.js, and cuts.js
 */

/********************************************************************* 
Variable Set-up
********************************************************************* */
//set up variables to represent HYML elements
const canvasA = document.querySelector('.canvasA');
const canvasB = document.querySelector('.canvasB');
const resetBtnA = document.querySelector('.resetA');
const resetBtnB = document.querySelector('.resetB');
const nextBtn = document.querySelector('.next');
const allBtn = document.querySelector('.all');
const clearBtn = document.querySelector('.clear');

//Get a drawing context to work with 
const contextA = canvasA.getContext('2d');
const contextB = canvasB.getContext('2d');



//Define local variables
var decomposition; //To hold the decomposition information
var decompColors; //to hold the part colorings from the decomposition
var showingIndex = 0; //index for iterating through the pieces of the decomposition;

let pointRadius = 2;  //the radius in pixels for drawing the vertices
let closedA = false;  //Whether or not we have closed polygon A
let closedB = false;  //Whether or not we have closed polygon B
let pointListA = [];  //list of points in polygon A
let pointListB = [];  //list of points in polygon B
let baseOutput = 'Draw a non-intersecting polygon in the box above <br>';


const baseColor = 'lightgrey';  //the color of the polygons when they are done being drawn
const newPieceColor = 'red'; //the color to show new pieces
const colorRange = [140, 240]; //the range of colors to choose from in the color array
const lightRange = [40, 80]; //the range of lightness percentage values to choose from in the color array

//Set line width to be the same as the diameter of our points (so they blend together)
contextA.lineWidth = 2 * pointRadius;
contextB.lineWidth = 2 * pointRadius;

const lineColor = 'black';
contextA.strokeStyle = lineColor;
contextB.strokeStyle = lineColor;

/********************************************************************* 
Helper functions
********************************************************************* */

//Define the top and left of our canvases relative to the page as a whole. 
function getPosition(canvas) {
    // let xScrollPos = canvas.scrollLeft || document.documentElement.scrollLeft;
    // let yScrollPos = canvas.scrollTop || document.documentElement.scrollTop;
    let canvasLeft = canvas.offsetLeft + canvas.clientLeft;
    let canvasTop = canvas.offsetTop + canvas.clientTop;
    return [canvasTop, canvasLeft]
}

//Draw a point at location x, y
function drawPoint(context, x, y) {
    context.fillStyle = lineColor;
    context.beginPath();
    context.arc(x, y, pointRadius, 0, 2*Math.PI);
    context.fill();
}
 
//Draw a line from (x1, y1) to (x2, y2)
function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

//Draw a polygon from a list of points
function drawPoly(context, pointList, color) {
    //return if our list has less than two points
    if (pointList.length < 2) {
        return
    }
    //if we want a filled polygon
    if(color) {
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(pointList[0].X, pointList[0].Y)
        for (let i = 1; i < pointList.length; i++) {
            let point = pointList[i];
            context.lineTo(point.X, point.Y);
        }
        context.closePath();
        context.fill();
    }

    else {
        for(point of pointList) {
            drawPoint(context, point.X, point.Y);
        }
        let last = pointList[pointList.length - 1];
        let first = pointList[0];
        drawLine(context, first.X, first.Y, last.X, last.Y);
        for(let i = 1; i < pointList.length; i++) {
            let prev = pointList[i - 1];
            let point = pointList[i];
            drawLine(context, prev.X, prev.Y, point.X, point.Y);
        }
    }
}

//Draw all objects from the <polygons> list to <context>.
function drawPolygons(context, polygons, colors) {
    if (!colors) {
        colors = colorArray(polygons.length);
        shuffle(colors);
    }
    for (let i = 0; i < polygons.length; i++) {
        polygon = polygons[i];
        color = colors[i];
        drawPoly(context, polygon, color);
    }
}

//Draw polygons from a list of PolyParts
function drawParts(context, parts) {
    //If we didn't provide colors
    for(let i = 0; i < parts.length; i++) {
        let part = parts[i];
        drawPoly(context, part.polygon);
    }
}

//Determines whether an input point (x1, y1) is close enough to another point (x2, y2) to count them as the same
function areClose(x1, y1, x2, y2) {
    let dist = Math.hypot(x1 - x2, y1 - y2);
    return dist < pointRadius * 4;
}

//Given a list of points representing a complete polygon, writes out whether or not it is simple
//Uses the PolyKlibrary from http://polyk.ivank.net/ - this should be linked along with this file.
function checkSimple(pointList) {
    simple = PolyK.IsSimple(flatten(pointList));
    return simple;
}

function flatten(pointList) {
    let flatList = [];
    for (var point of pointList) {
        flatList.push(point.X);
        flatList.push(point.Y);
    }
    return flatList;
}

function triangulate(pointList) {
    let triIndices = earcut(flatten(pointList));
    let triangles = [];

    //translate groups of three indices into polygons
    for(let i = 2; i < triIndices.length; i+= 3) {
        let point1 = pointList[triIndices[i - 2]];
        let point2 = pointList[triIndices[i - 1]];
        let point3 = pointList[triIndices[i]];
        triangles.push([point1, point2, point3]);
    }
    return triangles;
}

//Creates an array of unique CSS colors of length <length>
function colorArray(length) {
    let colors = [];
    let colorDiff = colorRange[1] - colorRange[0];
    let lightDiff = lightRange[1] - lightRange[0];
    let lightCycle = 10;
    for (i = 0; i < length; i++) {
        //Go through the entire 360 degrees
        let hue = colorRange[0] + Math.round((colorDiff/length) * i);
        let lightness = lightRange[0] + Math.round((lightDiff/lightCycle) * (i % lightCycle));
        colorString = 'hsl(' + hue + ',100%,' + lightness + '%)';
        colors.push(colorString);
    }
    return colors;
}

//Returns a shuffled array, based on the Fisher-Yates shuffle.
function shuffle(array) {
    for (partition = array.length - 1; partition > 0; partition--) {
        let index = Math.floor(Math.random() * partition);
        let swap = array[index];
        array[index] = array[partition];
        array[partition] = swap;
    }
}

//computes the decomposition from the current point lists and saves it int 
function computeDecomposition() {
    if ((checkSimple(pointListA) && checkSimple(pointListB))) {
        //make them the same area


        var areaA = Geometry.area(pointListA);
        var areaB = Geometry.area(pointListB);

        var ratio = areaA/areaB;
        ratio = Math.sqrt(ratio);
        Geometry.scalePoly(pointListB, ratio);


        //fit them both within the bounding canvases
        Geometry.scaleToFit(pointListA, pointListB, 
            canvasA.width - canvasA.clientLeft, canvasA.height - canvasA.clientTop);
        Geometry.center(pointListA, canvasA.width, canvasA.height);
        Geometry.center(pointListB, canvasA.width, canvasA.height);

        
        //Draw the transformed polygons on their respective canvases
        contextA.clearRect(0, 0, canvasA.width, canvasA.height);
        contextB.clearRect(0, 0, canvasB.width, canvasB.height);

        showBase();


        decomposition = Cuts.decompose(pointListA, pointListB);
        decompColors = colorArray(decomposition.piecesA.length);
        shuffle(decompColors);
    }
}

//reset the decomposition variables
function resetDecomposition() {
    decomposition = null;
    decompColors = null;
    showingIndex = 0;
}

/********************************************************************* 
Event handler definitions
********************************************************************* */

//Shows the next polygon in the decomposition
function showNext() {
    if(decomposition) {

        //draw the last piece in its cool color
        if (showingIndex !== 0) {
            var lastIndex = showingIndex - 1;
            var lastA = decomposition.piecesA[lastIndex];
            var lastB = decomposition.piecesB[lastIndex];
            var color = decompColors[lastIndex];

            drawPoly(contextA, lastA, color);
            drawPoly(contextB, lastB, color);
        }

        //draw new piece as long as we're not at the end
        if (showingIndex !== decomposition.piecesA.length) {
            var pieceA = decomposition.piecesA[showingIndex];
            var pieceB = decomposition.piecesB[showingIndex];
            drawPoly(contextA, pieceA, newPieceColor);
            drawPoly(contextB, pieceB, newPieceColor);
        }

        showingIndex = (showingIndex + 1) % (decomposition.piecesA.length + 1);
    }
}

//shows all polygons in the decomposition
function showAll() {
    if(decomposition) {
        drawPolygons(contextA, decomposition.piecesA, decompColors);
        drawPolygons(contextB, decomposition.piecesB, decompColors);

        //draw current piece again
        let lastIndex = (showingIndex - 1) % decomposition.piecesA.length;
        var pieceA = decomposition.piecesA[lastIndex];
        var pieceB = decomposition.piecesB[lastIndex];
        drawPoly(contextA, pieceA, newPieceColor);
        drawPoly(contextB, pieceB, newPieceColor);
        
    }
}

//shows base polygons without parts; resets the showing counter
function showBase() {
    drawPoly(contextA, pointListA, baseColor);
    drawPoly(contextB, pointListB, baseColor);
    drawPoly(contextA, pointListA);
    drawPoly(contextB, pointListB);
    showingIndex = 0;
}

//Resets the canvas and the polygon so far for polygon A
function resetA() {
    closedA = false;
    contextA.clearRect(0, 0, canvasA.width, canvasA.height);
    pointListA = [];
    resetDecomposition()
}

//Resets the canvas and the polygon so far for polygon B
function resetB(){
    closedB = false;
    contextB.clearRect(0, 0, canvasB.width, canvasB.height);
    pointListB = [];
    resetDecomposition()
}


/*The event handler for canvas clicks: Adds a point to the
 polygon for that canvas at the location where the canvas was clicked,
 if the polygon is not closed. */
function drawMousePoint(event) {

    //Which canvas are we on?
    if (event.target.className.indexOf('canvasA') >= 0) {
        var side = 'A';
        var canvas = canvasA;
        var context = contextA;
        var pointList = pointListA;
        var closed = closedA;
    }
    else {
        var side = 'B';
        var canvas = canvasB;
        var context = contextB;
        var pointList = pointListB;
        var closed = closedB;

    }

    const [canvasTop, canvasLeft] = getPosition(canvas);
    let x = event.pageX - canvasLeft;
    let y = event.pageY - canvasTop;

    // Check if we are out of bounds (in the border of the canvas) and the polygon is open
    if (x > 0 && x < canvas.width && y > 0 && y < canvas.height && !closed) {
        //if there are more than one point
        if (pointList.length > 0) {
            //Continue if it's a click back on the same point
            lastPoint = pointList[pointList.length - 1];
            if (areClose(x, y, lastPoint.X, lastPoint.Y)) {
                return;
            } 

            //Are we closing the polygon?
            let firstPoint = pointList[0];
            if (areClose(x, y, firstPoint.X, firstPoint.Y)) {

                //If we don't have enough points for a polygon, return
                if (pointList.length < 3) {
                    return;
                }

                //mark as closed
                if (side === 'A') { closedA = true; }
                else { closedB = true; }

                drawPoly(context, pointList, baseColor);
                drawPoly(context, pointList);
                
                //if both are closed, try to compute the decomposition
                if(closedA && closedB) {
                    computeDecomposition();
                }
                return;
            }

            else {
                //Check if the new point gives us an intersection
                pointList.push({X: x, Y: y});
                if(!checkSimple(pointList)) {
                   pointList.pop();
                   return; 
                }

                drawLine(context, x, y, lastPoint.X, lastPoint.Y);
            }
        }
        else {
            //if this is the first point, just add it to the list
            pointList.push({X: x, Y: y});
        }

        drawPoint(context, x, y);
    }

}



/********************************************************************* 
Event handler linkings
********************************************************************* */

nextBtn.addEventListener('click', showNext);
allBtn.addEventListener('click', showAll);
clearBtn.addEventListener('click', showBase);
resetBtnA.addEventListener('click', resetA);
resetBtnB.addEventListener('click', resetB);
canvasA.addEventListener('click', drawMousePoint);
canvasB.addEventListener('click', drawMousePoint);
