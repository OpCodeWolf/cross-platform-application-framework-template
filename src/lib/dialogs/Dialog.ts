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

export class Dialog extends QWidget {
    public rootLayout: QBoxLayout = new QBoxLayout(Direction.TopToBottom);
    public result: string = '';

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
        
        // Loop through each element described in options.elements
        options.elements.forEach((element: any) => {
            this.processElement(this.rootLayout, element);
        });

        // Show the dialog.
        this.show();
    }

    /**
     * Processes and adds a UI element (such as a label, layout, or button) to the specified parent layout.
     * Depending on the type of the element, it calls the appropriate method to add the element to the layout.
     *
     * @param parentLayout the parent QBoxLayout to which the element will be added
     * @param element      the UI element object containing type, message, direction, or event information
     */
    public processElement(parentLayout: QBoxLayout, element: any) {
        if (element.type == 'label') {
            this.addLabel(element.label, parentLayout);
        } else if (element.type == 'layout') {
            const newLayout: QBoxLayout = this.addLayout(parentLayout, element.direction);
            element.elements.forEach((subElement: any) => {
                this.processElement(newLayout, subElement);
            });
        } else if (element.type == 'button') {
            this.addButton(element, parentLayout, (value: string, parentWidget: QWidget, button: QPushButton) => {
                try {
                    element.onClick(value, parentWidget, button);
                } catch(error) {
                    console.error(error);
                }
            });
        }
    }

    /**
     * Adds a label with the specified message to the given parent layout.
     *
     * @param message      the text to display in the label
     * @param parentLayout the QBoxLayout to which the label will be added
     */
    public addLabel(message: string, parentLayout: QBoxLayout) {
        const dlgLabel = new QLabel();
        dlgLabel.setText(message);
        parentLayout.addWidget(dlgLabel);
    }

    /**
     * Adds a button to the specified parent layout and attaches an event handler for when the button is clicked.
     * The button's click event triggers the provided onClick function, passing the button's value, the parent widget, and the button itself.
     *
     * @param button       the DialogButton object containing the label and value for the button
     * @param parentLayout the QBoxLayout to which the button will be added
     * @param onClick      the event handler function to be executed when the button is clicked
     */
    public addButton(button: DialogButtonInterface, parentLayout: QBoxLayout, onClick: (value: string, parentWidget: QWidget, button: QPushButton) => void) {
        const dlgButton = new QPushButton();
        dlgButton.setText(button.label);
        parentLayout.addWidget(dlgButton);

        // Connect button's clicked signal to the preset event handler
        dlgButton.addEventListener('clicked', () => {
            try {
                onClick(button.value, this, dlgButton);
            } catch(error) {
                console.error(error);
            }
        });
    }
    
    /**
     * Adds a new layout to the specified parent layout based on the given direction.
     * The direction can be horizontal, vertical, or specify left-to-right, right-to-left, top-to-bottom, or bottom-to-top.
     *
     * @param parentLayout the QBoxLayout to which the new layout will be added
     * @param direction    the direction in which the new layout should be oriented
     * @return the newly created QBoxLayout with the specified direction
     * @throws Error if the direction is invalid
     */
    public addLayout(parentLayout: QBoxLayout, direction: string) {
        let layout = null;
        let dir = direction.replace(/[ -_]/g, '').toLowerCase();
        if (dir === 'horizontal' || dir === 'lefttoright') {
            layout = new QBoxLayout(Direction.LeftToRight);
        } else if (dir === 'vertical' || dir === 'toptobottom') {
            layout = new QBoxLayout(Direction.TopToBottom);
        } else if (dir === 'righttoleft') {
            layout = new QBoxLayout(Direction.RightToLeft);
        } else if (dir === 'bottomtotop') {
            layout = new QBoxLayout(Direction.BottomToTop);
        } else {
            throw new Error(`Invalid direction: ${dir}`);
        }
        parentLayout.addLayout(layout);
        return layout;
    }
}
