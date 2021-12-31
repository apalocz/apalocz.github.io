/* Name: geometry.js
 * Author: Alexandra Palocz
 * Description:
 * Contains various useful objects and functions for geometry calculations related to 
 * equidecomposability
 * 
 * Dependencies:
 * math.js for distance functions (https://github.com/josdejong/mathjs)
 * polybool.js for polygon intersection (https://sourceforge.net/projects/jsclipper/)
 * 
 * polyk.js for triangulation (https://github.com/MartyWallace/PolyK)
 * */

import PolyK from "polyk";
import PolyBool from "polybooljs"
import {distance, intersect as math_intersect, det as math_det} from "mathjs";

export const Geometry = {};

export const FLOAT_COMPARE_CUTOFF = 1e-5;
const POINT_DISTANCE_CUTOFF = 1e-5;

//the number of pixels away from an existing point something can be before it's considered separate
const DRAWING_POINT_DISTANCE_CUTOFF = 10;

//Returns a version of point as object {X:x, Y:y} in array form [x, y]
Geometry.arrPoint = function(objectPoint) {
    return [objectPoint.X, objectPoint.Y];
}

Geometry.lowercasePoint = function(objectPoint) {
    return {x:objectPoint.X, y:objectPoint.Y};
}

Geometry.uppercasePoint = function(objectPoint) {
    return {X:objectPoint.x, Y:objectPoint.y};
}

//flattens a list of points
Geometry.flattenList = function(pointList) {
    let flatList = [];
    for (const point of pointList) {
        flatList.push(point.X);
        flatList.push(point.Y);
    }
    return flatList;
}

Geometry.arrPoints = function(polygon) {
    const arrayPointList = [];
    for(const point of polygon) {
        arrayPointList.push(Geometry.arrPoint(point))
    }
    return arrayPointList;
}

Geometry.xyPoints = function(arrayPointList) {
    const xyPoints = [];
    for(const point of arrayPointList) {
        xyPoints.push({X: point[0], Y: point[1]});
    }
    return xyPoints;
}



Geometry.floatEq = function(floatA, floatB) {
    return Math.abs(floatA - floatB) < FLOAT_COMPARE_CUTOFF;
}

//Determines whether an input point (x1, y1) is close enough to another point (x2, y2) to count them as the same
Geometry.areDrawingClose = function(point1, point2) {
    const dist = Math.hypot(point1.X - point2.X, point1.Y - point2.Y);
    return dist < DRAWING_POINT_DISTANCE_CUTOFF;
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
    return distance(Geometry.arrPoint(segment[0]), Geometry.arrPoint(segment[1]));
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
    let intersect = math_intersect(
                    Geometry.arrPoint(line1[0]), 
                    Geometry.arrPoint(line1[1]), 
                    Geometry.arrPoint(line2[0]),
                    Geometry.arrPoint(line2[1]));
    if (!intersect) return null;
    return {X: intersect[0], Y: intersect[1]};
}

// Returns true if the line segments intersect, false otherwise.
Geometry.checkSegmentIntersection = function(segment1, segment2) {
    //look for intersection point of the lines defined by the segments
    const intersect = math_intersect(
        Geometry.arrPoint(segment1[0]), 
        Geometry.arrPoint(segment1[1]), 
        Geometry.arrPoint(segment2[0]),
        Geometry.arrPoint(segment2[1]));
    if(!intersect) {
        //math null if segments are parallel; check that they aren't colinear with overlap
        return Geometry.isPointNearSegment(segment1, segment2[0]) || Geometry.isPointNearSegment(segment1, segment2[1]);
    }

    //otherwise, check distances to see if the point of intersection is in both line segments
    const intersectPoint = {X: intersect[0], Y: intersect[1]};
    return Geometry.isPointNearSegment(segment1, intersectPoint) && Geometry.isPointNearSegment(segment2, intersectPoint);

}

/* Returns whether the edge drawn to a new point would cause an intersection with the segments connecting
   existing points */
