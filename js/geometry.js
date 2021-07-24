/* Name: geometry.js
 * Author: Alexandra Palocz
 * Description:
 * Contains various useful objects and functions for geometry calculations related to 
 * equidecomposability
 * 
 * Dependencies:
 * math.js (https://github.com/josdejong/mathjs)
 * clipper.js (https://sourceforge.net/projects/jsclipper/)
 * earcut.js (https://github.com/mapbox/earcut)
 * */


var Geometry = {};

var FLOAT_COMPARE_CUTOFF = 1e-5

//Returns a version of point as object {X:x, Y:y} in array form [x, y]
Geometry.arrPoint = function(objectPoint) {
    return [objectPoint.X, objectPoint.Y];
}

//flattens a list of points
Geometry.flattenList = function(pointList) {
    let flatList = [];
    for (point of pointList) {
        flatList.push(point.X);
        flatList.push(point.Y);
    }
    return flatList;
}

/******************************************************************************************
 *  Line and line segment functions
 ******************************************************************************************/

//Creates a vertical line segment that goes through x
Geometry.vertSegment = function(x) {
    let firstPoint = {X: x, Y: 0};
    let secondPoint = {X: x, Y: 1};
    return [firstPoint, secondPoint];
}

//Returns the length of a segment, expressed as an array of object points {X:x, Y:y}
Geometry.segmentLength = function(segment) {
    return math.distance(Geometry.arrPoint(segment[0]), Geometry.arrPoint(segment[1]));
}

//Returns whether <segment> has a positive slope.
Geometry.posSlope = function(segment) {
    let point0 = segment[0];
    let point1 = segment[1];
    let xDiff = point0.X - point1.X;
    let yDiff = point0.Y - point1.Y;
    return (yDiff/xDiff > 0);
}


//Returns the counterclockwise angle between the line extention of <segment> and the x axis
Geometry.angleFromHoriz = function(segment) {
    let point0 = segment[0];
    let point1 = segment[1];
    let xDiff = Math.abs(point0.X - point1.X);
    let yDiff = Math.abs(point0.Y - point1.Y);
    return Math.atan(yDiff/xDiff);
}


//Returns the leftmost point of a (non-vertical) segment; if the segment is vertical, 
//the returned point is arbitrary
Geometry.leftmost = function(segment) {
    if (segment[0].X < segment[1].X) {
        return segment[0];
    }
    else {
        return segment[1];
    }
}

//Returns the rightmost point of a (non-vertical) segment; if the segment is vertical, 
//the returned point is arbitrary
Geometry.rightmost = function(segment) {
    if (segment[0].X > segment[1].X) {
        return segment[0];
    }
    else {
        return segment[1];
    }
}


//Returns the intersection between two lines (with points in object format).
Geometry.lineIntersect = function(line1, line2) {
    let intersect = math.intersect(
                    Geometry.arrPoint(line1[0]), 
                    Geometry.arrPoint(line1[1]), 
                    Geometry.arrPoint(line2[0]),
                    Geometry.arrPoint(line2[1]));
    return {X: intersect[0], Y: intersect[1]};
}


/******************************************************************************************
 *  Triangle functions
 ******************************************************************************************/

//Takes a triangle represented by an array of three points, and an index representing a point in the array.
//Returns a indices representing the points on the  opposite side of the triangle.
Geometry.oppositeIndices = function(triangle, pointIndex) {
    switch(pointIndex) {
        //index=0
        case 0:
            return [1, 2];
        //index=1
        case 1:
            return [2, 0];
        //index = 2 (assuming a triangle has only three indices)
        default:
            return [0, 1];
    }
}

//Given a triangle as an array of three points, returns the longest side and the 
//index in the triangle array of that side and the opposite points.
Geometry.longestSide = function(triangle) {
    var maxInd;
    var longest;
    var longestInds;
    var maxLen = 0;

    //Iterate through each side of the triangle
    for (let i = 0; i < 3; i++) {
        let indices = Geometry.oppositeIndices(triangle, i);
        let side = [triangle[indices[0]], triangle[indices[1]]];
        let length = Geometry.segmentLength(side);
        if (length > maxLen) {
            maxInd = i;
            longest = side;
            longestInds = indices;
            maxLen = length;
        }
    }

    return [longest, maxInd, longestInds];

}

