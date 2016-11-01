/// <reference path="../definitions/jquery/jquery.d.ts" />
/// <reference path="../definitions/handlebars/handlebars.d.ts" />

/// <reference path="../utils/Loader.ts" />

namespace amex.controls {

    import Loader = amex.utils.Loader;

    export class Results {

        private loader: Loader;
        private $scope: JQuery;
        private $places: JQuery;
        private nameSelectorNavResults: string;
        private nameDataContent: string;
        private nameDataResultId: string;
        private isOpen: boolean;

        constructor ( loader: Loader ) {

            this.loader = loader;
            this.$scope = $( '#js-reults' );
            this.$places = $( '.js-results__place', this.$scope );

            this.nameSelectorNavResults = '.js-results__nav';
            this.nameDataContent = 'content';
            this.nameDataResultId = 'result-id';
            this.isOpen = false;
        }

        private closeAll() {

            this.$places.empty();
        }

        bindings() {

            $( document )
            .on( 'click touched', this.nameSelectorNavResults, ( e ) => { 
                this.openResultsById( $( e.currentTarget ).data( this.nameDataResultId ) );
            })
        }
        
        openResultsById ( idResult: string ): JQueryPromise<{}> {
            
            const defer = $.Deferred();
            const $el = this.$places.filter( function(){ return this.id == idResult });
            
            if( $el.length <= 0 ){ defer.resolve(); }


            this.closeAll();

            const content = $el.data( this.nameDataContent );
            const src = $( '#' + content.id_template ).html();
            const template = Handlebars.compile(src);

            $el.append( template(content) );

            // resolve animation
            defer.resolve();
            
            return defer.promise();
        }

        open(): JQueryPromise<{}> {

            const defer = $.Deferred();

            if( this.isOpen ) { defer.resolve(); }

            this.isOpen = true;
            this.$scope.css({'display': 'block' });
            
            // resolve animation
            defer.resolve();
            
            return defer.promise();
        }

        close(): JQueryPromise<{}> {

            const defer = $.Deferred();

            if( !this.isOpen ) { defer.resolve(); }

            this.closeAll();
            this.isOpen = false;
            this.$scope.css({'display': 'none' });
            
            // resolve animation
            defer.resolve();
            
            return defer.promise();
        }
    }
}