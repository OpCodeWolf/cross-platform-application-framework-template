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

import { Direction, QBoxLayout, QLabel, QPushButton, QSize, QWidget, WindowType } from "@nodegui/nodegui";
import { DialogOptionsInterface, DialogButtonInterface } from "../interfaces";
import { ElementProcessor } from "../ElementProcessor";

export class Dialog extends QWidget {
    public rootLayout: QBoxLayout = new QBoxLayout(Direction.TopToBottom);
    public result: string = '';
    public processor: ElementProcessor = new ElementProcessor();
    public options: DialogOptionsInterface;

    constructor(options?: DialogOptionsInterface) {
        super();

        // Set the parent window, required  for converting this widget to a dialog
        this.setParent(this.parentWidget());

        if  (options !== undefined) {
            this.setOptions(options);
        }
    }

    public setOptions(options?: DialogOptionsInterface) {
        // Set the dialogs title text
        if (options.title !== undefined && options.title !== null) {
            this.setWindowTitle(options.title);
        } else {
            this.setWindowTitle('Example Dialog Title');
        }

        // set the default central layout
        this.setLayout(this.rootLayout);
        
        // Set optional options
        if (options.minWidth !== undefined) {
            this.setMinimumWidth(options.minWidth);
        }
        if (options.minHeight !== undefined) {
            this.setMinimumHeight(options.minHeight);
        }
        if (options.maxWidth !== undefined) {
            this.setMaximumWidth(options.maxWidth);
        }
        if (options.minHeight !== undefined) {
            this.setMaximumHeight(options.maxHeight);
        }
        
        // Set dialog width and height
        if (options.width !== undefined) {
            this.resize(options.width, this.height());
        }
        if (options.height !== undefined) {
            this.resize(this.width(), options.height);
        }

        // Set as a dialog modal if the option is set to true
        if (options.modal !== undefined && options.modal !== null && options.modal === true) {
            // Note: This also causes a window update event to execute
            this.setWindowFlag(WindowType.Dialog, true);
        }

        // Replace special characters in title that could break CSS to dashes and convert title to lowercase
        const filteredTitle: string = options.title
            .replaceAll('/([\s~`!@#$%^&*()_+\-={[}\]|\\:;"\'<,>.?/])/g', '-').toLowerCase();

        // Set the id of the dialog for themes
        this.setProperty('id', `dialog-${filteredTitle}`);
        
        // Process the elements to update the dialog
        if (options.elements !== undefined && options.elements !== null) {
            this.processor.processElements(this, this.rootLayout, options.elements);
        }

        // Show the dialog.
        this.show();
    }

    
}
