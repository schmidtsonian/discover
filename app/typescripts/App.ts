/// <reference path="definitions/jquery/jquery.d.ts" />
/// <reference path="RippleButton.ts" />


namespace app {

    

    import RippleButton = app.RippleButton;

    export class Main {
        
        private rippleButton     : RippleButton;

        constructor() {

            this.rippleButton = new RippleButton();
        }

        init() {

            this
                .bindings()
        }

        private bindings(): this {

            this.rippleButton.init();

            return this;
        }
    }
}
