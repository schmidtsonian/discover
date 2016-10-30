/// <reference path="../definitions/jquery/jquery.d.ts" />

/// <reference path="../utils/Loader.ts" />

namespace amex.controls {

    import Loader = amex.utils.Loader;

    export class Options {

        private loader: Loader;

        private $scope: JQuery;
        private $slides: JQuery;
        private $cards: JQuery;
        private isOpen: boolean;

        private nameClassLoaded: string;
        private nameDataOption: string;
        private nameDataResult: string;

        public onSelectResult: Function;

        constructor(loader: Loader){

            this.loader = loader;
            this.$scope = $( '#js-options' );
            this.$slides = $( '.js-options-slide', this.$scope );
            this.$cards = $( '.js-option-card', this.$scope );

            this.nameClassLoaded = 'loaded';
            this.nameDataOption = 'option';
            this.nameDataResult = 'result';

            this.isOpen = true;
        }

        bindings() {

            this.$cards.on('click touched', this.onClickCard.bind( this ) );
        }

        init(): JQueryPromise<{}> {
            
            const defer = $.Deferred();

            this
                .loadImages()
                .then( this.intro.bind( this ) )
                .then( () => { defer.resolve(); } );

            return defer.promise();
        }

        private loadImages(): JQueryPromise<{}> {

            const defer = $.Deferred();

            if(!this.isOpen){

                this.loader
                    .loadImages(this.$scope)
                    .then( () => { defer.resolve(); } );
            }else{
                defer.resolve();
            }

            return defer.promise();
        }

        private intro(): JQueryPromise<{}> {

            const defer = $.Deferred();

            setTimeout( () => {

                this.$scope.addClass(this.nameClassLoaded);
                defer.resolve();
            }, 250 );

            return defer.promise();
        }


        private  onClickCard( e: JQueryEventObject ) {

            const $el = $( e.currentTarget );
            const idOption: string = $el.data (this.nameDataOption );
            
            if(  idOption != "" ){

                this.openSlide( idOption );

            } else {

                if(typeof this.onSelectResult == 'function' ){
                    this.onSelectResult( $el.data( this.nameDataResult ));
                }
            }
        }
        
        resetOptions() {
        }

        openSlide(idOption: string) {

            const $el = this.$slides.filter( function(){ return this.id == idOption });
            if($el.length <= 0){ return; }

            this.$slides.css({'display': 'none' });
            $el.css({'display': 'block' });
        }

        private closeAll() {

            if(!this.isOpen){ return; }
        }

        
    }
}