//Given a side of a triangle and the opposite point, returns the ccw angle needed to 
//rotate the triangle so side is horizontal and on the bottom
Geometry.angleToBase = function(side, oppPoint) {

    let point0 = side[0];
    let point1 = side[1];

    let xDiff = point0.X - point1.X;
    let yDiff = point0.Y - point1.Y;

    //To start with, set the angle to the difference between <side> and horizontal
    let angle = Math.atan(Math.abs(yDiff/xDiff));

    //if the side has a positive slope
    if(yDiff/xDiff > 0 && xDiff !== 0) {
        angle = 2*Math.PI - angle;
    }

    //If the triangle is not above the side already, add 180 degrees so it will be
    if (Geometry.aboveLine(oppPoint, side) <= 0) { 
        angle = angle + Math.PI
    }

    return angle;


}

//Assuming triangle is right and has a bottom horizontal side, returns the bottom 
//point with a non-right angle 
Geometry.pivotCorner = function(triangle) {
    if (math.abs(triangle[0].X - triangle[1].X) < FLOAT_COMPARE_CUTOFF) {
        return triangle[2];
    }
    else if (math.abs(triangle[1].X - triangle[2].X) < FLOAT_COMPARE_CUTOFF) {
        return triangle[0];
    }
    else {
        return triangle[1];
    }
}

//Compute the area of a triangle, using Heron's formula
Geometry.triArea = function(triangle) {
    let a = Geometry.segmentLength([triangle[0], triangle[1]]);
    let b = Geometry.segmentLength([triangle[1], triangle[2]]);
    let c = Geometry.segmentLength([triangle[2], triangle[0]]);

    let s = (a + b + c)/2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}


/******************************************************************************************
 *  Relation functions
 ******************************************************************************************/

//Calculate the midpoint between two points
Geometry.midpoint = function(point0, point1) {
    let xDiff = point0.X - point1.X;
    let yDiff = point0.Y - point1.Y;
    return {X: point1.X + xDiff/2,
            Y: point1.Y + yDiff/2};
}

//Given three points, does a simple test fo determine if they are in clockwise order.
//Returns 0 for any kind of colinearity, 1 if we turn left, and -1 if we turn right.
Geometry.ccw = function(A, B, C) {
    //Take determinant of matrix of the three points as rows, with ones in the third column
    let det_matrix = [[A.X, A.Y, 1], 
                      [B.X, B.Y, 1], 
                      [C.X, C.Y, 1]];
    let det = math.det(det_matrix);
    if (det < 0) { return -1; }
    else if (det > 0) { return 1; }
    else { return 0; }
}


// Returns 1 if <point> is above the line indicated by <segment>, -1 if 
// it is below, 0 if it is colinear the segment 
Geometry.aboveLine = function(point, segment) {

    //if this is a vertical line, return 1 if right of line, -1 if left
    if(segment[0].X - segment[1].X === 0) {
        if (point.X > segment[0].X) {return 1};
        if (point.X < segment[0].X) {return -1};
        return 0;
    }
    //determine equation of llne based on segment
    slope = (segment[0].Y - segment[1].Y)/(segment[0].X - segment[1].X);
    intercept = segment[0].Y - slope * segment[0].X;
    
    //projection of point's X coordinate onto the line
    projection  = point.X * slope + intercept;
    if (projection < point.Y) {return 1};
    if (projection > point.Y) {return -1};
    return 0;
}


