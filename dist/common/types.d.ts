/// <reference types="plugin-typings" />
import { HSL } from './convertColor';
import { EventHandler } from './events';
export declare type GuiSize = {
    width: number;
    height: number;
};
export declare type FontStyle = {
    content: string;
    fontFamily: FontName;
    fontSize: number;
    color: string;
    textShadow: string;
};
export declare type SupportElementNode = FrameNode | RectangleNode | EllipseNode | LineNode | PolygonNode | StarNode | TextNode;
export declare type HasChildrenNode = FrameNode | GroupNode;
export interface SelectionChangedHandler extends EventHandler {
    name: 'SELECTION_CHANGED';
    handler: (hasSelection: boolean) => void;
}
export interface ChangeGuiSizeHandler extends EventHandler {
    name: 'CHANGE_GUI_SIZE';
    handler: (guiSize: GuiSize) => void;
}
export interface UpdateColorHandler extends EventHandler {
    name: 'UPDATE_COLOR';
    handler: (data: {
        color: HSL;
        fonts?: FontStyle[];
    }) => void;
}
export interface ApplyColorHandler extends EventHandler {
    name: 'APPLY_COLOR';
    handler: (color: HSL) => void;
}
//# sourceMappingURL=types.d.ts.map