export default class CreateImageInstance{
    constructor(img){
        this.el = img;
        this.createImage();
    }

    createImage(){
        this.image = new Image();
        const _this = this;
        
        this.image.onload = function(){
            if (_this.el.tagName === 'IMG') {
                _this.el.src = _this.image.src;
            }
            
            if (_this.el.tagName !== 'IMG') {
                _this.el.style.backgroundImage = 'url('+ _this.image.src +')'
            }

            _this.el.classList.add('lazy-loaded');

        };

        this.image.onerror = function(error){
            _this.el.classList.add('lazy-loaded');

            return;
        }        

        this.image.src = this.el.dataset.src;

        return;
    };
}
