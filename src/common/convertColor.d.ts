export type HSL = { h: number, s: number, l: number };
export function GLtoHex(color: RGBA): string;
export function webRGBToJsDesignRGB(color: RGB): RGB;
export function hexToJsDesignRGB(color: string): RGB;
export function jsDesignRGBToRGB(color: RGB | RGBA): RGB | RGBA;
export function hexToRGB(hex: string): RGB;
export function RGBToHSL(color: RGB): HSL;
export function HSLToRGB(color: HSL): RGB;