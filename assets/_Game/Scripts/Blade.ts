import Character from './Character'
import CacheComponent from "./CacheComponent";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Blade extends cc.Component {

    onLoad() {
        // Enable Collision System
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //manager.enabledDebugDraw = true;
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        console.log(other.node.parent.getComponent(Character)!=null);
        if(other.node.name == 'Body'){
            other.node.parent.getComponent(Character).onHit();
        }
    }
   
}
