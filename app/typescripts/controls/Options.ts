/// <reference path="../definitions/jquery/jquery.d.ts" />

/// <reference path="../utils/Loader.ts" />

namespace amex.controls {

    import Loader = amex.utils.Loader;

    export class Options {

        private loader: Loader;

        private $scope: JQuery;
        private isOpen: boolean;

        private nameClassLoaded: string;

        constructor(loader: Loader){

            this.loader = loader;
            this.$scope = $( '#js-options' );
            this.nameClassLoaded = 'loaded';
            this.isOpen = true;
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

        private resetOptions() {

        }

        open() {

            if(this.isOpen){ return; }
        }

        close() {

            if(!this.isOpen){ return; }
        }

        
    }
}