/// <reference path="definitions/jquery/jquery.d.ts" />

/// <reference path="controls/RippleButton.ts" />
/// <reference path="controls/Options.ts" />
/// <reference path="controls/Menu.ts" />

/// <reference path="utils/Loader.ts" />

namespace amex {

    import Loader = amex.utils.Loader;

    import RippleButton = amex.controls.RippleButton;
    import Options = amex.controls.Options;
    import Menu = amex.controls.Menu;
    

    export class App {
        
        private utilLoader: Loader;

        private controlRippleButton: RippleButton;
        private controlOptions: Options;
        private controlMenu: Menu;

        constructor() {

            this.utilLoader = new Loader();

            this.controlRippleButton = new RippleButton();
            this.controlOptions = new Options( this.utilLoader );
            this.controlMenu = new Menu();
        }

        start() {

            this
                .bindings()
                .init()
        }

        private bindings(): this {

            this.controlRippleButton.bindings();
            this.controlOptions.bindings();
            this.controlMenu.bindings();

            this.controlOptions.onSelectResult = (id) => { console.log(id);}

            return this;
        }

        private init(): this {

            this.controlOptions
                .init()
                .then(() => { this.controlMenu.intro(); });
            return this;
        }
    }
}
