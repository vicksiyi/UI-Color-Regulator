export type HSL = { h: number, s: number, l: number };
export function webRGBToJsDesignRGB(color: RGB): RGB;
export function hexToJsDesignRGB(color: string): RGB;
export function jsDesignRGBToRGB(color: RGB): RGB;
export function hexToRGB(hex: string): RGB;
export function RGBToHSL(color: RGB): HSL;
export function HSLToRGB(color: HSL): RGB;