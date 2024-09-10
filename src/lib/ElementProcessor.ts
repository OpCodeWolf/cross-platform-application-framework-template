import { Direction, QBoxLayout, QLabel, QPushButton, QWidget } from "@nodegui/nodegui";
import { DialogButtonInterface } from "./interfaces";
import { View } from "./View";

export class ElementProcessor {

    constructor() {

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
    public addButton = (parentWidget: QWidget, button: DialogButtonInterface, parentLayout: QBoxLayout, onClick: (value: string, parentWidget: QWidget, button: QPushButton) => void) => {
        const dlgButton = new QPushButton();
        dlgButton.setText(button.label);
        parentLayout.addWidget(dlgButton);

        // Connect button's clicked signal to the preset event handler
        dlgButton.addEventListener('clicked', () => {
            try {
                onClick(button.value, parentWidget, dlgButton);
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
    public addLayout = (parentLayout: QBoxLayout, direction: string) => {
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
    /**
     * Processes and adds a UI element (such as a label, layout, or button) to the specified parent layout.
     * Depending on the type of the element, it calls the appropriate method to add the element to the layout.
     *
     * @param parentLayout the parent QBoxLayout to which the element will be added
     * @param element      the UI element object containing type, message, direction, or event information
     */
    public processElement = (parentWidget: QWidget, parentLayout: QBoxLayout, element: any) => {
        if (element.type == 'label') {
            this.addLabel(element.label, parentLayout);
        } else if (element.type == 'layout') {
            const newLayout: QBoxLayout = this.addLayout(parentLayout, element.direction);
            element.elements.forEach((subElement: any) => {
                this.processElement(parentWidget, newLayout, subElement);
            });
        } else if (element.type == 'button') {
            this.addButton(parentWidget, element, parentLayout, (value: string, parentWidget: QWidget, button: QPushButton) => {
                try {
                    element.onClick(value, parentWidget, button);
                } catch(error) {
                    console.error(error);
                }
            });
        }
    }

    public processElements = (parentWidget: QWidget, parentLayout: QBoxLayout, elements: any[]) => {
        // Loop through each element described in options.elements
        elements.forEach((element: any) => {
            this.processElement(parentWidget, parentLayout, element);
        });
    };
}