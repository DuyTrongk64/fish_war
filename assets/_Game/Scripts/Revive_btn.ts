import GameManager from "./Manager/GameManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad () {
        this.node.on("touchstart", () => {
            GameManager.Ins.player.onRevive();
        });
    }

    start () {

    }

    // update (dt) {}
}
