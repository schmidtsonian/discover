/// <reference path="definitions/jquery/jquery.d.ts" />

/// <reference path="controls/RippleButton.ts" />
/// <reference path="controls/Options.ts" />
/// <reference path="controls/Results.ts" />
/// <reference path="controls/Menu.ts" />

/// <reference path="utils/Loader.ts" />

namespace amex {

    import Loader = amex.utils.Loader;

    import RippleButton = amex.controls.RippleButton;
    import Options = amex.controls.Options;
    import Results = amex.controls.Results;
    import Menu = amex.controls.Menu;
    

    export class App {
        
        private utilLoader: Loader;

        private controlRippleButton: RippleButton;
        private controlOptions: Options;
        private controlResults: Results;
        private controlMenu: Menu;

        constructor() {

            this.utilLoader = new Loader();

            this.controlRippleButton = new RippleButton();
            this.controlOptions = new Options( this.utilLoader );
            this.controlResults = new Results( this.utilLoader );
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
            this.controlResults.bindings();
            this.controlMenu.bindings();

            this.controlOptions.onSelectResult = (id: string) => { 
                this.controlOptions
                    .close()
                    .then( () => { this.controlResults.open( id ); });
            }

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
