
function webRGBToFigmaRGB(color:any): any {
	const rgb = {}
    const namesRGB = ['r', 'g', 'b']

	namesRGB.forEach((e, i) => {
		rgb[e] = color[i] / 255
	})

	if (color[3] !== undefined) rgb['a'] = color[3]
	return rgb
}

export function createRect(spec:RectSpec, frame:any) {
    let r = figma.createRectangle()
    r.x= spec.x || 0
    r.y =  spec.y || 0
    r.resize(spec.width || 100, spec.height || 100)
    r.fills =  [{ type: 'SOLID', color: hexToFigmaRGB(spec.color || "#aaa") }]
    r.strokes = [{ type: "SOLID", color: hexToFigmaRGB(spec.stroke || "#aaa")}]
    r.strokeWeight = spec.stroke ? 1 : 0
    frame.appendChild(r)
}


export function createEllipse(spec:RectSpec, frame:any) {
    let r = figma.createEllipse()
    r.x= spec.x || 0
    r.y =  spec.y || 0
    r.resize(spec.width || 100, spec.height || 100)
    r.fills =  [{ type: 'SOLID', color: hexToFigmaRGB(spec.color || "#aaa") }]
    r.strokes = [{ type: "SOLID", color: hexToFigmaRGB(spec.stroke || "#aaa")}]
    r.strokeWeight = 1
    frame.appendChild(r)
}



export function createText(spec:TextSpec, frame:any) {
    let text = figma.createText()
    text.fontName = { family: "GT America", style: "Regular" }
    text.fontSize = spec.fontSize || 12
    text.y = spec.y || 0
    text.x = spec.x || 0
    text.textAlignHorizontal = spec.textAlignHorizontal || "LEFT"
    text.textAlignVertical = spec.textAlignVertical || "CENTER"
    text.fills = spec.fills || [{ type: 'SOLID', color: hexToFigmaRGB("#888") }]
    text.characters = spec.characters || "Hello World"
    frame.appendChild(text)
}

export function createLine(spec:LineSpec, frame:any) {
    const line = figma.createLine()
    line.x = spec.x || 0
    line.y = spec.y || 0
    line.resize(spec.length || 1, 0)
    line.rotation = -90
    line.strokeWeight = spec.strokeWeight || 1
    line.strokes = [{ type: 'SOLID', color: hexToFigmaRGB(spec.stroke || "#aaa") }]
    frame.appendChild(line)
}


interface LineSpec {
    x?: number,
    y?: number,
    width?: number,
    length?: number,
    strokeWeight?: number,
    stroke?: string
}

interface RectSpec { 
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    color?: string,
    stroke?: string
}

interface TextSpec {
    fontName?: string,
    fontSize?: number,
    y?: number,
    x?: number,
    textAlignHorizontal?: "LEFT"|"RIGHT"|"CENTER"
    textAlignVertical?: "TOP"|"CENTER"|"BOTTOM"
    fills?: any,
    characters?: string
}

interface EllipseSpec {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    color?: string,
    stroke?: string
}

export function hexToFigmaRGB(color: string): string {
	let opacity = ''

	color = color.toLowerCase()

	if (color[0] === '#') color = color.slice(1)
	if (color.length === 3) {
		color = color.replace(/(.)(.)(.)?/g, '$1$1$2$2$3$3')
	} else if (color.length === 8) {
		const arr = color.match(/(.{6})(.{2})/)
        if(arr && arr.length >2) {
            color = arr[1]
            opacity = arr[2]
        }

	}

	const num = parseInt(color, 16)
	const rgb = [num >> 16, (num >> 8) & 255, num & 255]

	if (opacity) {
		rgb.push(parseInt(opacity, 16) / 255)
		return webRGBToFigmaRGB(rgb)
	} else {
		return webRGBToFigmaRGB(rgb)
	}
}