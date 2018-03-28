const throttle = require('throttle-debounce/throttle');
import LoadElement from './loadElement';

export default class DeeDeeLoad{
    constructor(customOptions){
        this._customOptions = customOptions;
        this._setOptions = this._setOptions.bind(this);
        this._getElements = this._getElements.bind(this);
        this._initElements = this._initElements.bind(this);
        this._isElInView = this._isElInView.bind(this);

        this._init();
    }

    /*
        Init DeeDeeLoad;
    */
    _init = function(){
        this._setOptions();
        this._delays = [0, 200, 400, 600, 800];
        this._getElements();
        this._addEventListeners();
        
        if (this._options.removeFromArray) {
            this._elements = Array.prototype.slice.call(this._elements);
        }

        this._initElements();
    };


    /*
        Add eventlisteners
    */
    _addEventListeners = function(){
        window.addEventListener('scroll', throttle(50, this._handleScroll.bind(this)));
        window.addEventListener('touchmove', throttle(50, this._handleScroll.bind(this)));
    };


    /*
        Eventlisteners
    */
    _handleScroll = function(){
        this._initElements();
    };


    /*
        Init elements
    */
    _initElements = function(){
        for (let i = this._elements.length - 1; i >= 0; i--) {
            const el = this._elements[i];

            if (this._options.addRandomDelay) {
                if (el.dataset.src === undefined && el.dataset.delay === undefined) {
                     this._addRandomDelay(el);
                }    
            }
            

            if (this._isElInView(el)) {
                new LoadElement(el);

                if (this._options.removeFromArray) {
                    this._removeItemFromArray(el)
                }
            }
        }
    };

    /*
        Removes element from array to improve performance
    */
    _removeItemFromArray = function(el){
        console.log('REMOVING', el);
        const i = this._elements.indexOf(el);
        if (i > -1) {
            this._elements.splice(i, 1);
        } 
    }

    /*
        Adds random delay to elements
    */
    _addRandomDelay = function(el){
        const randomDelay = this._delays[Math.floor(Math.random() * this._delays.length)];
        el.dataset.delay = randomDelay;
        return el;
    };


    /*
        Check if element is in view
    */
    _isElInView = function(el){
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 && 
            rect.bottom <= (window.innerHeight + el.clientHeight || document.documentElement.clientHeight + el.clientHeight)
        );
    };


    /*
        Get elements
    */
    _getElements = function(){
        this._elements = document.getElementsByClassName(this._options.className);
    };


    /*
        Set options
    */
    _setOptions = function(){
        this._options = {
            className: 'lazy-load',
            addRandomDelay: false,
            removeFromArray: true,
        }

        if (this._customOptions !== undefined) {
            for (const key in this._customOptions){
                
                for(const defaultKey in this._options){

                    if (this._customOptions.hasOwnProperty(defaultKey)) {
                        this._options[defaultKey] = this._customOptions[defaultKey];
                    }
                };
            };
        };
    };
}
