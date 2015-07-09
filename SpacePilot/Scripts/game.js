/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="utility/utility.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/space.ts" />
/// <reference path="objects/ship.ts" />
/// <reference path="objects/gem.ts" />
/// <reference path="objects/rock.ts" />
// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage;
var stats;
var assets;
var manifest = [
    { id: "space", src: "assets/images/earthSpace.png" },
    { id: "ship", src: "assets/images/ship2.png" },
    { id: "gem", src: "assets/images/gem.png" },
    { id: "rock", src: "assets/images/rock.png" },
    //sounds
    { id: "collectSound", src: "assets/audio/collect.mp3" },
    { id: "hitSound", src: "assets/audio/hitOne.wav" },
    { id: "engineSound", src: "assets/audio/spaceShipTwo.mp3" }
];
// Game Variables
var space;
var ship;
var gem;
var rocks = [];
//preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listinener handler triggers hwne assets are completely loaded
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
    //setup staistics object
    setupStats();
    //call back function that Initializing game objects
    function init() {
        stage = new createjs.Stage(canvas); //reference to the stage
        stage.enableMouseOver(20);
        createjs.Ticker.setFPS(60); // framerate 60 fps for the game
        //event listener triggers 60 times every second
        createjs.Ticker.on("tick", gameLoop);
        //calling main game function
        main();
    }
    function setupStats() {
        stats = new Stats();
        stats.setMode(0); //set to fps
        // align bottom-right
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '650px';
        stats.domElement.style.top = '10px';
        document.body.appendChild(stats.domElement);
    }
    //Callback function that creats Our Main Game Loop - refreshed 60 fps
    function gameLoop() {
        stats.begin(); //begin measuring
        space.update();
        ship.update();
        gem.update();
        for (var rock = 0; rock < 3; rock++) {
            rocks[rock].update();
            checkCollision(rocks[rock]);
        }
        checkCollision(gem);
        stage.update();
        stats.end(); //end measuring
    }
    //check distance between ship and rock
    function checkCollision(gameObject) {
        var p1 = new createjs.Point();
        var p2 = new createjs.Point();
        p1.x = ship.x;
        p1.y = ship.y;
        p2.x = gameObject.x;
        p2.y = gameObject.y;
        if (utility.distance(p1, p2) < ((ship.heigh * 0.5) + (gameObject.heigh * 0.5))) {
            if (gameObject.isColliding == false) {
                createjs.Sound.play(gameObject.sound);
            }
            gameObject.isColliding = true;
        }
        else {
            gameObject.isColliding = false;
        }
    }
    // Our Main Game Function
    function main() {
        //add space object to stage
        space = new objects.Space(assets.getResult("space"));
        stage.addChild(space);
        //add gem object to stage
        gem = new objects.Gem(assets.getResult("gem"));
        stage.addChild(gem);
        //add ship object to stage
        ship = new objects.Ship(assets.getResult("ship"));
        stage.addChild(ship);
        //add 3 rock object to stage
        for (var rock = 0; rock < 3; rock++) {
            rocks[rock] = new objects.Rock(assets.getResult("rock"));
            stage.addChild(rocks[rock]);
        }
    }
}
//# sourceMappingURL=game.js.map