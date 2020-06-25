/* parts.js
 * Author: Alexandra Palocz
 * Description: Contains classes and functions for handling polygon parts and transformations.
 * 
 * Dependencies:
 * depends on the library math.js (https://github.com/josdejong/mathjs)
 * as well as on the local file geometry.js
 */


//Object for transformation handling methods
var Transform = {};

//the 3x3 identity matrix
Transform.identity = [[1, 0, 0],
                      [0, 1, 0],
                      [0, 0, 1]];

//Applies <transform> to <point>
Transform.apply = function(transform, point) {
    let expandedPoint = [point.X, point.Y, 1];
    let result = math.multiply(transform, expandedPoint);
    return {X:result[0], Y:result[1]};
}

//Returns a matrix for translation by  <xDisp>, <yDisp>
Transform.translation = function(xDisp, yDisp) {
    return [[1, 0, xDisp],
            [0, 1, yDisp],
            [0, 0, 1]];
}

//Returns a matrix for ccw rotation by <theta> around <point>
Transform.rotation = function(theta, point) {
    let rotate = 
            [[Math.cos(theta), -Math.sin(theta), 0],
            [Math.sin(theta), Math.cos(theta), 0],
            [0, 0, 1]];
    let toOrigin = Transform.translation(-point.X, -point.Y);
    let translateBack = Transform.translation(point.X, point.Y);
    return math.multiply(translateBack, math.multiply(rotate, toOrigin));
}

//Applies one transform to an array of polygonal parts
Transform.applyToParts = function(partList, transform) {
    for (let part of partList) {
        part.applyTransform(transform);
    }
}


// A class representing a polygonal part in its current position, along with a 
// matrix representing the transformation from its original position
class PolyPart {
    //Constructor - assumes transformA and transformB
    constructor(polygon, transform) {
        if (polygon.length < 3) {
            //TODO should be an assert
            console.log("Trying to make a part with a non-polygon!!");
            return;
        }
        this.polygon = polygon;

        //Optional: if we supplied existing transforms to pass to this part
        if (transform) {this.transform = transform;}
        else {this.transform = Transform.identity;}

    }

    //modify the transform in <direction> to include a new transformation, and updates the polygon
    applyTransform(newTransform) {
        //Transform each point in the polygon
        for(let i = 0; i < this.polygon.length; i++) {
            this.polygon[i] = Transform.apply(newTransform, this.polygon[i]);
        }

        //update our stored transformation matrix
        this.transform = math.multiply(newTransform, this.transform)
    }

    //returns the original part
    original() {
        let inverse = math.inv(this.transform);
        let original = [];
        for(let point of this.polygon) {
            original.push(Transform.apply(inverse, point));
        }
        return original;
    }

    //Flips the direction of transform so the current polygon is considered as the original, 
    //and the original as its current location 
    flipTransform(){
        let original = this.original();
        this.transform = math.inv(this.transform);
        this.polygon = original;
    }

    //cuts the polygon with a line, and returns two parts
    cut(line) {
        let [pAbove, pBelow] = Geometry.cutLine(this.polygon, line);
        var above = null;
        var below = null;
        if (pAbove.length > 2) {
            above = new PolyPart(pAbove, this.transform);
        }
        if (pBelow.length > 2) {
            below = new PolyPart(pBelow, this.transform);
        }
        return [above, below];
    }

}

//some simple testing to see if this works
function PartsTest() {
    let rect = new AxisRect({X: 30, Y: 40}, 100, 10000);
    let polygon = rect.points();
    
    //test parts
    let polyPart = new PolyPart(polygon);
    let translate = Transform.translation(200, 100);
    polyPart.applyTransform(translate);

    let diagonal = [polyPart.polygon[0], polyPart.polygon[2]];
    let [above, below] = polyPart.cut(diagonal);
    console.log("below.polygon", below.polygon);
    console.log("above.polygon", above.polygon);

    let pivotBelow = Geometry.pivotCorner(below.polygon);
    let rotateBelow = Transform.rotation(1/2 * Math.PI, pivotBelow);
    below.applyTransform(rotateBelow);

    above.flipTransform();
    return [above, below];
}
