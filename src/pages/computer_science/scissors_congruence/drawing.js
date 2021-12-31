

import { Geometry } from "./geometry";

/********************************************************************* 
Variable Set-up
********************************************************************* */

const pointRadius = 1;  //the radius in pixels for drawing the vertices
const colorRange = [140, 240]; //the range of colors to choose from in the color array
const lightRange = [40, 80]; //the range of lightness percentage values to choose from in the color array
export const DEFAULT_LINE_COLOR = 'black';


/********************************************************************* 
Helper functions
********************************************************************* */

//Define the top and left of our canvases relative to the page as a whole. 
export function getPosition(canvas) {
    // let xScrollPos = canvas.scrollLeft || document.documentElement.scrollLeft;
    // let yScrollPos = canvas.scrollTop || document.documentElement.scrollTop;
    let canvasLeft = canvas.offsetLeft + canvas.clientLeft;
    let canvasTop = canvas.offsetTop + canvas.clientTop;
    return [canvasTop, canvasLeft]
}

export function getPreviewLineColor(newPoint, pointList) {
    const firstPoint = pointList[0];
    if (Geometry.areDrawingClose(newPoint, firstPoint)) return "blue";

    for(const point of pointList) {
        if (Geometry.areDrawingClose(newPoint, point)) return "red";
    }
    if(Geometry.newEdgeCollision(newPoint, pointList)) return "red";
    return "grey";
}

//Draw a point at location x, y
export function drawPoint(context, x, y) {
    context.fillStyle = DEFAULT_LINE_COLOR;
    context.beginPath();
    context.arc(x, y, pointRadius, 0, 2*Math.PI);
    context.fill();
}
 
//Draw a line from (x1, y1) to (x2, y2)
export function drawLine(context, x1, y1, x2, y2, lineColor=DEFAULT_LINE_COLOR) {
    context.lineWidth = 2 * pointRadius;
    context.strokeStyle = lineColor;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

//Draw a polygon from a list of points
export function drawPoly(context, pointList, color) {
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
        for(const point of pointList) {
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
export function drawPolygons(context, polygons, colors) {
    if (!colors) {
        colors = colorArray(polygons.length);
    }
    for (let i = 0; i < polygons.length; i++) {
        const polygon = polygons[i];
        const color = colors[i];
        drawPoly(context, polygon, color);
    }
}

//Draw polygons from a list of PolyParts
export function drawParts(context, parts) {
    //If we didn't provide colors
    for(let i = 0; i < parts.length; i++) {
        let part = parts[i];
        drawPoly(context, part.polygon);
    }
}

//Creates an array of unique CSS colors of length <length>, shuffled based on the Fisher-Yates shuffle.
export function colorArray(length) {
    let colors = [];
    let colorDiff = colorRange[1] - colorRange[0];
    let lightDiff = lightRange[1] - lightRange[0];
    let lightCycle = 10;
    for (let i = 0; i < length; i++) {
        //Go through the entire 360 degrees
        let hue = colorRange[0] + Math.round((colorDiff/length) * i);
        let lightness = lightRange[0] + Math.round((lightDiff/lightCycle) * (i % lightCycle));
        const colorString = 'hsl(' + hue + ',100%,' + lightness + '%)';
        colors.push(colorString);
    }

    for (let partition = colors.length - 1; partition > 0; partition--) {
        let index = Math.floor(Math.random() * partition);
        let swap = colors[index];
        colors[index] = colors[partition];
        colors[partition] = swap;
    }

    return colors;
}

