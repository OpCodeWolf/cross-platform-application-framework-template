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

//////////////////////////////
// INITIAL WORK IN PROGRESS //
//////////////////////////////

import fs from 'node:fs';
import { 
    QMainWindow, 
    QWidget, 
    QMenu, 
    QLabel, 
    QPushButton, 
    QIcon, 
    QBoxLayout, 
    Direction, 
    QSystemTrayIcon, 
    QAction, 
    QApplication, 
    QKeySequence, 
    WidgetEventTypes
} from '@nodegui/nodegui';
import * as path from 'node:path';
import sourceMapSupport from 'source-map-support';
import { Resources } from './lib/Resources';
import { Config } from "./lib/Config";
import { ModalDialogExample } from './lib/dialogs';

sourceMapSupport.install();

class App {
    public appInstance: QApplication = QApplication.instance();
    public win: QMainWindow = new QMainWindow();
    public centralWidget: QWidget = new QWidget();
    public rootLayout: QBoxLayout = new QBoxLayout(Direction.TopToBottom);
    public mainMenu = new QMenu();
    public trayMenu = new QMenu();
    public tray = new QSystemTrayIcon();
    public resources: Resources = new Resources();
    public config: Config = new Config();
    public version: string;

    // Icons
    public trayIconPath = '../assets/systray-icon.png';
    public appIconPath = '../assets/app-icon.png';
    public mainButtonIcon = '../assets/logox200.png';

    constructor() {
    }

    /**
     * Initializes application resources such as styles and icons.
     * It loads default styles from a file, sets various icons, and applies the configured style to the main window.
     */
    public initResources = () => {

        // Setup styles
        this.resources.setStyle('default', fs.readFileSync(path.resolve(__dirname, '../assets/styles/default.css'), 'utf8'));

        // Load icons
        this.resources.setIcon('trayIcon', new QIcon(path.resolve(__dirname, this.trayIconPath)));
        this.resources.setIcon('appIcon', new QIcon(path.resolve(__dirname, this.appIconPath)));
        this.resources.setIcon('mainButtonIcon', new QIcon(path.resolve(__dirname, this.mainButtonIcon)));

        // Load configured style
        this.win.setStyleSheet(this.resources.getStyle(this.config.getSetting('style')));
    }

    /**
     * Adds a new item to the tray menu with specified attributes.
     * This includes setting the item's text, icon, shortcut, and event handler.
     *
     * @param name     the text to display for the menu item
     * @param iconName the name of the icon to use, or an empty string if no icon is needed
     * @param shortcut the keyboard shortcut for the menu item, or an empty string if no shortcut is needed
     * @param event    the event handler function to execute when the item is triggered
     * @return the QAction object representing the newly added tray menu item
     */
    // TODO: Move to TrayIcon class.
    public addTrayMenuItem = (name: string, iconName: string, shortcut: string, event: any): QAction => {
        const action = new QAction();
        action.setText(name);
        if (iconName !== '') {
            action.setIcon(this.resources.getIcon(iconName));
        }
        if (shortcut !== '') {
            action.setShortcut(new QKeySequence(shortcut));
        }
        action.addEventListener("triggered", () => {
            event();
        });
        this.trayMenu.addAction(action);
        return action;
    }

    /**
     * Initializes the system tray icon by setting its icon, context menu, and making it visible.
     */
    // TODO: Move to TrayIcon class.
    public initTrayIcon = () => {
        this.tray.setIcon(this.resources.getIcon('trayIcon'));
        this.tray.setContextMenu(this.trayMenu);
        this.tray.show();
        // this.tray.setToolTip("test");
    }

    /**
     * Initializes the system tray menu by setting up the tray icon and related menu items.
     * This method is a placeholder for additional menu initialization logic if needed.
     */
    // TODO: Move to AppTray class
    public initTrayMenu = () => {
        this.initTrayIcon();

        // ----------------
        // About Menu Item
        // ----------------
        // this.addTrayMenuItem('About', '', '', () => {
        //     const aboutDialog = new ButtonDialog('About');
        // });

        // ----------------
        // Modal Dialog Item
        // ----------------
        this.addTrayMenuItem('Dialog Example', '', '', () => {
            const dialog = new ModalDialogExample();
        });

 
        // this.addTrayMenuItem('Button Dialog Example', '', '', () => {
        //     const dialog = new ButtonDialogExample();
        // });

        // TODO: Not sure if we need this on macs, please test this
        // -------------------
        // Mac Submenu (Rework this into a method)
        // -------------------
        // const subMenu = new QMenu();
        // //-----
        // const hideDockAction = new QAction();
        // hideDockAction.setText("hide");
        // hideDockAction.addEventListener("triggered", () => {
        //     this.tray.hide();
        // });
        // subMenu.addAction(hideDockAction);
        // //-----
        // const showDockAction = new QAction();
        // showDockAction.setText("show");
        // showDockAction.addEventListener("triggered", () => {
        //     this.tray.show();
        // });
        // subMenu.addAction(showDockAction);
        // //-----
        // const actionWithSubmenu = new QAction();
        // actionWithSubmenu.setMenu(subMenu);
        // actionWithSubmenu.setText("Mac Dock");
        // this.trayMenu.addAction(actionWithSubmenu);

        // ----------------
        // Hide Menu Item
        // ----------------
        this.addTrayMenuItem('Hide/Show', '', 'Alt+H', () => {
            if (this.win.isVisible()) {
                this.win.hide();
            } else {
                this.win.show();
            }
        });

        // ----------------
        // Quit Menu Item
        // ----------------
        this.addTrayMenuItem('Quit', '', 'Ctrl+Q', () => {
            this.appInstance.exit(0);
        });

    }

