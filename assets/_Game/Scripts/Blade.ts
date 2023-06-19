import Character from './Character'
import CacheComponent from "./CacheComponent";
import PoolControl from "./Pool/PoolControl";
import PoolMember from "./Pool/PoolMember";
import SimplePool from "./Pool/SimplePool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Blade extends PoolMember {

    onLoad() {
        // Enable Collision System
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //manager.enabledDebugDraw = true;
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        //console.log(other.node.parent.getComponent(Character)!=null);
        if(other.node.name == 'Body'){
            other.node.parent.getComponent(Character).onHit();
        }
    }
   
}
