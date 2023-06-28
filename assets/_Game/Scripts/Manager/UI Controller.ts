const { ccclass, property } = cc._decorator;

@ccclass
export default class UI_Controller extends cc.Component {

    @property(cc.Node)
    blackBG: cc.Node = null;

    @property(cc.Node)
    arrowOx: cc.Node = null;

    @property(cc.Node)
    arrowOy: cc.Node = null;

    @property(cc.Node)
    fish: cc.Node = null;

    private time: number = 0;
    private delay_time: number = 1.5;

    onLoad() {
        this.blackBG.active = false;
        this.arrowOx.active = false;
        this.arrowOy.active = false;
        this.fish.active = false;
    }

    start() {

    }

    runAnimation() {
        this.scheduleOnce(() => {  /// hàm scheduleOnce(()=>{ "thực hiện gì" }, trong vòng bao nhiêu giây) // gọi hàm callback trong khoảng bao nhiêu giây
            this.blackBG.active = true;
            this.arrowOx.active = true;
            this.arrowOy.active = true;
            this.fish.active = true;

        }, 0.5);

        this.scheduleOnce(() => {
            this.blackBG.active = false;
            this.arrowOx.active = false;
            this.arrowOy.active = false;
            this.fish.active = false;

        }, 2.5);
    }
    update(dt) {
        this.time += dt;
        if (this.time >= this.delay_time && this.time < 4) {
            this.runAnimation();
        }
    }
}
