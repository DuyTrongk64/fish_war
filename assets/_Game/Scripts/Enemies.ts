import Character from "./Character";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemies extends Character {

    @property(cc.Prefab)
    meat: cc.Prefab;

    @property(cc.Prefab)
    bone: cc.Prefab;


    public onHit(){
        super.onHit();
    }

    protected onDeath(){
        

        this.node.destroy();

        let block1: cc.Node|null = null;

        block1 = cc.instantiate(this.meat);

        this.node.parent.addChild(block1);

        block1.setPosition(this.node.getPosition());

        let block2: cc.Node|null = null;

        block2 = cc.instantiate(this.bone);

        this.node.parent.addChild(block2);

        block2.setPosition(this.node.getPosition());

    }


    update (dt) {}
}
