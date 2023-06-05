const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    meat: cc.Prefab;

    @property(cc.Prefab)
    bone: cc.Prefab;

    protected onDeath(){
        let block1: cc.Node|null = null;

        block1 = cc.instantiate(this.meat);

        this.node.addChild(block1);

        block1.setPosition(this.node.getPosition());

        let block2: cc.Node|null = null;

        block2 = cc.instantiate(this.bone);

        this.node.addChild(block2);

        block2.setPosition(this.node.getPosition());
    }


    update (dt) {}
}
