import fs from 'fs';
import path from 'path';
import { Direction, QBoxLayout, QLabel, QMainWindow, QMenuBar, QPushButton, QWidget } from "@nodegui/nodegui";
import { Resources } from "./Resources";
import { DialogButtonInterface } from './interfaces';
import { ElementProcessor } from './ElementProcessor';

export class View {
    public view: QMainWindow = new QMainWindow();
    public resources: Resources = new Resources();
    public centralWidget: QWidget = new QWidget();
    public rootLayout: QBoxLayout = new QBoxLayout(Direction.TopToBottom);
    public menuBar = new QMenuBar();
    public options: any = {};
    public processor: ElementProcessor = new ElementProcessor();

    constructor(options?: any) {
        this.view.setMenuBar(this.menuBar);
        if (options !== undefined) {
            this.setOptions(options);
        }
    }

    public loadStyle(styleSheetPath: string) {
        // Load configured style
        this.view.setStyleSheet(styleSheetPath);
    }


    public setOptions = (options: any) => {

        // Save the options for the View
        if (options) {
            this.options = options;
        } else {
            throw new Error("No options provided");
        }

        // Set the dialogs title text
        if (options.title !== undefined && options.title !== null) {
            this.view.setWindowTitle(options.title);
        } else {
            this.view.setWindowTitle('Example Dialog Title');
        }

        // set the default central layout
        this.view.setLayout(this.rootLayout);


        if (options.title) {
            this.view.setWindowTitle(options.title);
        }
        if (options.width && options.height) {
            this.view.resize(options.width, options.height);
        }
        if (options.minWidth && options.minHeight) {
            this.view.setMinimumSize(options.minWidth, options.minHeight);
        }
        if (options.maxWidth && options.maxHeight) {
            this.view.setMaximumSize(options.maxWidth, options.maxHeight);
        }
        if (options.fullScreen) {
            this.view.showFullScreen();
        }
        if (options.maximized) {
            this.view.showMaximized();
        }

        if (options.elements !== undefined && options.elements !== null) {
            this.processor.processElements(this.centralWidget, this.rootLayout, options.elements);
        }
        
    }

    public show = () => {
        this.view.show();
    }

    public hide = () => {
        this.view.hide();
    }

    public isVisible = () => {
        return this.view.isVisible();
    }

    public isHidden = () => {
        return this.view.isHidden();
    }


}