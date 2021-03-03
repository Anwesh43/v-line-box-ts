const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 4 
const scGap : number = 0.02 / parts  
const strokeFactor : number = 90
const sizeFactor : number = 6.9  
const delay : number = 20 
const colors : Array<string> = [
    "#3F51B5",
    "#f44336",
    "#880E4F",
    "#01579B",
    "#BF360C"
]
const backColor : string = "#BDBDBD"
const deg : number = Math.PI / 4

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }
    
    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawVLineToBox(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / sizeFactor 
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const sf4 : number = ScaleUtil.divideScale(sf, 3, parts)
        context.save()
        context.translate(w / 2, h / 2)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.rotate(deg + deg * sf1)
            DrawingUtil.drawLine(context, 0, 0, 0, -size * sf1)
            context.restore()
        }
        for (var j = 0; j < 2; j++) {
            context.save()
            context.translate(-size + size * j, 0)
            context.fillRect(0, -size * sf1, size, size * sf1)
            context.restore()
        }
        context.restore()
    }

    static drawVLTBNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.strokeStyle = colors[i]
        context.fillStyle = colors[i]
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        DrawingUtil.drawVLineToBox(context, scale)
    }
}