Geometry.newEdgeCollision = function(newPoint, pointList) {
    //Check if the new point creates an intersection
    const newSegment = [pointList[pointList.length - 1], newPoint];
    if(pointList.length < 2) return false;

    if(pointList.length > 2) {
        for(let i = 0; i < pointList.length - 2; i++) {
            const segment = [pointList[i], pointList[i+1]];
            if (Geometry.checkSegmentIntersection(segment, newSegment)) return true;
        }
    }
 
    //check to make sure new line doesn't run over the last segment; only possible if they're colinear
    if (Geometry.ccw(pointList[pointList.length - 1], pointList[pointList.length - 2], newPoint) === 0) {
        //if the second to last point is not on the segment between the third-to-last point and the
        // new point, there is an overlap.
        if(!Geometry.isPointNearSegment([pointList[pointList.length - 2], newPoint])) return true;
        
    }
    return false;
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
    if(yDiff/xDiff > 0 && !this.floatEq(xDiff, 0)) {
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
    if (this.floatEq(triangle[0].X, triangle[1].X)) {
        return triangle[2];
    }
    else if (this.floatEq(triangle[1].X, triangle[2].X)) {
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
    let det = math_det(det_matrix);
    if (det < 0) { return -1; }
    else if (det > 0) { return 1; }
    else { return 0; }
}

//given a line segment and a point, return true if the point is on the segment, false otherwise
Geometry.isPointNearSegment = function(segment, point) {
    // the point is on the segment if and only if the sum of distances between it
    // and both endpoints is equal to the segment length
    const segLength =  Geometry.segmentLength(segment);
    const distSum = Geometry.segmentLength([segment[0], point]) + 
                    Geometry.segmentLength([segment[1], point]);
    return distSum - segLength <= DRAWING_POINT_DISTANCE_CUTOFF;

}


// Returns 1 if <point> is above the line indicated by <segment>, -1 if 
// it is below, 0 if it is colinear the segment 
Geometry.aboveLine = function(point, segment) {
    if(!point || !segment) return false;

    //if this is a vertical line, return 1 if right of line, -1 if left
    if(this.floatEq(segment[0].X, segment[1].X)) {
        if (point.X > segment[0].X) {return 1};
        if (point.X < segment[0].X) {return -1};
        return 0;
    }
    //determine equation of llne based on segment
    const slope = (segment[0].Y - segment[1].Y)/(segment[0].X - segment[1].X);
    const intercept = segment[0].Y - slope * segment[0].X;
    
    //projection of point's X coordinate onto the line
    const projection  = point.X * slope + intercept;
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

                //null intersection means this point is on the line (possibly missed by abovePoints due to rounding)
                if(!intersect) {
                    abovePoints.push(point);
                    belowPoints.push(point);
                }
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

                //null intersection means this point is on the line (possibly missed by abovePoints due to rounding)
                if(!intersect) {
                    abovePoints.push(point);
                    belowPoints.push(point);
                }
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

Geometry.polyIntersect = function(polygonA, polygonB) {
    const arrayPolygonA = Geometry.arrPoints(polygonA);
    const arrayPolygonB = Geometry.arrPoints(polygonB);
    PolyBool.epsilon(5e-9);
    const result = PolyBool.intersect({regions: [arrayPolygonA], inverted: false}, {regions: [arrayPolygonB], inverted: false});

    const intersections = [];
    for (const region of result.regions) {
        intersections.push(Geometry.xyPoints(region));
    }
    return intersections;
}


Geometry.alignPolys = function(polygonA, polygonB) {
    for (let i = 0; i < polygonA.length; i++) {
      for (let j = 0; j < polygonB.length; j++) {
        if (distance(Geometry.arrPoint(polygonA[i]), Geometry.arrPoint(polygonB[j])) < POINT_DISTANCE_CUTOFF)
            polygonA[i] = polygonB[j];
      }    
    }
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
    let triIndices = PolyK.Triangulate(Geometry.flattenList(pointList));
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

//Given a list of points representing a complete polygon, writes out whether or not it is simple
Geometry.checkSimple= function(pointList) {
    const simple = PolyK.IsSimple(Geometry.flattenList(pointList));
    return simple;
}

//Returns the area of Polygon
Geometry.area = function(polygon) {
    return Math.abs(PolyK.GetArea(Geometry.flattenList(polygon)));
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
export class AxisRect {
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
