import PoolMember from "./PoolMember";
const { ccclass, property } = cc._decorator;

export enum PoolType {
    None = 0,
    Body = 1,
    Body2 = 2,
    Body3 = 3,
    Body4 = 4,
    Body5 = 5,
    Body6 = 6,
    Body7 = 7,
    Blade = 11,
    Blade2 = 12,
    Blade3 = 13,
    Blade4 = 14,
    Blade5 = 15,
    Blade6 = 16,
    Blade7 = 17,
    Blade8 = 18,
    Enemy = 21,
    Enemy2 = 22,
    Enemy3 = 23,
    Enemy4 = 24,
    Enemy5 = 25,
    Enemy6 = 26,
    Enemy7 = 27,
    Enemy8 = 28,
    Meat1 = 30,
    Meat2 = 31,
    Bone  = 32,
    Hat = 33,
}

@ccclass
export default class SimplePool {

    //trong scene sẽ cần tạo một node và add poolcontrol vào
    //list pool control được dùng để khởi tạo số lượng item tương ứng
    //prefab nào muốn dùng pool sẽ phải kế thừa poolmember
    //định nghĩa item đó bằng pooltype

    private static link: Map<PoolType, Pool> = new Map<PoolType, Pool>;

    //getter
    static isHasPool(poolType : PoolType): boolean {
        return this.link.has(poolType);
    }

    //setter
    static newPool(poolType : PoolType, pool: Pool): void {
        this.link.set(poolType, pool);
    }
    
    //setter
    static getPool(poolType : PoolType): Pool {
        return this.link.get(poolType);
    }

    public static preload(prefab: PoolMember, parentNode: cc.Node, amount: number) {
        
        let pool = new Pool(prefab, parentNode, amount);
        if(!this.isHasPool(pool.poolType)){
            this.newPool(pool.poolType, pool);
        }
    }

    static spawn(nodeType: PoolType, pos: cc.Vec3, angle: number = 0): PoolMember {
        console.log(nodeType);
        if(!this.isHasPool(nodeType)) console.error(" NEED PRELOAD POOL : " + nodeType + "!!!");
        return this.getPool(nodeType).spawn(pos, angle);
    }

    static spawnT<T>(nodeType: PoolType, pos: cc.Vec3, angle: number): T {
        return this.spawn(nodeType, pos, angle) as T;
    }

    static despawn(clone: PoolMember) {
        this.getPool(clone.poolType).despawn(clone);
    }

    //TODO: lam not sau
    static collect(nodeType: PoolType) {
        this.getPool(nodeType).collect();
    }

    static collectAll() {

    }
}


class Pool {

    private parentNode: cc.Node;
    private prefab: PoolMember;
    private list: PoolMember[] = [];

    public get poolType(): PoolType{
        return this.prefab.poolType;
    }

    constructor(prefab: PoolMember, parentNode: cc.Node, amount: number) {
        this.preload(prefab, parentNode, amount);
    }

    public preload(prefab: PoolMember, parentNode: cc.Node, amount: number) {
        this.prefab = cc.instantiate(prefab).getComponent(PoolMember)
        this.parentNode = parentNode;

        for (let i = 0; i < amount; i++) {

            let clone = cc.instantiate(this.prefab.node).getComponent(PoolMember);
            clone.node.active = false;
            this.parentNode.addChild(clone.node);

            this.list.push(clone);
        }
    }

    public spawn(pos: cc.Vec3, angle: number): PoolMember {
        let clone = null;
        if (this.list.length > 0) {
            clone = this.list.shift();
        } else {
            clone = cc.instantiate(this.prefab.node).getComponent(PoolMember);
            this.parentNode.addChild(clone.node);
        }

        clone.node.setWorldPosition(pos);
        clone.node.angle = angle;
        clone.node.active = true;

        return clone;
    }

    public despawn(clone: PoolMember) {
        if(clone.node.active){
            clone.node.active = false;
            this.list.push(clone);
        }

    }

    collect() {
    }

}