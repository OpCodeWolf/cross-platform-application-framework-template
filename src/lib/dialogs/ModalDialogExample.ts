/**
 * This is a NodeGui based cross platform application template.
 * Copyright (C) 2024 OpCodeWolf (opcodewolf@proton.me)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { QPushButton, QWidget } from "@nodegui/nodegui";
import { Dialog } from "./Dialog";
import { DialogOptionsInterface } from "../interfaces";

export class ModalDialogExample extends Dialog {
    /**
     * Defines the dialog options for configuring a modal dialog, including its title, size, and layout.
     * The dialog contains a vertical layout with a label and a horizontal layout with three buttons: 'Ok', 'Cancel', and 'Other'.
     * Each button is associated with a click event handler, and properties such as primary status and disabled state are configurable.
     */
    public options: DialogOptionsInterface = {
        title: 'Modal Dialog',
        modal: true, // Always appear over the main window, if set to true 
        width: 400,
        height: 100,
        minWidth: 300,
        minHeight: 100,
        elements: [
            {
                type: 'layout',
                direction: 'vertical',
                align: 'center',
                elements: [
                    {
                        type: 'label',
                        label: 'This is a modal dialog example.',
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
                            {
                                type: 'button',
                                label: 'Cancel',
                                value: 'cancel',
                                primary: true,
                                disabled: true,
                                onClick: this.processDialogClickEvent,
                            },
                            {
                                type: 'button',
                                label: 'Other',
                                value: 'other',
                                primary: true,
                                disabled: false,
                                onClick: this.processDialogClickEvent,
                            }
                        ]
                    },
                ]
            },
        ],
    }

    constructor() {
        super();
        this.setOptions(this.options);
    }

    protected processDialogClickEvent(value: string, parentDialog: QWidget, button: QPushButton) {
        switch (value) {
            case 'ok':
                console.log('Ok button clicked');
                parentDialog.close();
                break;
            case 'cancel':
                console.log('Cancel button clicked');
                break;
            case 'other':
                console.log('Other button clicked');
                break;
        }

    }

}
