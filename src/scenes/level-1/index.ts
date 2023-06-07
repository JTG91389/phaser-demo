import { Scene, Tilemaps } from 'phaser';
import { Player } from '../../classes/player';
import { Enemy } from '../../classes/enemy';
import { gameObjectsToObjectPoints } from '../../helpers/gameobject-to-object-point';
import { EVENTS_NAME } from '../../consts';

export class Level1 extends Scene {
    private player!: Player;
    private map!: Tilemaps.Tilemap;
    private tileset!: Tilemaps.Tileset;
    private wallsLayer!: Tilemaps.TilemapLayer;
    private groundLayer!: Tilemaps.TilemapLayer;
    private chests!: Phaser.GameObjects.Sprite[];
    private enemies!: Phaser.GameObjects.Sprite[];

    constructor() {
        super('level-1-scene');
    }

    create(): void {
        this.initMap();
        this.player = new Player(this, 100, 100);
        this.physics.add.collider(this.player, this.wallsLayer);
        // adding camera following agent, requires player to be present to init
        this.initCamera();
        this.chests = this.initCollisionItems(this.map, this.player, { collectionName: 'Chests', objectName: 'ChestPoint', spriteId: 595, spriteType: 'tiles_spr'}, EVENTS_NAME.chestLoot);
        // this needs to go after player being created because the initChests depends on player to setup collision logic
        this.initEnemies();
    }

    update(): void {
        this.player.update();
    }

    private initMap(): void {
        this.map = this.make.tilemap({ key: 'dungeon', tileWidth: 16, tileHeight: 16 });
        this.tileset = this.map.addTilesetImage('dungeon', 'tiles');
        this.groundLayer = this.map.createLayer('Ground', this.tileset, 0, 0);
        this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0);
        this.wallsLayer.setCollisionByProperty({ collides: true });
        this.physics.world.setBounds(0, 0, this.wallsLayer.width, this.wallsLayer.height);
        if (this.physics.config.debug) {
            this.showDebugWalls(this.wallsLayer);
        }
    }

    private showDebugWalls(walls: Tilemaps.TilemapLayer): void {
        const debugGraphics = this.add.graphics().setAlpha(0.7);
        walls.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        });
    }

    private initCollisionItems(map: Tilemaps.Tilemap, player: Player, targetObject: TagetObject, collisionEvent: EVENTS_NAME = null): Phaser.GameObjects.Sprite[] {
        let output: Phaser.GameObjects.Sprite[];
        const objectPoints = gameObjectsToObjectPoints(
            map.filterObjects(targetObject.collectionName, obj => obj.name === targetObject.objectName),
        );
        output = objectPoints.map(objectPoint =>
            this.physics.add.sprite(objectPoint.x, objectPoint.y, targetObject.spriteType, targetObject.spriteId).setScale(1.5),
        );
        output.forEach(chest => {
            this.physics.add.overlap(player, chest, (obj1, obj2) => {
                this.game.events.emit(collisionEvent, [{score: 11}]);
                obj2.destroy();
                this.cameras.main.flash();
            });
        });
        return output;
    }

    private initEnemies(): void {
        const enemiesPoints = gameObjectsToObjectPoints(
            this.map.filterObjects('Enemies', (obj) => obj.name === 'EnemyPoint'),
        );
        this.enemies = enemiesPoints.map((enemyPoint) =>
            new Enemy(this, enemyPoint.x, enemyPoint.y, 'tiles_spr', this.player, 503)
            .setName(enemyPoint.id.toString())
            .setScale(1.5),
        );
        this.physics.add.collider(this.enemies, this.wallsLayer);
        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(this.player, this.enemies, (obj1, obj2) => {
            (obj1 as Player).getDamage(1);
        });
    }

    private initCamera(): void {
        this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        this.cameras.main.setZoom(4);
    }
}