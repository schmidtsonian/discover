/// <reference path="definitions/jquery/jquery.d.ts" />

/// <reference path="controls/RippleButton.ts" />
/// <reference path="controls/Options.ts" />

/// <reference path="utils/Loader.ts" />

namespace amex {

    import Loader = amex.utils.Loader;

    import RippleButton = amex.controls.RippleButton;
    import Options = amex.controls.Options;
    

    export class App {
        
        private utilLoader: Loader;

        private controlRippleButton: RippleButton;
        private controlOptions: Options;

        constructor() {

            this.utilLoader = new Loader();

            this.controlRippleButton = new RippleButton();
            this.controlOptions = new Options( this.utilLoader );
        }

        start() {

            this
                .bindings()
                .init()
        }

        private bindings(): this {

            this.controlRippleButton.bindings();

            return this;
        }

        private init(): this {

            
            this.controlOptions.init();
            return this;
        }
    }
}
