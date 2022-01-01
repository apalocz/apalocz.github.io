import {useState, useRef} from "react";

import {getPosition, getPreviewLineColor, 
        drawPoly, drawPoint, drawLine, drawPolygons,
        colorArray, DEFAULT_LINE_COLOR} from "./drawing.js"
import {Geometry} from "./geometry.js";
import {Cuts} from "./cuts.js";
import "./scissors-style.css";


//constants
const baseColor = 'lightgrey';  //the color of the polygons when they are done being drawn
const newPieceColor = 'red'; //the color to show new pieces

function ScissorsCongruencePage() {

    //set up references for HTML elements
const canvasARef = useRef();
const canvasBRef = useRef();

const [decomposition, setDecomposition] = useState(undefined); //To hold the decomposition information
const[decompColors, setDecompColors] = useState([]); //to hold the part colorings from the decomposition
const [showingIndex, setShowingIndex] = useState(0); //index for iterating through the pieces of the decomposition;
const [draggingPoint, setDraggingPoint] = useState(false);

const closedA = useRef(false);  //Whether or not we have closed polygon A
const closedB = useRef(false);  //Whether or not we have closed polygon B
const pointListA = useRef([]);  //list of points in polygon A
const pointListB = useRef([]);  //list of points in polygon B



//computes the decomposition from the current point lists and saves it int 
function computeDecomposition() {
    if ((Geometry.checkSimple(pointListA.current) && Geometry.checkSimple(pointListB.current))) {
        //make them the same area
        const canvasA = canvasARef.current;
        const canvasB = canvasBRef.current;


        const areaA = Geometry.area(pointListA.current);
        const areaB = Geometry.area(pointListB.current);

        let ratio = areaA/areaB;
        ratio = Math.sqrt(ratio);
        Geometry.scalePoly(pointListB.current, ratio);


        //fit them both within the bounding canvases
        Geometry.scaleToFit(pointListA.current, pointListB.current, 
            canvasA.width - canvasA.clientLeft, canvasA.height - canvasA.clientTop);
        Geometry.center(pointListA.current, canvasA.width, canvasA.height);
        Geometry.center(pointListB.current, canvasA.width, canvasA.height);

        
        //Draw the transformed polygons on their respective canvases
        const contextA = canvasARef.current.getContext('2d');
        const contextB = canvasBRef.current.getContext('2d');
        contextA.clearRect(0, 0, canvasA.width, canvasA.height);
        contextB.clearRect(0, 0, canvasB.width, canvasB.height);

        showBase();

        const newDecomposition = Cuts.decompose(pointListA.current, pointListB.current)
        const newDecompColors = colorArray(newDecomposition.piecesA.length);
        setDecomposition(newDecomposition);

        setDecompColors(newDecompColors);
        showAll(newDecomposition, newDecompColors);

    }
}

//reset the decomposition variables
function resetDecomposition() {
    setDecomposition(null);
    setDecompColors(null);
    setShowingIndex(0);
}

//Shows the next polygon in the decomposition
function showNext() {
    if(decomposition) {
        const contextA = canvasARef.current.getContext('2d');
        const contextB = canvasBRef.current.getContext('2d');

        //draw the last piece in its cool color
        if (showingIndex !== 0) {
            const lastIndex = showingIndex - 1;
            const lastA = decomposition.piecesA[lastIndex];
            const lastB = decomposition.piecesB[lastIndex];
            const color = decompColors[lastIndex];

            drawPoly(contextA, lastA, color);
            drawPoly(contextB, lastB, color);
        }

        //draw new piece as long as we're not at the end
        if (showingIndex !== decomposition.piecesA.length) {
            const pieceA = decomposition.piecesA[showingIndex];
            const pieceB = decomposition.piecesB[showingIndex];
            drawPoly(contextA, pieceA, newPieceColor);
            drawPoly(contextB, pieceB, newPieceColor);
        }

        setShowingIndex((showingIndex + 1) % (decomposition.piecesA.length + 1));
    }
}

//shows all polygons in the decomposition
function showAll(newDecomposition=null, newDecompColors=null) {
    if(!decomposition && !newDecomposition && closedA && closedB) {
        computeDecomposition();
    }
    if(decomposition|| (newDecomposition && newDecompColors)) {
        const contextA = canvasARef.current.getContext('2d');
        const contextB = canvasBRef.current.getContext('2d');

        const decomp = newDecomposition || decomposition;
        const colors = newDecompColors || decompColors;

        drawPolygons(contextA, decomp.piecesA, colors);
        drawPolygons(contextB, decomp.piecesB, colors);
    }
}

//shows base polygons without parts; resets the showing counter
function showBase() {
    const contextA = canvasARef.current.getContext('2d');
    const contextB = canvasBRef.current.getContext('2d');
    

    drawPoly(contextA, pointListA.current, baseColor);
    drawPoly(contextB, pointListB.current, baseColor);
    drawPoly(contextA, pointListA.current);
    drawPoly(contextB, pointListB.current);
    setShowingIndex(0);
}

//Resets the canvas and the polygon so far for polygon A
function resetA() {
    const canvasA = canvasARef.current;
    const contextA = canvasARef.current.getContext('2d');

    closedA.current = false;
    contextA.clearRect(0, 0, canvasA.width, canvasA.height);
    pointListA.current = [];
    resetDecomposition()
}

//Resets the canvas and the polygon so far for polygon B
function resetB(){
    const canvasB = canvasBRef.current;
    const contextB = canvasBRef.current.getContext('2d');

    closedB.current = false;
    contextB.clearRect(0, 0, canvasB.width, canvasB.height);
    pointListB.current = [];
    resetDecomposition()
}

function drawPointList(side) {
    const canvasA = canvasARef.current;
    const canvasB = canvasBRef.current;

    const canvas = (side === 'A') ? canvasA : canvasB;
    const context = canvas.getContext('2d');
    let pointList = (side === 'A') ? pointListA.current : pointListB.current;

    context.clearRect(0, 0, canvas.width, canvas.height);
    for(const point of pointList) {
        drawPoint(context, point.X, point.Y);
    }
    for(let i = 0; i < pointList.length - 1; i += 1) {
        const pointA = pointList[i];
        const pointB = pointList[i+1];
        drawLine(context, pointA.X, pointA.Y, pointB.X, pointB.Y);
    }

}

function inBounds(x, y, canvas) {
    return x > 0 && x < canvas.width && y > 0 && y < canvas.height;
}

// get the location of a mouse event relative to the canvas
function getCanvasMousePosition(event, side) {
    const canvasA = canvasARef.current;
    const canvasB = canvasBRef.current;

    const canvas = (side === 'A') ? canvasA : canvasB;
    const [canvasTop, canvasLeft] = getPosition(canvas);

    const x = event.pageX - canvasLeft;
    const y = event.pageY - canvasTop;
    return {x, y};
}

/* show potential new line */
function drawPreviewLine(event, side) {

    const canvasA = canvasARef.current;
    const canvasB = canvasBRef.current;

     //Which canvas are we on?
    const canvas = (side === 'A') ? canvasA : canvasB;
    const context = canvas.getContext('2d');
    let pointList = (side === 'A') ? pointListA.current : pointListB.current;
    let closed = (side === 'A') ? closedA.current : closedB.current;

    const {x, y} = getCanvasMousePosition(event, side);

    // Check if we are out of bounds (in the border of the canvas) and the polygon is open
    if (inBounds(x, y, canvas) && !closed) {
        const newPoint = {X: x, Y: y}
        //if there are more than one point
        let lastPoint;
        let lineColor = DEFAULT_LINE_COLOR;
        if (pointList.length > 0) {
            drawPointList(side);
            lastPoint = pointList[pointList.length - 1];
            lineColor = getPreviewLineColor(newPoint, pointList);
        }
        else if (draggingPoint) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            lastPoint = draggingPoint;
        }
        else return;
        context.save()
        context.globalAlpha = 0.5;
        drawLine(context, x, y, lastPoint.X, lastPoint.Y, lineColor);
        context.globalAlpha = 1;
        context.restore()
    }

}

