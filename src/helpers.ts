
export function hexToFigmaRGBA(colorString: string): RGBA {
	let opacity = 'FF'
    
    // #FFF
	colorString = colorString.toLowerCase()

    // #fff
	if (colorString[0] === '#') colorString = colorString.slice(1)

    // fff
	if (colorString.length === 3) {
		colorString = colorString.replace(/(.)(.)(.)?/g, '$1$1$2$2$3$3')
	} else if (colorString.length === 8) {
		const arr = colorString.match(/(.{6})(.{2})/)
        if(arr && arr.length >2) {
            colorString = arr[1]
            opacity = arr[2]
        }

	}

    
    const color:RGBA = {
        r: parseInt(colorString.slice(0, 2), 16) / 255,
        g: parseInt(colorString.slice(2, 4), 16) / 255,
        b: parseInt(colorString.slice(4, 6), 16) / 255,
        a: parseInt(opacity, 16) / 255
    }

    return color
}

export function hexToFigmaRGB(colorString: string): RGB {
    const color = hexToFigmaRGBA(colorString)
    return {
        r: color.r,
        g: color.g,
        b: color.b
    }
}



interface RGBA { r: number, g: number, b: number, a: number }
interface RGB { r: number, g: number, b: number }

