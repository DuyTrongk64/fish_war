const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    downSpeed: number = 0;

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        if(other.node.name == 'Body'){
            this.node.destroy();
        }
    }

    update (dt) {
    let direction = new cc.Vec3(0, -1, 0);
    let newPosition = this.node.position.add(direction.multiplyScalar(this.downSpeed * dt));
    this.node.setPosition(newPosition);
   }
}
