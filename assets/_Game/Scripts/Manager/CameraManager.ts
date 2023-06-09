const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    player_node: cc.Node = null;


    update (dt) {
        let tangent_position = this.player_node.getPosition();
        tangent_position.x = cc.misc.clampf(tangent_position.x,  500, -500);

        tangent_position.y = cc.misc.clampf(tangent_position.y,  300, -300);

        const current_position = this.node.getPosition();
        current_position.lerp(tangent_position, 0.1 , current_position);
        this.node.setPosition(current_position);
    }
}
