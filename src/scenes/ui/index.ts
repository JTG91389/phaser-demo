import { Scene } from 'phaser';
import { Score, ScoreOperations } from '../../classes/score';
import { EVENTS_NAME } from '../../consts';

export class UIScene extends Scene {
    private score!: Score;
    private chestLootHandler: (args: any[]) => void;

    constructor() {
        super('ui-scene');
        this.chestLootHandler = (args: any[]) => {
            this.score.changeValue(ScoreOperations.INCREASE, args[0]['score']);
        };
    }

    create(): void {
        this.score = new Score(this, 20, 20, 0);
        this.initListeners();
    }

    private initListeners(): void {
        this.game.events.on(EVENTS_NAME.chestLoot, this.chestLootHandler, this);
    }
}