import { hexToFigmaRGB } from "./helpers"


const namePrefix = "--"



export function createRect(name:string, spec:RectSpec, frame:any) {

    const existingEl = findExisting(name, frame) // Can be null

    const r = existingEl || figma.createRectangle()
    r.name = setName(name, existingEl)
    r.x= x(spec, existingEl)
    r.y =  y(spec, existingEl)
    r.resize(width(spec, existingEl), height(spec, existingEl))
    r.fills =  solidFill(spec, existingEl)
    r.strokes = solidStroke(spec, existingEl)
    r.strokeWeight = strokeWeight(spec, existingEl)
    if(existingEl == null) {
        frame.appendChild(r)
    }

}


export function createEllipse(name:string, spec:EllipseSpec, frame:any) {

    const existingEl = findExisting(name, frame) // Can be null

    const r = existingEl || figma.createEllipse()
    r.name = namePrefix + name.toString()
    r.x= spec.x || 0
    r.y =  spec.y || 0
    if(spec.radius) {
        r.resize(spec.radius, spec.radius)
    } else {
        r.resize(spec.width || 100, spec.height || 100)
    }
    r.fills =  [{ type: 'SOLID', color: hexToFigmaRGB(spec.fill || "#aaa") }]
    r.strokes = [{ type: "SOLID", color: hexToFigmaRGB(spec.stroke || "#aaa")}]
    r.strokeWeight = spec.strokeWeight || 1
    frame.appendChild(r)
}



export function createText(name:string, spec:TextSpec, frame:any) {
    
    const existingEl = findExisting(name, frame) // Can be null

    const text =  existingEl || figma.createText()
    text.name = namePrefix + name.toString()
    text.fontName = spec.font || { family: "GT America", style: "Regular" }
    text.fontSize = spec.fontSize || 14
    text.y = spec.y || 0
    text.x = spec.x || 0
    text.textAlignHorizontal = spec.alignHorizontal || "LEFT"
    text.textAlignVertical = spec.alignVertical || "CENTER"
    text.fills = [{ type: 'SOLID', color: hexToFigmaRGB(spec.fill || "#888") }]
    text.characters = spec.text || "Hello World"
    frame.appendChild(text)
}

export function createLine(name:string, spec:LineSpec, frame:any) {

    const existingEl = findExisting(name, frame) // Can be null


    const line = existingEl || figma.createLine()
    line.name = setName(name, existingEl)
    line.x = spec.x || existingEl?.x || 0
    line.y = spec.y || existingEl?.y || 0

    if(spec.width) {
        line.resize(spec.width, 0)
    } else if (spec.height) {
        line.resize(spec.height, 0)
        line.rotation = -90
    } else {
        line.resize(100, 0)
    }
    line.strokeWeight = strokeWeight(spec, existingEl)
    line.strokes = spec.stroke ? [{ type: 'SOLID', color: hexToFigmaRGB(spec.stroke || "#aaa") }] : existingEl.strokes
    
    if(existingEl == null) {
        frame.appendChild(line)
    }
}


function findExisting(name: string, frame:any) {
    const searchEls = frame.children.filter((c:any) => c.name.indexOf("--") >= 0).filter((c:any) => c.name.replace("--", "") == name)
    const existingEl = searchEls.length > 0 ? searchEls[0] : null
    return existingEl
}

function setName(name:string, existingEl:any) {
    return existingEl ? existingEl.name : namePrefix + name.toString()
}

function x(spec, existingEl) {
    return spec.x || existingEl?.x || 0
}

function y(spec, existingEl) {
    return spec.y || existingEl?.y || 0
}

function width(spec, existingEl) {
    return spec.width || existingEl?.width || 100
}

function height(spec, existingEl) {
    return spec.height || existingEl.height || 100
}

function solidFill(spec, existingEl) {
    if (spec.fill) {
        return [{ type: 'SOLID', color: hexToFigmaRGB(spec.fill) }]
    } else if (existingEl) {
        return existingEl.fills
    } else {
        return [{ type: 'SOLID', color: hexToFigmaRGB("#aaa") }]
    }

}

function solidStroke(spec, existingEl) {
    if (spec.stroke) {
        return [{ type: 'SOLID', color: hexToFigmaRGB(spec.stroke) }]
    } else if (existingEl) {
        return existingEl.strokes
    } else {
        return [{ type: 'SOLID', color: hexToFigmaRGB("#aaa") }]
    }
}

function strokeWeight(spec, existingEl) {
    return spec.strokeWeight || existingEl?.strokeWeight || 1
}



interface LineSpec {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    length?: number,
    strokeWeight?: number,
    stroke?: string
}

interface RectSpec { 
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    fill?: string,
    stroke?: string
    strokeWeight?: number
}

interface TextSpec {
    fontSize?: number,
    y?: number,
    x?: number,
    font?: FontName,
    alignHorizontal?: "LEFT"|"RIGHT"|"CENTER"
    alignVertical?: "TOP"|"CENTER"|"BOTTOM"
    fill?: string,
    text?: string
}

interface EllipseSpec {
    x?: number,
    y?: number,
    radius?: number,
    width?: number,
    height?: number,
    fill?: string,
    stroke?: string,
    strokeWeight?: number
}

declare type DrawNode = RectangleNode | EllipseNode | PolygonNode | StarNode | VectorNode | LineNode | TextNode