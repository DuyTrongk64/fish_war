import Character from "./Character";
import SimplePool, { PoolType } from "./Pool/SimplePool";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemies extends Character {

    @property(cc.Prefab)
    meat: cc.Prefab = null;

    @property(cc.Prefab)
    bone: cc.Prefab = null;

    @property(cc.Node)
    player: cc.Node = null;

    public onHit(){
        super.onHit();
    }

    protected onLoad(){
        this.player = cc.find("./Player");
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


    moveToPlayer(){
        //let playerPos = this.player.getWorldPosition();
        console.log('11111');
    }

    start(){
        this.moveToPlayer();
    }
    update (dt) {}
}
