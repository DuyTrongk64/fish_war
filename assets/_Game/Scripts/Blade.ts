import Character from './Character'
import CacheComponent from "./CacheComponent";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Blade extends cc.Component {

    onLoad() {
        // Enable Collision System
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        console.log(other.getComponent(Character));
        if(other.node.name == 'Body'){
            if(other.node.parent.name == 'Enemy')
            other.getComponent(Character).onDeath();
            //other.node.parent.getComponent('Enemies').onDeath();

            if(other.node.parent.name == 'Player')
            other.node.parent.getComponent('Player').onDeath();
        }
    }
   
}
