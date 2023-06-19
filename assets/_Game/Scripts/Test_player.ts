import Character from "./Character";
import SimplePool, { PoolType } from "./Pool/SimplePool";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Test_player extends Character {

    @property(cc.Node)
    Fish: cc.Node = null;

    @property(cc.Node)
    Blade: cc.Node = null;

    start () {
        this.Blade.zIndex = 0;
        this.Fish.zIndex = 3;
        SimplePool.spawn(PoolType.Blade, this.Blade.getWorldPosition(), 0);
        SimplePool.spawn(PoolType.Body, this.Fish.getWorldPosition(), 0);
    }
}
