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
import { DialogOptionsInterface } from "../interfaces/DialogOptionsInterface";
import { Dialog } from "./Dialog";

/**
 * Represents a dialog that includes buttons and extends the base Dialog class.
 * This class is used to create and manage dialog windows with button functionalities.
 */
export class ButtonDialogExample extends Dialog {

    public options: DialogOptionsInterface = {
        title: 'Button Dialog',
        modal: true, // Always appear over the main window, if set to true 
        width: 400,
        height: 100,
        minWidth: 300,
        minHeight: 100,
        elements: [
            {
                type: 'layout',
                direction: 'vertical',
                align: 'top', // Not used yet
                elements: [
                    {
                        type: 'layout',
                        direction: 'horizontal',
                        align: 'center',
                        elements: [
                            {
                                type: 'button',
                                label: 'Random',
                                value: 'random1',
                                primary: false,
                                disabled: false,
                                onClick: this.processDialogClickEvent,
                            },
                            {
                                type: 'button',
                                label: 'Random',
                                value: 'random2',
                                primary: false,
                                disabled: false,
                                onClick: this.processDialogClickEvent,
                            },
                            {
                                type: 'button',
                                label: 'Random',
                                value: 'random3',
                                primary: false,
                                disabled: false,
                                onClick: this.processDialogClickEvent,
                            }
                        ]
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
            default:
                console.log('Random button clicked');
                break;
        }

    }

}