//Returns two polygons, representing this polygon as cut by <line>.
Geometry.cutLine =  function(polygon, line) {
    let abovePoints = [];
    let belowPoints = []
    let prevPoint = polygon[polygon.length - 1];
    let prevAbove = Geometry.aboveLine(prevPoint, line);

    for(let i=0; i < polygon.length; i++) {
        let point = polygon[i];
        let above = Geometry.aboveLine(point, line);

        //If point is on the line
        if (above === 0) {
            abovePoints.push(point);
            belowPoints.push(point);
        }

        //if point is below the line
        else if (above > 0) {
            if (prevAbove < 0) {
                //If we just passed the line, find intersection of the line with previous edge
                let intersect = Geometry.lineIntersect([prevPoint, point], line);
                abovePoints.push(intersect);
                belowPoints.push(intersect);
            }
            abovePoints.push(point);
        }

        //if point is below the line
        else {
            if (prevAbove > 0) {
                //If we just passed the line, find intersection of the line with previous edge
                let intersect = Geometry.lineIntersect([prevPoint, point], line);
                abovePoints.push(intersect);
                belowPoints.push(intersect);
            }
            belowPoints.push(point);
        }
        
        prevPoint = point;
        prevAbove = above;
    }
    return [abovePoints, belowPoints];
    
}

/*Returns a list of polygons representing the intersection of polygonA and polygonB,
 or an empty list if there is no intersection. */
Geometry.polyIntersect = function(polygonA, polygonB) {
    var solution = new ClipperLib.Paths();
    var c = new ClipperLib.Clipper() //Clipper for figuring out polygon intersectom
    c.AddPaths([polygonA], ClipperLib.PolyType.ptSubject, true);
    c.AddPaths([polygonB], ClipperLib.PolyType.ptClip, true);

    c.Execute(ClipperLib.ClipType.ctIntersection, solution);
    return solution;
}

/*****************************************************************
 *  General polygon functions 
 * /**************************************************************/

/* Multiply each coordinate in <polygon> by <scale> */
Geometry.scalePoly = function(polygon, scale) {
    for(var point of polygon) {
        point.X = point.X * scale;
        point.Y = point.Y * scale;
    }
}

/* Moves <polygon> by xDisp, yDisp */
Geometry.translatePoly = function(polygon, xDisp, yDisp) {
    for(var point of polygon) {
        point.X = point.X + xDisp;
        point.Y = point.Y + yDisp;
    }
}

/*Takes a list of points representing a polygon; returns a list of triangles
 representing a triangulatoin of that polygon */
Geometry.triangulate = function(pointList) {
    let triIndices = earcut(flatten(pointList));
    let triangles = [];

    //translate groups of three indices into polygons
    for(let i = 2; i < triIndices.length; i+= 3) {
        var point1 = pointList[triIndices[i - 2]];
        var point2 = pointList[triIndices[i - 1]];
        var point3 = pointList[triIndices[i]];

        let newTri = [point1, point2, point3];
        triangles.push(newTri);
    }
    return triangles;
}

//Returns the area of Polygon
Geometry.area = function(polygon) {
    return Math.abs(ClipperLib.Clipper.Area(polygon));
}

//Returns the x and y coordinates bounding <polygon) on all sides
Geometry.bounds = function(polygon) {
    let xMin = polygon[0].X;
    let xMax = polygon[0].X;
    let yMin = polygon[0].Y;
    let yMax = polygon[0].Y;
    for (var point of polygon) {
        if (point.X < xMin) {xMin = point.X;}
        if (point.X > xMax) {xMax = point.X;}
        if (point.Y < yMin) {yMin = point.Y;}
        if (point.Y > yMax) {yMax = point.Y;}
    }
    return [xMin, xMax, yMin, yMax]
}

/*Scales polygonA and polygonB by the same amount so that both can display 
 within a box of <width>, <height> */
