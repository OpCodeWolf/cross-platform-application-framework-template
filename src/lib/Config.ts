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
import fs from 'fs';

/**
 * Represents the configuration management class for the application.
 * It handles loading, saving, and managing default settings for the application's configuration.
 */
export class Config {
    public style: string;
    public settings: {};

    /**
     * Initializes the configuration by setting default values and loading the existing configuration.
     * This ensures the application starts with the appropriate settings.
     */
    constructor() {
        this.setDefaults();
        this.loadConfig();
    }

    /**
     * Resets all settings to their defaults, loads the configuration, 
     * and sets default values for various application settings such as version, style, and window properties.
     * Finally, it saves the updated configuration.
     */
    public setDefaults = ():void => {
        this.settings = {};
        this.loadConfig();
        this.setDefaultSetting('app-version', '0.0.1');  // Aapp version
        this.setDefaultSetting('config-version', '0.0.1');  // Config file version
        this.setDefaultSetting('auto-upgrade', 'true');
        this.setDefaultSetting('style', 'default');
        this.setDefaultSetting('pos-x', '100');
        this.setDefaultSetting('pos-y', '100');
        this.setDefaultSetting('width', '800');
        this.setDefaultSetting('height', '600');
        this.setDefaultSetting('quit-on-last-window-closed', 'false');
        this.saveConfig();
    }

    /**
     * Saves the current configuration, including settings, to a config file in JSON format.
     */
    public saveConfig = ():void => {
        // Save config to file
        const config = {
            settings: this.settings
        };
        fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
    }

    /**
     * Checks if the configuration file exists.
     *
     * @return {@code true} if the config file exists, {@code false} otherwise
     */
    public configExists = ():boolean => {
        // TODO: Find standard location for config file, Eg: Linux = ~/.config/<appname>
        return fs.existsSync('config.json');
    }

    /**
     * Loads the configuration from the config file. 
     * If the config file does not exist, it creates the file with default settings.
     * After loading, it updates the current style and settings based on the loaded configuration.
     */
    public loadConfig = ():void => {
        // If config doesn't exist, create the config file with defaults
        if (!this.configExists()) {
            this.saveConfig();
        }
        // Load config from file
        const fileContent = fs.readFileSync('config.json', 'utf8');
        const config = JSON.parse(fileContent);

        this.style = config.style || this.style;
        this.settings = config.settings || this.settings;
    }

    /**
     * Sets a configuration setting and saves the updated configuration.
     *
     * @param name  the name of the setting
     * @param value the value to be assigned to the setting
     */
    public setSetting = (name:string, value:any): void => {
        // Set config item
        this.settings[name] = value;
        this.saveConfig();
    }
    
    /**
     * Sets a default configuration setting if it does not already exist.
     *
     * @param name  the name of the setting
     * @param value the default value to be assigned if the setting is not already present
     */
    public setDefaultSetting = (name:string, value:any): void => {
        // Set default config item
        if (!this.settings[name]) {
            this.settings[name] = value;
        }
    }

    /**
     * Retrieves the value of a specific configuration setting.
     * The configuration is reloaded before returning the requested setting.
     *
     * @param name the name of the setting to retrieve
     * @return the value of the setting, or {@code null} if it is not found
     */
    public getSetting = (name:string): any => {
        // Get config item
        this.loadConfig();
        return this.settings[name] || null;
    }
}