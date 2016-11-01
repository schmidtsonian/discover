/// <reference path="../definitions/jquery/jquery.d.ts" />


namespace amex.controls {

    export class Menu {

        private $btMenu: JQuery;
        private $btReset: JQuery;
        private $nav: JQuery;

        private nameClassOpen: string;
        private nameClassLoaded: string;
        private isOpen: boolean;

        public onSelectReset: Function;

        constructor () {

            this.$btMenu = $( '#js-menu__bt' );
            this.$nav = $( '#js-menu' );
            this.$btReset = $( '#js-reset' );
            this.nameClassOpen = 'open';
            this.nameClassLoaded = 'loaded';
            this.isOpen = false;
        }


        intro () {

            this.$btMenu.addClass(this.nameClassLoaded);
        }

        bindings() : this {

            this.$btMenu.on( 'click touched', this.toggle.bind( this ) );
            this.$btReset.on( 'click touched', this.onReset.bind( this ) );

            return this;
        }

        private onReset() {

            if( typeof this.onSelectReset == 'function' ){
                this.close();
                this.onSelectReset();
            }
        }

        private toggle() {

            if ( this.isOpen ) {
                this.close(); 
            }
            else { 
                this.open();  
            }
        }

        private open() {

            this.isOpen = true;
            this.$btMenu.addClass( this.nameClassOpen );
            this.$nav.addClass( this.nameClassOpen );
        }

        private close() {

            this.isOpen = false;
            this.$btMenu.removeClass( this.nameClassOpen );
            this.$nav.removeClass( this.nameClassOpen );
        }

    }
}