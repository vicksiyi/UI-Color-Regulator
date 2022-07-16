import { emit, on } from './common/events';
import {
    SelectionChangedHandler,
    ChangeGuiSizeHandler
} from "./common/types";

// 初始化GUI宽高
jsDesign.showUI(__html__, { width: 440, height: 260, themeColors: true });


// 向GUI 界面发送消息【已选择图层】
emit<SelectionChangedHandler>(
    'SELECTION_CHANGED',
    jsDesign.currentPage.selection.length > 0
);

// 监听GUI发送过来的消息【改变窗口】
on<ChangeGuiSizeHandler>("CHANGE_GUI_SIZE", (guiSize) => {
    jsDesign.ui.resize(guiSize?.width, guiSize?.height);
})

// 监听图层选择事件
jsDesign.on('selectionchange', function () {
    let selection = jsDesign.currentPage.selection;
    // 向GUI 界面发送消息【已选择图层】
    emit<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        selection.length > 0
    );
})