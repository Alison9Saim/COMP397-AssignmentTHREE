﻿module utility {

    //Distance utility function
    export function distance(p1: createjs.Point, p2: createjs.Point) {
        return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
    }
}