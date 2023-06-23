import Character from './Character'
import CacheComponent from "./CacheComponent";
import PoolControl from "./Pool/PoolControl";
import PoolMember from "./Pool/PoolMember";
import SimplePool from "./Pool/SimplePool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Blade extends PoolMember {

    onLoad() {
        this.node.zIndex = 0;
        // Enable Collision System
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //manager.enabledDebugDraw = true;
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        // console.log(`other: ${other.node.parent.parent.name}`);
        // console.log(`self: ${self.node.parent.name}`);
        if (other.node.name == 'Body') {
            if (self.node.parent.name != other.node.parent.parent.name) {
                //console.log(`other: ${other.node.parent.parent.getComponent(Character).name}`);
                other.node.parent.parent.getComponent(Character).onHit();
            }
        }
    }

}
