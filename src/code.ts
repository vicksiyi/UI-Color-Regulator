import { emit, on } from './common/events';
import { RGBToHSL, jsDesignRGBToRGB, HSL, HSLToRGB, webRGBToJsDesignRGB } from './common/convertColor';
import {
    SelectionChangedHandler,
    ChangeGuiSizeHandler,
    UpdateColorHandler,
    SupportElementNode,
    ApplyColorHandler,
    GuiSize
} from "./common/types";

const SupportNode = ['FRAME', 'RECTANGLE', 'ELLIPSE', 'LINE', 'POLYGON', 'STAR', 'TEXT'];
const selectNode = (): SupportElementNode => {
    let selections = jsDesign.currentPage.selection;
    let selection;
    for (let node of selections) {
        if (SupportNode.includes(node.type)) {
            selection = node;
        }
    }
    return selection;
}
const selectChangedHandler = () => {
    let selection = selectNode();
    if (selection) {
        // 向GUI 界面发送消息【已选择图层】
        emit<SelectionChangedHandler>('SELECTION_CHANGED', true);
        let fills = ((selection as SupportElementNode).fills as Paint[]);
        let fillColor: RGB;
        for (let item of fills) {
            if (item.type === 'SOLID') fillColor = item.color;
        }

        if (fillColor) {
            emit<UpdateColorHandler>(
                'UPDATE_COLOR',
                RGBToHSL(jsDesignRGBToRGB(fillColor))
            )
        }
    } else {
        emit<SelectionChangedHandler>('SELECTION_CHANGED', false);
    }
}

// 初始化GUI宽高
jsDesign.showUI(__html__, { width: 440, height: 260, themeColors: true });


// 向GUI 界面发送消息【已选择图层】
emit<SelectionChangedHandler>(
    'SELECTION_CHANGED',
    jsDesign.currentPage.selection.length > 0
);

// 监听GUI发送过来的消息【改变窗口】
on<ChangeGuiSizeHandler>("CHANGE_GUI_SIZE", (guiSize: GuiSize) => {
    jsDesign.ui.resize(guiSize?.width, guiSize?.height);
})

// 监听颜色应用
on<ApplyColorHandler>("APPLY_COLOR", (hsl: HSL) => {
    let RGB = HSLToRGB(hsl);
    let jsDesignRGB = webRGBToJsDesignRGB(RGB);
    let selection = selectNode();
    console.log({ r: jsDesignRGB[0], g: jsDesignRGB[1], b: jsDesignRGB[2] }, RGB, jsDesignRGB);
    if (selection) {
        selection.fills = (selection.fills as Paint[]).map(fill => {
            if (fill.type === 'SOLID') return { type: 'SOLID', color: jsDesignRGB };
            else fill;
        })
    }
})

// 监听图层选择事件
jsDesign.on('selectionchange', selectChangedHandler)
selectChangedHandler();