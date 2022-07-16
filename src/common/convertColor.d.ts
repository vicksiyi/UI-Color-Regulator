export type webRGB = [number, number, number];
export type HSL = { h: number, s: number, l: number };
export function webRGBToJsDesignRGB(color: RGB): webRGB;
export function hexToJsDesignRGB(color: string): RGB | RGBA;
export function RGBToHSL(color: RGB): HSL;
export function HSLToRGB(color: HSL): RGB;