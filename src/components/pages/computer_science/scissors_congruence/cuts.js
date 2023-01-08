/* cuts.js
 * Author: Alexandra Palocz
 * Description: 
 * Implements the part of the algorithm whereby an arbitrary triangle is cut into 
 * parts that can be re-assembled to form a rectangle of a given width.
 * 
 * Dependencies:
 * math.js (https://github.com/josdejong/mathjs)
 * local files geometry.js and parts.js
 */

import {Geometry, AxisRect} from "./geometry.js";
import {Transform, PolyPart} from "./parts.js";
import {multiply as math_multiply, inv as math_inv} from "mathjs";

const TRI_AREA_CUTOFF = 0.5; //the minimum a triangle area can be before we don't include it in the decomposition

export const Cuts = {};

/*Takes a triangle part and returns an list with:
   - a list of parts in a rectangle of the given width
   - a description of the rectangle those parts comprise
*/
Cuts.rectangulate = function(trianglePart) {

    //Make sure we are dealing with a triangle
    if (trianglePart.polygon.length !== 3) {
        throw Error("Attempting to canonify a non-triangular part");
    }

    //Rotate the triangle so its longest edge is horizontal, and on the bottom
    let [longestSide, oppInd, baseInds] = Geometry.longestSide(trianglePart.polygon);
    let rotAngle = Geometry.angleToBase(longestSide, trianglePart.polygon[oppInd]);
    trianglePart.applyTransform(Transform.rotation(rotAngle, longestSide[0]));

    //Horizontal midpoint cut
    let rotated = trianglePart.polygon;

    let top = rotated[oppInd];
    let base = [rotated[baseInds[0]], rotated[baseInds[1]]];
    let midpoint_line = [Geometry.midpoint(base[0], top), 
                         Geometry.midpoint(base[1], top)];

    let [above, below] = trianglePart.cut(midpoint_line);

    //Vertical altitude cut for top piece
    let vertAltitude = Geometry.vertSegment(top.X);
    let [right, left] = above.cut(vertAltitude);
 
    //Rotate right and left to form a rectangle
    right.applyTransform(Transform.rotation(Math.PI, Geometry.pivotCorner(right.polygon)));
    left.applyTransform(Transform.rotation(Math.PI, Geometry.pivotCorner(left.polygon)));

    // descriptin of the whole new rectangle
    let newRect = new AxisRect(Geometry.leftmost(base), Geometry.segmentLength(base), Geometry.triArea(rotated));

    return [[left, below, right], newRect];
}
      
//Takes an axis aligned rectangle, then cuts and transforms it so that its width is less 
//than twice the desired new width

Cuts.stackRect = function(axisRect, newWidth) {
    let targetWidth = newWidth * 2;
    let rectPart = new PolyPart(axisRect.points());

    //if we are already narrow enough
    if (axisRect.w < targetWidth) {
        return [[rectPart], axisRect];
    }

    //Number of times to cut in half
    let numPieces = 1;
    let pieceWidth = axisRect.w;
    while(pieceWidth > targetWidth) {
        numPieces = numPieces * 2;
        pieceWidth = pieceWidth/2;
    }
    //Cut and translate the pieces
    let pieces = [];
    let remainder = rectPart;
    for(let i = 0; i < numPieces; i++) {
        //Cut a piece off of the rectangle
        let cutX = axisRect.xMin() + ((i+1) * pieceWidth);
        let cutLine = Geometry.vertSegment(cutX);
        const [right, left] = remainder.cut(cutLine);

        //move new piece on top of the stack
        if(i > 0) {
            let dX = -i * pieceWidth;
            let dY = i * axisRect.h;
            let trans = Transform.translation(dX, dY);
            left.applyTransform(trans);
        }
        pieces.push(left);
        remainder = right;
    }
    const newRect = new AxisRect(axisRect.downleft, pieceWidth, axisRect.area);
    return [pieces, newRect];
}

//Takes an axis aligned rectangle with width less than twice the desired width
//and returns a decomposition to a rectangle with  width exactly the new width
Cuts.escalate = function(axisRect, newWidth) {
    let newHeight = axisRect.area / newWidth;

    //Make lines to cut with
    let newTopLeft = {X: axisRect.xMin(), 
                      Y: axisRect.yMin() + newHeight};
    let oldDownRight = {X: axisRect.xMax(), 
                      Y: axisRect.yMin()};
    let diagonal = [newTopLeft, oldDownRight];
    let vertical = Geometry.vertSegment(axisRect.xMin() + newWidth);

    //Cut new parts
    let rectPart = new PolyPart(axisRect.points());
    let [top, bottom] = rectPart.cut(diagonal);
    let [right, left] = bottom.cut(vertical);

    //slide parts to make new rectangle
    let topSlide = Transform.translation(newWidth - axisRect.w, newHeight - axisRect.h);
    let botSlide = Transform.translation(-newWidth, axisRect.h);
    top.applyTransform(topSlide);
    right.applyTransform(botSlide);

    return [right, top, left];
}

/* Goes through and aligns the "equal" vertices of parts so they are actually equal */
Cuts.alignTransferParts = function(parts1, parts2) {
    for (let second of parts2) {
        const original = second.original();
        for (let first of parts1) {
            Geometry.alignPolys(first.polygon, original);
        }
    }
}

/*Transposes the cuts and transforms from parts2 onto parts1
    Assumes that the original shape of parts2 is the same as the current
    shape of parts1, and that all polygons are
    convex (i.e. that every intersection is one convex part) */
