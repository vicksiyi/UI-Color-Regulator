import { HSL } from './convertColor';
import { EventHandler } from './events';

export type GuiSize = {
    width: number,
    height: number
}

export type SupportElementNode =
    | FrameNode
    | RectangleNode
    | EllipseNode
    | LineNode
    | PolygonNode
    | StarNode
    | TextNode;

export interface SelectionChangedHandler extends EventHandler {
    name: 'SELECTION_CHANGED'
    handler: (hasSelection: boolean) => void
}

export interface ChangeGuiSizeHandler extends EventHandler {
    name: 'CHANGE_GUI_SIZE'
    handler: (guiSize: GuiSize) => void
}

export interface UpdateColorHandler extends EventHandler {
    name: 'UPDATE_COLOR',
    handler: (color: HSL) => void
}

export interface ApplyColorHandler extends EventHandler {
    name: 'APPLY_COLOR',
    handler: (color: HSL) => void
}