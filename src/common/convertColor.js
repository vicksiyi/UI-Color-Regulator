const namesRGB = ['r', 'g', 'b'];
import chroma, { Color } from 'chroma-js'

export function GLtoHex(color) {
	return chroma.gl(color.r, color.g, color.b, color.a).hex()
}

export const webRGBToJsDesignRGB = (color) => {
    const rgb = {};
    namesRGB.forEach((e, i) => {
        rgb[e] = color[e] / 255;
    });
    if (color['a'] !== undefined) rgb['a'] = color['a'];
    return rgb;
}

// 十六进制转RGB[JsDesign]
export const hexToJsDesignRGB = (color) => {
    let opacity = '';
    color = color.toLowerCase();
    if (color[0] === '#') color = color.slice(1);

    if (color.length === 3) {
        color = color.replace(/(.)(.)(.)?/g, '$1$1$2$2$3$3');
    } else if (color.length === 8) {
        const arr = color.match(/(.{6})(.{2})/);
        color = arr[1];
        opacity = arr[2];
    }
    const num = parseInt(color, 16);
    const rgb = { r: num >> 16, g: num >> 8 & 255, b: num & 255 };

    if (opacity) {
        rgb.push(parseInt(opacity, 16) / 255);
        return webRGBToJsDesignRGB(rgb);
    } else {
        return webRGBToJsDesignRGB(rgb);
    }
}

// 十六进制转RGB
export const hexToRGB = (hex) => {
    let opacity = '';
    color = color.toLowerCase();
    if (color[0] === '#') color = color.slice(1);

    if (color.length === 3) {
        color = color.replace(/(.)(.)(.)?/g, '$1$1$2$2$3$3');
    } else if (color.length === 8) {
        const arr = color.match(/(.{6})(.{2})/);
        color = arr[1];
        opacity = arr[2];
    }
    const num = parseInt(color, 16);
    const rgb = { r: num >> 16, g: num >> 8 & 255, b: num & 255 };
    return rgb;
}

export const jsDesignRGBToRGB = (color) => {
    const rgb = {};
    namesRGB.forEach((e, i) => {
        rgb[e] = color[e] * 255;
    })
    if (color['a']) rgb['a'] = color['a'];
    return rgb;
}

// RGB转换为HSL
export const RGBToHSL = (color) => {
    let { r, g, b } = color;
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;
    return {
        h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
        s: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        l: (100 * (2 * l - s)) / 2,
    };
};

// HSL转换为RGB
export const HSLToRGB = (color) => {
    let { h, s, l } = color;
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return { r: 255 * f(0), g: 255 * f(8), b: 255 * f(4) };
};