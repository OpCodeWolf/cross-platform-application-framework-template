import { QPushButton, QWidget } from "@nodegui/nodegui";
import { Dialog } from "./Dialog";
import { DialogOptionsInterface } from "../interfaces";
import { License } from "../License";

export class AboutDialogExample extends Dialog {
    public license: License = new License();
    public options: DialogOptionsInterface = {
        title: 'About',
        modal: true, // Always appear over the main window, if set to true 
        minWidth: 420,
        minHeight: 320,
        elements: [
            {
                type: 'layout',
                direction: 'vertical',
                align: 'top',
                elements: [
                    {
                        type: 'label',
                        label: this.license.about_gui_license_information,
                    },
                    {
                        type: 'layout',
                        direction: 'horizontal',
                        align: 'center',
                        elements: [
                            {
                                type: 'button',
                                label: 'Ok',
                                value: 'ok',
                                primary: true,
                                disabled: false,
                                onClick: this.processDialogClickEvent,
                            },
                        ]
                    },
                ]
            },
        ],
    }

    constructor() {
        super();
        this.setOptions(this.options);
        this.repolish();
    }

    protected processDialogClickEvent(value: string, parentDialog: QWidget, button: QPushButton) {
        parentDialog.close();
    }

}