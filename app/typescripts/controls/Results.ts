/// <reference path="../definitions/jquery/jquery.d.ts" />
/// <reference path="../definitions/handlebars/handlebars.d.ts" />

/// <reference path="../utils/Loader.ts" />

namespace amex.controls {

    import Loader = amex.utils.Loader;

    export class Results {

        private loader: Loader;
        private $scope: JQuery;
        private $places: JQuery;
        private isOpen: boolean;

        constructor ( loader: Loader ) {

            this.loader = loader;
            this.$scope = $( '#js-reults' );
            this.$places = $( '.js-results__place', this.$scope );

            this.isOpen = false;
        }

        
        open ( id: string ): JQueryPromise<{}> {
            
            console.log('open', id);
            const defer = $.Deferred();
            
            this.isOpen = true;
            defer.resolve();
            
            return defer.promise();
        }
    }
}