Cuts.transfer = function(parts1, parts2) {
    this.alignTransferParts(parts1, parts2);

    let newParts = [];
    //Loop through both lists of parts to find intersections
    for (let second of parts2) {
        const original = second.original();
        for (let first of parts1) {
            let intersect = Geometry.polyIntersect(first.polygon, original);
            if (intersect.length === 0) {continue;}
            if (intersect[0].length < 3) {continue;}
            //If we have intersection with area, make a new part for the intersection
            let newPart = new PolyPart(intersect[0], first.transform);
            newPart.applyTransform(second.transform);
            newParts.push(newPart);
        }
    }
    return newParts;
}

/* Given an axis-aligned rectangle and a new width smaller than its current
   width, returns a list of parts/transformations to decompose it into a 
   rectangle with the new width. */
Cuts.smushRect = function(axisRect, newWidth) {
    //calculate stacking and escalation
    let [stackedParts, sRect] = Cuts.stackRect(axisRect, newWidth);

    let escalatedParts = Cuts.escalate(sRect, newWidth);

    //If we did no stacking, we can just return the escalated parts
    if (stackedParts.length === 1) {
        return escalatedParts;
    }

    //Othewise, transfer escalated parts on top of stacked parts
    return Cuts.transfer(stackedParts, escalatedParts);

}

/*Returns a list with:
    - a of parts for cutting/transforming the given axis-aligned rectangle into a rectangle of 
      width <newWidth>
    - a description of the new rectangle those parts comprise
*/ 
Cuts.rectToRect = function(axisRect, newWidth) {
    const targetRect = new AxisRect(axisRect.downleft, newWidth, axisRect.area);

    //if the width is already equal
    if (newWidth === axisRect.w) {
        return [[new PolyPart(axisRect.points())], targetRect]; 
    }

    //if the new width is smaller, smush this rectangle
    else if (newWidth < axisRect.w) {
        let parts = Cuts.smushRect(axisRect, newWidth);
        return [parts, targetRect];
    }

    //if the new width is larger, smush the target and then flip the transform direction
    else {
        let parts = Cuts.smushRect(targetRect, axisRect.w);
        for(let part of parts) {
            part.flipTransform();
        }
        return [parts, targetRect];
    }

}

/* Takes a triangle and returns
   - a list of PolyParts representing its decomposition into a rectangle of width <newWidth> 
   - a description of the new rectangle those parts comprise */

Cuts.canonifyTri = function(triangle, width) {
    let trianglePart = new PolyPart(triangle);

    // try {
    let [firstParts, firstRect] = Cuts.rectangulate(trianglePart);
    let [canonParts, canonRect] = Cuts.rectToRect(firstRect, width);
    let transferred = Cuts.transfer(firstParts, canonParts);
    // }
    // catch (e) {

    // }
    return [transferred, canonRect];

} 


/* Takes a polygon, and returns a list of parts representing its decomposition into a specified
 * canonical rectangle */
Cuts.canonifyPoly = function(polygon, canonRect) {
    let triangles = Geometry.triangulate(polygon);
    //Now iterate through triangles, creating and stacking rectangles
    var topleft = {X: canonRect.xMin(), Y: canonRect.yMin()};
    let width = canonRect.w;
    let parts = [];
    for (let triangle of triangles) {
         try {
            //if triangle area is sufficiently small, continue; tiny polygons that are almost lines 
            // will cause float errors.
            if(Geometry.area(triangle) < TRI_AREA_CUTOFF) continue;

            //make our rectangle, translate it on top of stack
            let [rectParts, rectInfo] = Cuts.canonifyTri(triangle, width);

            let dX = topleft.X - rectInfo.xMin();
            let dY = topleft.Y - rectInfo.yMin();
            Transform.applyToParts(rectParts, Transform.translation(dX, dY));

            //update list of parts, and current top of stack.
            parts = parts.concat(rectParts);
            topleft.Y = topleft.Y + rectInfo.h;
        }
        catch(e) {
            console.error(e, triangle);
            continue
        }
    }
    return parts;
}

/* Takes two polygons with the same area and returns an equidecomposition between the two:
    piecesA: List of pieces in their position in polygon A
    piecesB: List of pieces in their position in polygon B
    transforms: List of matrices to transform pieces from polygon A to polygon B
 */
Cuts.decompose = function(polygonA, polygonB) {
    let area = Geometry.area(polygonA);

    //make sure the areas are the same (using a cutoff because we're dealing with floats)
    let cutoff = 1e-10;
    if (Geometry.area(polygonB) - area > cutoff) {
        throw Error("areas are not the same: diff = "+Math.abs(Geometry.area(polygonB) - area));

    }

    //Make canonical rectangle, based at origin
    let width = Math.sqrt(area) / 2;
    let canonRect = new AxisRect({X:0, Y:0}, width, area);

    let partsA = Cuts.canonifyPoly(polygonA, canonRect);
    let partsB = Cuts.canonifyPoly(polygonB, canonRect);

    
    //overlay parts
    let piecesA = [];
    let piecesB = [];
    let transforms = [];
    for(var partA of partsA) {
        for(var partB of partsB) {
            try {
            let intersect = Geometry.polyIntersect(partA.polygon, partB.polygon);
            if (intersect.length === 0) {continue;}
            if (intersect[0].length < 3) {continue;}

            //If we have intersection with area, save this piece
            let newPartA = new PolyPart(intersect[0], partA.transform);
            let newPartB = new PolyPart(intersect[0], partB.transform);
            let newTransform = math_multiply(math_inv(partB.transform), partA.transform);

            transforms.push(newTransform);
            piecesA.push(newPartA.original());
            piecesB.push(newPartB.original());
            }
            catch(e) {
                console.error(e, partA, partB);
                continue
            }
        }
    }

    return {
        piecesA: piecesA,
        piecesB: piecesB,
        transforms: transforms
    }
}
