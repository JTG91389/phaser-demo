import { Scene } from 'phaser';

export class LoadingScene extends Scene {
    constructor() {
        super('loading-scene');
    }

    /**
     * init(data) {} — kicks in when a scene is created. It accepts the Data Object that we can pass when we call game.scenes.add(dataForInit) or game.scenes.start(dataForInit). For example, when we create a scene while being in some other scene (yes, you can do that). All scenes will be at the same hierarchy level, with no nested scenes.
     * preload() {} — a method that defines what we need to load before the scene and from where. We’ll use it to load assets later on.
     * create(data) {} — a method that gets triggered when a scene is created. In it, we’ll specify positioning for such scene elements as Character and Enemies.
     * update(time, delta) {} — a method that gets called with every render frame (on average, 60 times per second). It’s a game loop in which redrawing, moving objects, etc. occurs.
     */
    create(): void {
        this.scene.start('level-1-scene');
    }

    preload(): void {
        this.load.baseURL = 'assets/';
        // key: 'king'
        // path from baseURL to file: 'sprites/king.png'
        this.load.image('king', 'sprites/king.png');    
        // this loads the king atlas, this means a-frames, our sprite animation sheets, see a-frames in assets, do et
        this.load.atlas('a-king', 'spritesheets/a-king.png', 'spritesheets/a-king_atlas.json');

    }
}