/*The event handler for canvas clicks: Adds a point to the
 polygon for that canvas at the location where the canvas was clicked,
 if the polygon is not closed. */
function drawMousePoint(event, side, draggedPoint=null) {
    const canvasA = canvasARef.current;
    const canvasB = canvasBRef.current;

     //Which canvas are we on?
    const canvas = (side === 'A') ? canvasA : canvasB;
    const context = canvas.getContext('2d');
    const pointList = (side === 'A') ? pointListA.current : pointListB.current;
    const closed = (side === 'A') ? closedA.current : closedB.current;

    const {x, y} = getCanvasMousePosition(event, side);

    // Check if we are out of bounds (in the border of the canvas) and the polygon is open
    if (!(inBounds(x, y, canvas) && !closed)) {
        drawPointList(side);
        return;
    }
    const newPoint = {X: x, Y: y}
    //if there are more than one point
    if (pointList.length > 0) {
        //Continue if it's a click back on the another point
        for(let i = 1; i < pointList.length; i += 1) {
            if (Geometry.areDrawingClose(newPoint, pointList[i])) {
                drawPointList(side);
                return;
            } 
        }

        //Are we closing the polygon?
        const firstPoint = pointList[0];
        if (Geometry.areDrawingClose(newPoint, firstPoint)) {

            //If we don't have enough points for a polygon, return
            if (pointList.length < 3) {
                drawPointList(side);
                return;
            }

            //mark as closed and convert to clockwise order
            if (side === 'A') { 
                closedA.current = true; 
                pointListA.current = Geometry.flipClockwise(pointList);
            }
            else { 
                closedB.current = true; 
                pointListB.current = Geometry.flipClockwise(pointList);
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            drawPoly(context, pointList, baseColor);
            drawPoly(context, pointList);
            
            //if both are closed, try to compute the decomposition
            if(closedA.current && closedB.current) {
                computeDecomposition();
            }
            return;
        }

        else {

            if(Geometry.newEdgeCollision(newPoint, pointList)) {
                drawPointList(side);
                return;
            };
        
            const lastPoint = pointList[pointList.length - 1];
            pointList.push({X: x, Y: y});
            drawLine(context, x, y, lastPoint.X, lastPoint.Y);
            
        }
    }
    else {
        //if this is the first point or first segment, just add it to the list
        if(draggedPoint && inBounds(draggedPoint.X, draggedPoint.Y, canvas) && 
          !Geometry.areDrawingClose(draggedPoint, newPoint)) {
            pointList.push(draggedPoint);
            drawPoint(context, draggedPoint.x, draggedPoint.y);
            drawLine(context, x, y, draggedPoint.X, draggedPoint.Y);
        }
        pointList.push({X: x, Y: y});
    }

    drawPoint(context, x, y);
    
}

    // handle behavior when interacting with the canvas
    const handleMouseDown = (event, side) => {
        if(decomposition) return;

        const {x, y} = getCanvasMousePosition(event, side);
        setDraggingPoint({X: x, Y: y, side});
        drawPreviewLine(event, side);
    }

    const handleMouseMove = (event, side) => {
        if(decomposition) return;
        if(draggingPoint && draggingPoint.side === side) {
            drawPreviewLine(event, side);
        }
    }

    const handleMouseLeave = (side) => {
        if(decomposition) return;
        if(draggingPoint) {
            drawPointList(side);
        }
    }

    const handleMouseUp = (event, side) => {
        if(decomposition) return;
        if(draggingPoint) {
            drawMousePoint(event, side, draggingPoint);
        }
        setDraggingPoint(false)
        
    }

    const canvasWidth = 500;
    const canvasHeight = 300;

    return (
        <>
        <h2> Scissors Congruence </h2>

    
            <p> Given any two simple polygons of equal area, is it possible, using only straight cuts, to cut one
                into pieces that can be taken apart and re-arranged to form the other? Draw some polygons and
                see for yourself! </p>
            

            <hr className="no-margin"/>
            <div className="interaction_area">
            <div className="canvas_box"> 
                <div className="instruction"> <i> Click on the box below to draw a simple (non-intersecting) polygon. </i></div>
                <div className="centered" style={{width:canvasWidth}}>
                    <button className="scissors-button reset-button" onClick={resetA}> Reset Polygon A </button>
                    <br/>
                    <canvas className="scissors-canvas" ref={canvasARef} width={canvasWidth} height={canvasHeight}
                        onMouseDown={(e)=>handleMouseDown(e, 'A')}
                        onMouseMove={(e)=>handleMouseMove(e, 'A')}
                        onMouseLeave={(e)=>handleMouseLeave('A')}
                        onMouseUp={(e)=>handleMouseUp(e, "A")}> </canvas> </div>
                </div>

            <div className="canvas_box"> 
                <div className="instruction"> <i> Click on the box below to draw a second simple (non-intersecting) polygon. </i></div>
                
                <div className="centered" style={{width:canvasWidth}}>
                    <button className="scissors-button reset-button" onClick={resetB}> Reset Polygon B </button>
                    <br/>
                    <canvas className="scissors-canvas" ref={canvasBRef} width={canvasWidth} height={canvasHeight}
                        onMouseDown={(e)=>handleMouseDown(e, 'B')}
                        onMouseMove={(e)=>handleMouseMove(e, 'B')}
                        onMouseLeave={(e)=>handleMouseLeave('B')}
                        onMouseUp={(e)=>handleMouseUp(e, "B")}> </canvas> </div>
                </div>
            </div>
            <hr className="no-margin"/>

            {decomposition &&(<>
                <div className="centered scissors-under-buttons">
                <button className="scissors-button" onClick={showNext}> Show Next Piece </button>
                <button className="scissors-button" onClick={showAll}> Show All Pieces </button>
                <button className="scissors-button" onClick={showBase}> Clear Pieces </button>
                </div>
    

                <p> The pieces above are calculated through an implementation of the {" "}
                    <a href="https://en.wikipedia.org/wiki/Wallace%E2%80%93Bolyai%E2%80%93Gerwien_theorem" target="blank"> 
                    Wallace Bolyai Gerwein theorem </a>, which proves that this is possible for any two simple polygons.
                 </p>
            </>)
            }


         </>
    );


}

export default ScissorsCongruencePage;