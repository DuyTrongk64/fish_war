import PoolControl from "./Pool/PoolControl";
import PoolMember from "./Pool/PoolMember";
import SimplePool from "./Pool/SimplePool";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Meat extends PoolMember {

    @property
    downSpeed: number = 0;

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        //console.log(other.name);
        if(other.node.name == 'Body'){
            SimplePool.despawn(this); 
        }
    }

    update (dt) {
    let direction = new cc.Vec3(0, -1, 0);
    let newPosition = this.node.position.add(direction.multiplyScalar(this.downSpeed * dt));
    this.node.setPosition(newPosition);
   }
}
