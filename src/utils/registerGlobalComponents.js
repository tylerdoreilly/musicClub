import {
    ExaiButton,
    ExaiHeader,
    ExaiLayout, 
    ExaiLoader,
    ExaiParagraph,
    ExaiPopover, 
    ExaiSpinner
    
} from 'exai-components'

const registerGlobalComponents = (App) => {
    App.component('exai-button', ExaiButton);
    App.component('exai-header', ExaiHeader);
    App.component('exai-layout', ExaiLayout);
    App.component('exai-loader', ExaiLoader);
    App.component('exai-paragraph', ExaiParagraph);
    App.component('exai-popover', ExaiPopover);
    App.component('exai-spinner', ExaiSpinner);
    
}

export default registerGlobalComponents;
