/// <reference path="../definitions/jquery/jquery.d.ts"/>

namespace amex.utils{

    export class Loader {

        private nameSelector: string;
        private nameData: string;

        constructor() {

            this.nameSelector = '[data-imgsrc]';
            this.nameData = 'imgsrc';
        }

        loadImages( $scope: JQuery ): JQueryPromise<{}> {


            const defer = $.Deferred();
            let arr: string[] = []; 
            let imgLoaded = 1;
            function validate() { if( imgLoaded >= arr.length){ defer.resolve(); } }

            $scope
            .find( this.nameSelector )
            .each( (index, value) => {
                
                arr.push( $( value ).data( this.nameData ) );

            } );


            validate();

            arr.forEach( ( src: string ) => {

                var img: any = new Image();
                img.src = src;
                img.onload = validate;
                img.onerror = validate;
            });

            return defer.promise();
        }
    }
}