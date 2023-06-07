const {ccclass, property} = cc._decorator;

@ccclass
export default class Character extends cc.Component {

    
    //khởi tạo
    public onInit(){
        
    }

    public onHit(){
        this.onDeath(); 
    }

    protected onDeath(){
        
    }

    
}