Geometry.scaleToFit = function (polygonA, polygonB, width, height) {
    
    let [xMinA, xMaxA, yMinA, yMaxA] = Geometry.bounds(polygonA);
    let [xMinB, xMaxB, yMinB, yMaxB] = Geometry.bounds(polygonB);

    var maxWidth = Math.max((xMaxA - xMinA), (xMaxB - xMinB));
    var maxHeight = Math.max((yMaxA - yMinA), (yMaxB - yMinB));

    var ratioWidth = width/maxWidth;
    var ratioHeight = height/maxHeight;

    var scaleRatio = Math.min(ratioWidth, ratioHeight);

    // We could check that scaleRatio < 1, but it looks better to scale up, as well
    Geometry.scalePoly(polygonA, scaleRatio);
    Geometry.scalePoly(polygonB, scaleRatio);
}

//Translate polygon to be centered in the positive window of <width>, <height> from the origin
Geometry.center = function (polygon, width, height) {
    let [xMin, xMax, yMin, yMax] = Geometry.bounds(polygon);
    var xCenter = (xMax - xMin)/2 + xMin;
    var yCenter = (yMax - yMin)/2 + yMin;
    var xDisp = width/2 - xCenter;
    var yDisp = height/2 - yCenter;

    Geometry.translatePoly(polygon, xDisp, yDisp);
}

/******************************************************************************************
 *  Rectangle class
 ******************************************************************************************/

//Class that represents an axis-aligned rectangle
class AxisRect {
    constructor(downleft, width, area) {
        this.area = Math.abs(area);
        this.w = width;
        this.h = this.area/this.w;
        this.downleft = downleft;
        this.topright = {X: this.downleft.X + this.w, 
                         Y: this.downleft.Y + this.h};
    }
    //Functinos for the bounds
    xMin() {
        return this.downleft.X;
    }
    yMin() {
        return this.downleft.Y;
    }
    xMax() {
        return this.topright.X;
    }
    yMax() {
        return this.topright.Y;
    }
    //Returns an array of points in the rectangle
    points() {
        return [this.downleft,
                {X: this.xMax(), Y: this.yMin()},
                this.topright,
                {X: this.xMin(), Y: this.yMax()}];
    }
}



/******************************************************************************************
 *  Test
 ******************************************************************************************/

Geometry.test = function() {
    console.log("Geometry module tests");

    let a = {X: -4, Y: 0};
    let b = {X: 10, Y: 22};
    console.log("midpoint - should be (3, 11): ", Geometry.midpoint(a, b));

    //Test some positive vs. negative slopes
    let positive = [{X: 0, Y: 0}, {X: 9, Y: 3}];
    let negative = [{X: -4, Y: 3.4,}, {X: 9, Y: -5.2}];
    let horizontal = [{X: 0, Y: 5,}, {X: 3, Y: 5}];
    let vertical = [{X: -4, Y: -3.4,}, {X: -4, Y: 5}];
    console.log("positive: ", positive);
    console.log("negative: ", negative);


    let abovePoint = {X: 2, Y: 0};
    let belowPoint = {X: -2, Y: 0};
    let onPoint = {X: 0, Y: 0};
    console.log("above point: ", Geometry.aboveLine(abovePoint, positive));
    console.log("below point: ", Geometry.aboveLine(belowPoint, positive));
    console.log("on point: ", Geometry.aboveLine(onPoint, positive));

    console.log("positive slope check: ", Geometry.posSlope(positive));
    console.log("negative slope check: ", Geometry.posSlope(negative));

    console.log("positive angle from horizontal: ", Geometry.angleFromHoriz(positive) * 90/Math.PI);
    console.log("negative angle from horizontal: ", Geometry.angleFromHoriz(negative) * 90/Math.PI);

    console.log("negative leftmost: ", Geometry.leftmost(negative));
    console.log("negative rightmost: ", Geometry.rightmost(negative));


    let testTri = [{X: 0, Y: 0,}, {X: 0, Y: 3}, {X: 4, Y: 0}];

    console.log("area (should be 6): ", Geometry.triArea(testTri));

    let [side, oppPoint, longPoints] = Geometry.longestSide(testTri);

    console.log("longest side: ", side);
    console.log("opposite point: ", oppPoint);

    let corner = Geometry.pivotCorner(testTri);
    console.log("pivot corner: ", corner);

    
}