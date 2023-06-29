import GameManager from "./Manager/GameManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private speed: number = 0;

    protected onLoad(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.on_stick_start, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.on_stick_end, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.on_stick_end, this);
    }

    private on_stick_start(event: cc.Touch) {
        this.speed = GameManager.Ins.player.speed;
        GameManager.Ins.player.speedUp(500);
        console.log(GameManager.Ins.player.speed);
    }

    private on_stick_end(event: cc.Touch) {
        GameManager.Ins.player.speedUp(this.speed);
    }


}
