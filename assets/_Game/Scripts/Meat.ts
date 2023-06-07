const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    downSpeed: number = 0;

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        if(other.node.name == 'Body'){
            console.log(other.node.parent.name);
            console.log(self.name);
            if(other.node.parent.name == 'Enemy')
            {
                this.node.destroy();
                //other.node.parent.getComponent('Enemies').onDeath();
            }

            if(other.node.parent.name == 'Player')
            {
                this.node.destroy();
                //other.node.parent.getComponent('Player').onDeath();
            }
        }
    }

    update (dt) {
    let direction = new cc.Vec3(0, -1, 0);
    let newPosition = this.node.position.add(direction.multiplyScalar(this.downSpeed * dt));
    this.node.setPosition(newPosition);
   }
}
