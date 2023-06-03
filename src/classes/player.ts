import { Actor } from './actor';

export class Player extends Actor {
    private keyW: Phaser.Input.Keyboard.Key|null = null;
    private keyA: Phaser.Input.Keyboard.Key|null = null;
    private keyS: Phaser.Input.Keyboard.Key|null = null;
    private keyD: Phaser.Input.Keyboard.Key|null = null;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'king');
        // KEYS
        if (this.scene?.input?.keyboard) {
            this.keyW = this.scene.input.keyboard.addKey('W');
            this.keyA = this.scene.input.keyboard.addKey('A');
            this.keyS = this.scene.input.keyboard.addKey('S');
            this.keyD = this.scene.input.keyboard.addKey('D');
        }
        // PHYSICS
        this.getBody().setSize(30, 30);
        this.getBody().setOffset(8, 0);
    }
    
    update(): void {
        this.getBody().setVelocity(0);
        if  (this.body) {
            if (this.keyW?.isDown) {
                this.body.velocity.y = -110;
            }
            if (this.keyA?.isDown) {
                this.body.velocity.x = -110;
                this.checkFlip();
                // change render point of physical model(not sprite model) every time we chnage directions we have to account for a hit box miscalc error in phaser, so we manually reset offset
                this.getBody().setOffset(48, 15);
            }
            if (this.keyS?.isDown) {
                this.body.velocity.y = 110;
            }
            if (this.keyD?.isDown) {
                this.body.velocity.x = 110;
                this.checkFlip();
                // change render point of physical model(not sprite model) every time we chnage directions we have to account for a hit box miscalc error in phaser, so we manually reset offset
                this.getBody().setOffset(15, 15);
            }
        }
    }
}