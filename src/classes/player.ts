import { Actor } from './actor';
import { Text } from './text';
import { EVENTS_NAME, GameStatus } from '../../src/consts';

import { Input, Scene } from 'phaser';

// TODO: lets allow the player to block enemy attacks from a given direction

export class Player extends Actor {
    private keyW: Input.Keyboard.Key|null = null;
    private keyA: Input.Keyboard.Key|null = null;
    private keyS: Input.Keyboard.Key|null = null;
    private keyD: Input.Keyboard.Key|null = null;
    private keySpace: Input.Keyboard.Key|null = null;
    private hpValue: Text;

    constructor(scene: Scene, x: number, y: number) {
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
        // INit animations
        this.initAnimations();

        // setup hp
        this.hpValue = new Text(this.scene, this.x, this.y - this.height, this.hp.toString())
            .setFontSize(12)
            .setOrigin(0.8, 0.5);

        // adding event listener for pressing space key(attack)
        this.keySpace = this.scene.input.keyboard.addKey(32);
        this.keySpace.on('down', (event: KeyboardEvent) => {
            this.anims.play('attack', true);
            this.scene.game.events.emit(EVENTS_NAME.attack);
        });

        this.on('destroy', () => {
            // remove listener from keySPace
            this.keySpace.removeAllListeners();
        });
    }
    
    update(): void {
        this.getBody().setVelocity(0);
        if  (this.body) {
            if (this.keyW?.isDown) {
                this.body.velocity.y = -110;
                !this.anims.isPlaying && this.anims.play('run', true);
            }
            if (this.keyA?.isDown) {
                this.body.velocity.x = -110;
                this.checkFlip();
                // change render point of physical model(not sprite model) every time we chnage directions we have to account for a hit box miscalc error in phaser, so we manually reset offset
                this.getBody().setOffset(48, 15);
                !this.anims.isPlaying && this.anims.play('run', true);
            }
            if (this.keyS?.isDown) {
                this.body.velocity.y = 110;
                !this.anims.isPlaying && this.anims.play('run', true);
            }
            if (this.keyD?.isDown) {
                this.body.velocity.x = 110;
                this.checkFlip();
                // change render point of physical model(not sprite model) every time we chnage directions we have to account for a hit box miscalc error in phaser, so we manually reset offset
                this.getBody().setOffset(15, 15);
                !this.anims.isPlaying && this.anims.play('run', true);
            }
        }
        this.hpValue.setPosition(this.x, this.y - this.height * 0.4);
        this.hpValue.setOrigin(0.8, 0.5);
    }

    public getDamage(value?: number): void {
        super.getDamage(value);
        this.hpValue.setText(this.hp.toString());
        if (this.hp <= 0) {
            this.scene.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.LOSE);
        }
    }

    private initAnimations(): void {
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames('a-king', {
                prefix: 'run-',
                end: 7,
            }),
            frameRate: 8,
        });
        this.scene.anims.create({
            key: 'attack',
            frames: this.scene.anims.generateFrameNames('a-king', {
                prefix: 'attack-',
                end: 2,
            }),
            frameRate: 8,
        });
    }
}