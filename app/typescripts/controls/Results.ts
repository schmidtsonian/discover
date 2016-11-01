/// <reference path="../definitions/jquery/jquery.d.ts" />
/// <reference path="../definitions/handlebars/handlebars.d.ts" />

/// <reference path="../utils/Loader.ts" />

namespace amex.controls {

    import Loader = amex.utils.Loader;

    export class Results {

        private loader: Loader;
        private $scope: JQuery;
        private $places: JQuery;
        private nameDataContent: string;
        private isOpen: boolean;

        constructor ( loader: Loader ) {

            this.loader = loader;
            this.$scope = $( '#js-reults' );
            this.$places = $( '.js-results__place', this.$scope );

            this.nameDataContent = 'content';
            this.isOpen = false;
        }

        private closeAll() {

            this.$places.empty();
        }

        bindings() {
            $(document)
            .on('click touched', '.js-results__nav', (e) => { 
                console.log( $(e.currentTarget).data('result-id'));
                this.open( $(e.currentTarget).data('result-id') );
            })
        }
        
        open ( idResult: string ): JQueryPromise<{}> {
            
            const defer = $.Deferred();
            const $el = this.$places.filter( function(){ return this.id == idResult });
            
            if( $el.length <= 0){ defer.resolve(); }

            this.closeAll();

            const content = $el.data( this.nameDataContent );
            const src = $( '#' + content.id_template ).html();
            const template = Handlebars.compile(src);

            $el.append(template(content));

            this.isOpen = true;

            defer.resolve();
            
            return defer.promise();
        }
    }
}