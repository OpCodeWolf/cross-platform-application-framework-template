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