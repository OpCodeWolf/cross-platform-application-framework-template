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
import { QIcon } from "@nodegui/nodegui";
import { Config } from "./Config";

/**
 * Provides static paths for various resource directories used in the application.
 * This class includes paths for sprites, fonts, sounds, images, icons, configuration files, data, translations, logs, temporary files, and cache.
 */
export class Resources {
    public static readonly RESOURCES_PATH = "../assets/";
    public static readonly SPRITES_PATH = Resources.RESOURCES_PATH + "sprites/";
    public static readonly FONTS_PATH = Resources.RESOURCES_PATH + "fonts/";
    public static readonly SOUNDS_PATH = Resources.RESOURCES_PATH + "sounds/";
    public static readonly IMAGES_PATH = Resources.RESOURCES_PATH + "images/";
    public static readonly ICONS_PATH = Resources.RESOURCES_PATH + "icons/";
    public static readonly CONFIG_PATH = Resources.RESOURCES_PATH + "config/";
    public static readonly DATA_PATH = Resources.RESOURCES_PATH + "data/";
    public static readonly TRANSLATIONS_PATH = Resources.RESOURCES_PATH + "translations/";
    public static readonly LOGS_PATH = Resources.RESOURCES_PATH + "logs/";
    public static readonly TEMP_PATH = Resources.RESOURCES_PATH + "temp/";
    public static readonly CACHE_PATH = Resources.RESOURCES_PATH + "cache/";

    public icons: Map<string, QIcon> = new Map(); // Holds all icons for the application
    public styles: Map<string, string> = new Map();
    private config: Config = new Config();
    
    constructor() {
        // Example:
        // this.setIcon("app-icon", new QIcon(Resources.ICONS_PATH + "app-icon.png"));

    }

    /**
     * Retrieves an icon by its name from the collection of icons.
     * If the requested icon is not found, a default empty QIcon is returned.
     *
     * @param name the name of the icon to retrieve
     * @return the QIcon associated with the given name, or a default empty QIcon if not found
     */
    public getIcon = (name:string): QIcon => {
        const icon: QIcon = <QIcon>this.icons.get(name);
        if (icon !== undefined && icon !== null) {
            return icon;
        }
        return new QIcon();
    }

    /**
     * Sets or updates an icon in the collection of icons with the specified name.
     *
     * @param name the name of the icon to set or update
     * @param icon the QIcon object to associate with the given name
     */
    public setIcon = (name:string, icon:QIcon): void => {
        this.icons.set(name, icon);
    }

    /**
     * Retrieves a style by its name from the collection of styles.
     * If the requested style is not found, an empty string is returned.
     *
     * @param name the name of the style to retrieve
     * @return the style associated with the given name, or an empty string if not found
     */
    public getStyle = (name:string): string => {
        const style: string = <string>this.styles.get(name);
        if (style !== undefined && style !== null) {
            return style;
        }
        return '';
    }

    /**
     * Sets or updates a style in the collection of styles with the specified name.
     *
     * @param name  the name of the style to set or update
     * @param style the style string to associate with the given name
     */
    public setStyle = (name:string, style:string): void => {
        this.styles.set(name, style);
    }

} 