    /**
     * Handles the application exit process by saving the current window state, 
     * including its position and size, to the configuration settings.
     */
    public onAppExit() {
        // Save application state
        this.config.setSetting('pos-x', this.win.x());
        this.config.setSetting('pos-y', this.win.y());
        this.config.setSetting('width', this.win.width());
        this.config.setSetting('height', this.win.height());
    }

    /**
     * Initializes the main application window by setting its size, position, icon, title, and various event handlers.
     * The window is centered on the screen and configured with a minimum size.
     * Additionally, it sets up event listeners for window-related events and handles application exit.
     */
    // TODO: Cleanup as Views, add to view/MainWindow.ts #25
    public initMainWindow = () => {
        // By default get the OS screen size and resize app accordingly. Configuration will override this.
        const screen = QApplication.screens()[0];
        const screensize = screen.size();

        // Set window size 2/3 of screensize
        this.win.resize(screensize.width() - (screensize.width() / 3), 600);

        // Center window on screen
        this.win.move(
            screensize.width() / 2 - (this.win.size().width() / 2),
            screensize.height() / 2 - (this.win.size().height() / 2)
        );

        this.win.setWindowIcon(this.resources.getIcon('appIcon'));
        this.win.setWindowTitle("NodeGui Cross Platform Application");
        this.win.setAcceptDrops(true);
        this.win.setMinimumSize(300, 150);

        this.initMainWindowLayout();

        this.appInstance.addEventListener('lastWindowClosed', () => {
            this.onAppExit();
        });

        // TODO: Implement Hotkeys
        // this.win.addEventListener(WidgetEventTypes.KeyRelease, (event) => {
        //     const keyReleaseEvent = new QKeySequence(event.key);
        // })

        // Window Events
        this.win.addEventListener(WidgetEventTypes.Close, () => { });
        this.win.addEventListener(WidgetEventTypes.Hide, () => { });
        this.win.addEventListener(WidgetEventTypes.Show, () => { });
        this.win.addEventListener(WidgetEventTypes.Resize, () => { });
        this.win.addEventListener(WidgetEventTypes.Move, () => { });
    }

    /**
     * Initializes the layout of the main application window by setting up the central widget, 
     * configuring layout elements such as labels and buttons, and assigning them to the window's layout.
     * This method arranges widgets and sets the central widget for the main window.
     */
    // TODO: Cleanup as Views, add to view/MainWindow.ts #25
    public initMainWindowLayout = () => {
        const mainMenu = new QMenu();

        this.centralWidget.setObjectName("centralWidget");
        this.centralWidget.setLayout(this.rootLayout);

        const label = new QLabel();
        label.setObjectName('label1');
        label.setText('Application Name');

        const button = new QPushButton();
        button.setIcon(this.resources.getIcon('mainButtonIcon'));

        const label2 = new QLabel();
        label.setObjectName('label2');
        label2.setText('<put something here>');

        // Build the root widget
        this.rootLayout.addWidget(label);
        this.rootLayout.addWidget(label2);
        this.rootLayout.addWidget(button);
        this.win.setCentralWidget(this.centralWidget);

        // (global as any).win = this.win; // To prevent win from being garbage collected. (May no longer be needed)
        // (global as any).systemTray = this.tray; // To prevent system tray from being garbage collected. (May no longer be needed)
    }

    /**
     * Initializes application settings by retrieving configuration values and applying them.
     * This includes setting the application version, configuring the behavior when closing windows,
     * restoring the window's position and size to their previous states, and displaying the main window.
     */
    // TODO: Cleanup by calling and setting up the available Views #25
    public initSettings = () => {
        this.version = this.config.getSetting('app-version');

        // BUG: Fix this (Essentially this is to keep the systray icon in the systray when all windows are closed)
        // False = app doesnt close if we close all windows
        // True = app will close if we close all windows
        // # uiexperience
        this.appInstance.setQuitOnLastWindowClosed(
            Boolean(this.config.getSetting('quit-on-last-window-closed'))
        );

        // Move the window to where it was closed last
        // # uiexperience
        this.win.move(
            <number>Number(this.config.getSetting('pos-x')),
            <number>Number(this.config.getSetting('pos-y'))
        )

        // Resize the window to what it was when it was closed last
        // # uiexperience
        this.win.resize(
            <number>Number(this.config.getSetting('width')),
            <number>Number(this.config.getSetting('height'))
        );

        // Show the main window
        this.win.show();
    }

    /**
     * Runs the application by initializing resources, setting up the main window, configuring the tray menu,
     * and applying application settings. It prepares the application for use and displays the main window.
     */
    public run = () => {
        this.initResources();
        // this.initViews(); // TODO: Add this during cleanup
        this.initMainWindow(); // TODO: Move into the initViews method

        this.initTrayMenu(); // TODO: Move to AppTray Class constructor

        // Apply settings to the application and show the main window
        this.initSettings();
    }
}

// Main Application Start
const app = new App();
app.run();
