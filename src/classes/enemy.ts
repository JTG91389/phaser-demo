import { Math, Scene } from 'phaser';
import { Actor } from './actor';
import { Player } from './player';

import { EVENTS_NAME } from '../consts';

// TODO: lets make these enemies able to target each other if they are of different types
// TODO: let's see if we can add projectiles to enemies and maybe add little animations to those projectiles
// TODO: let's see if we can add loot for when you defeat an enemy

export class Enemy extends Actor {
    private target: Player;
    private AGRESSOR_RADIUS = 100;
    private attackHandler: () => void;

    constructor(
        scene: Scene,
        x: number,
        y: number,
        texture: string,
        target: Player,
        frame?: string | number,
    ) {
        super(scene, x, y, texture, frame);
        this.target = target;
        // ADD TO SCENE
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // PHYSICS MODEL
        this.getBody().setSize(16, 16);
        this.getBody().setOffset(0, 0);

        // attach handler
        this.attackHandler = () => {
            if (Math.Distance.BetweenPoints(
            { x: this.x, y: this.y },
            { x: this.target.x, y: this.target.y },) < this.target.width) {
                    this.getDamage();
                    this.disableBody(true, false);
                    this.scene.time.delayedCall(300, () => {
                        this.destroy();
                    });
            }
        };

        // EVENTS
        this.scene.game.events.on(EVENTS_NAME.attack, this.attackHandler, this);
        this.on('destroy', () => {
            this.scene.game.events.removeListener(EVENTS_NAME.attack, this.attackHandler);
        });
    }

    preUpdate(): void {
        if (
        Math.Distance.BetweenPoints(
            { x: this.x, y: this.y },
            { x: this.target.x, y: this.target.y },
        ) < this.AGRESSOR_RADIUS) {
            this.getBody().setVelocityX(this.target.x - this.x);
            this.getBody().setVelocityY(this.target.y - this.y);
        } else {
            this.getBody().setVelocity(0);
        }
    }

    public setTarget(target: Player): void {
        this.target = target;
    }
}