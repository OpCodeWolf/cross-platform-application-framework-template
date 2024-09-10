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

import { QAction, QApplication, QLabel, QMenu, QPushButton, QWidget, WidgetEventTypes } from "@nodegui/nodegui";
import { title } from "process";
import { Config, Resources, View } from "src/lib"
import { AboutDialogExample } from "src/lib/dialogs/AboutDialogExample";

export class MainWindow extends View {
    public appInstance: QApplication = QApplication.instance();

    constructor(resources: Resources, config: Config) {
        super();
        this.initWindowLayout(config);
        this.initMainMenu(config);
        this.initEventListeners(config);
    }

    initEventListeners = (config: Config) => {
        // Window Events
        this.view.addEventListener(WidgetEventTypes.Close, () => { });
        this.view.addEventListener(WidgetEventTypes.Hide, () => { });
        this.view.addEventListener(WidgetEventTypes.Show, () => { });
        this.view.addEventListener(WidgetEventTypes.Resize, () => { });
        this.view.addEventListener(WidgetEventTypes.Move, () => { });
    }

    /**
     * Initializes the layout of the main application window by setting up the central widget, 
     * configuring layout elements such as labels and buttons, and assigning them to the window's layout.
     * This method arranges widgets and sets the central widget for the main window.
     */
    public initWindowLayout = (config: Config) => {

        this.loadStyle(this.resources.getStyle(config.getSetting('style')));

        // By default get the OS screen size and resize app accordingly. Configuration will override this.
        const screen = QApplication.screens()[0];
        const screensize = screen.size();

        // Set window size 2/3 of screensize
        this.view.resize(screensize.width() - (screensize.width() / 3), 600);

        // Center window on screen
        this.view.move(
            screensize.width() / 2 - (this.view.size().width() / 2),
            screensize.height() / 2 - (this.view.size().height() / 2)
        );

        this.view.setWindowIcon(this.resources.getIcon('appIcon'));
        this.view.setWindowTitle("NodeGui Cross Platform Application");
        this.view.setAcceptDrops(true);
        this.view.setMinimumSize(300, 150);

        this.options = {
            trayIconPath: '../assets/systray-icon.png',
            appIconPath: '../assets/app-icon.png',
            title: 'NodeGui Cross Platform Application',
            modal: false, // Doesn't apply to an application main window view 
            // width: 400,
            // height: 100,
            // minWidth: 300,
            // minHeight: 100,
            mainMenu: [
                {
                    type: 'menu',
                    label: 'File',
                    items: [
                        {
                            type: 'action',
                            label: 'Quit',
                            action: () => this.appInstance.exit(0)
                        }

                    ]
                },
                {
                    type: 'menu',
                    label: 'Help',
                    items: [
                        {
                            type: 'action',
                            label: 'About',
                            action: () => new AboutDialogExample()
                        }

                    ]
                }
            ],
            elements: [
                {
                    type: 'layout',
                    direction: 'vertical',
                    align: 'center',
                    elements: [
                        {
                            type: 'label',
                            label: 'Application Label',
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
                                    onClick: this.processClickEvent,
                                },
                            ]
                        },
                    ]
                },
            ],
        };
        this.setOptions(this.options);

    }

    public setOptions = (options: any) => {

        this.centralWidget.setObjectName("centralWidget");
        this.centralWidget.setLayout(this.rootLayout);

        this.view.setCentralWidget(this.centralWidget);

        this.processor.processElements(this.view, this.rootLayout, options.elements);

        // (global as any).win = this.win; // To prevent win from being garbage collected. (May no longer be needed)
        // (global as any).systemTray = this.tray; // To prevent system tray from being garbage collected. (May no longer be needed)
    }
    
    // TODO: Replace with processMenu() in the element processor
    public initMainMenu(config: Config) {
        // File Menu
        const fileMenu = new QMenu();
        fileMenu.setTitle('File');

        fileMenu.addSeparator(); // Add a separator between actions

        const quitAction = new QAction();
        quitAction.setText('Quit');
        quitAction.addEventListener('triggered', () => this.appInstance.exit(0));
        fileMenu.addAction(quitAction);

        // Help menu
        const helpMenu = new QMenu();
        helpMenu.setTitle('Help');

        const aboutAction = new QAction();
        aboutAction.setText('About');
        aboutAction.addEventListener('triggered', () => new AboutDialogExample());
        helpMenu.addAction(aboutAction);
        
        // Add menus to menubar
        this.menuBar.addMenu(fileMenu);
        this.menuBar.addMenu(helpMenu);        

        this.view.setMenuBar(this.menuBar);
    }

    protected processClickEvent(value: string, parentDialog: QWidget, button: QPushButton) {
        console.log(`Event: ${button.text} Value: ${value}`);
    }

}
