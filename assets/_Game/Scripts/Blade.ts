import Character from './Character'
import CacheComponent from "./CacheComponent";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Blade extends cc.Component {

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        console.log(other);
        CacheComponent.getCharacter(other).onDeath();
    }
   
}
