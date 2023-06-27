const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    blackBG: cc.Node = null;

    @property(cc.Node)
    arrowOx: cc.Node = null;
    
    @property(cc.Node)
    arrowOy: cc.Node = null;

    private time: number = 0;
    private delay_time: number = 2;

    start () {
        
    }

    update(dt){
        this.time+=dt;
        if(this.time>=this.delay_time){
            this.scheduleOnce(() => {  /// hàm scheduleOnce(()=>{ "thực hiện gì" }, trong vòng bao nhiêu giây) // gọi hàm callback trong khoảng bao nhiêu giây
                this.blackBG.zIndex = 3;
                this.blackBG.active = true;
                //console.log(this.blackBG.active);
            }, 0.5);
            this.scheduleOnce(() => {
                this.arrowOx.active = true;
                console.log(this.arrowOx.active);

                this.arrowOy.active = true;
            }, 1.4);
            this.scheduleOnce(() => {
                this.blackBG.active = false;
                this.arrowOx.active = false;
                this.arrowOy.active = false;
            }, 0);
        }
    }
}
