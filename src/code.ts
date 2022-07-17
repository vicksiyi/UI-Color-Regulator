import { emit, on } from './common/events';
import { RGBToHSL, jsDesignRGBToRGB, HSL, HSLToRGB, webRGBToJsDesignRGB } from './common/convertColor';
import {
    SelectionChangedHandler,
    ChangeGuiSizeHandler,
    UpdateColorHandler,
    SupportElementNode,
    ApplyColorHandler,
    GuiSize,
    FontStyle,
    HasChildrenNode
} from "./common/types";

// 支持的画布类型
const SupportNode = ['FRAME', 'RECTANGLE', 'ELLIPSE', 'LINE', 'POLYGON', 'STAR', 'TEXT'];
// 存在子节点的节点
const hasChildrenNode = ['FRAME', 'GROUP'];
// 需要加载的字体
const loadFonts: FontName[] = [];
// 节点选取处理器
const selectNode = (): SupportElementNode => {
    let selections = jsDesign.currentPage.selection;
    let selection;
    for (let node of selections) {
        if (selection && SupportNode.includes(node.type)) jsDesign.notify('已选择多个图层，默认采用最后一个');
        if (SupportNode.includes(node.type)) {
            selection = node;
        }
    }
    return selection;
}
// 添加需要加载字体
const addLoadFont = (fontName: FontName): void => {
    if (!loadFonts.map(font => JSON.stringify(font)).includes(JSON.stringify(fontName))) {
        loadFonts.push(fontName);
    }
}

// 获取文字以及样式
const getTextNode = (nodes: SceneNode[], fonts: FontStyle[]): void => {
    for (const node of nodes) {
        if (node.type === 'TEXT' && node.visible) {
            addLoadFont(node.fontName as FontName);
            let fillSolid: SolidPaint = (node.fills as Paint[]).find(attr => attr.type === 'SOLID') as SolidPaint;
            let color = jsDesignRGBToRGB(fillSolid.color);
            fonts.push({
                content: (node as TextNode).characters,
                fontFamily: (node.fontName as FontName),
                fontSize: <number>node.fontSize,
                color: `rgba(${color.r},${color.g},${color.b},${fillSolid.opacity})`,
            })
        }
    }
}

// 监听选择图层事件
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
        let fonts: FontStyle[] = [];
        getTextNode((selection as HasChildrenNode).children as SceneNode[], fonts);
        (async () => {
            try {
                for (let item of loadFonts) {
                    await jsDesign.loadFontAsync(item);
                }
            } catch (err) {
                console.error(err);
            }
        })()
        console.log(fonts);
        if (fillColor) {
            emit<UpdateColorHandler>(
                'UPDATE_COLOR',
                {
                    color: RGBToHSL(jsDesignRGBToRGB(fillColor)),
                    fonts
                }
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