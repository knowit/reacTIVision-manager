
const catmullRomSpline = (x, v1, v2, v3, v4) => {
	const c1 =  1.0*v2
	const c2 = -0.5*v1 +  0.5*v3
	const c3 =  1.0*v1 + -2.5*v2 +  2.0*v3 + -0.5*v4
	const c4 = -0.5*v1 +  1.5*v2 + -1.5*v3 +  0.5*v4
	
	return (((c4*x + c3)*x +c2)*x + c1)
}

const lerpX = (x, y, points) => {
	const xFloor = Math.floor(x)
	const xOffset = x - xFloor
    
    const v1 = xFloor<=0 
        ? points[xFloor][y] 
        : points[xFloor-1][y]
	
	const v2 = points[xFloor][y] 
	const v3 = points[xFloor+1][y]
	
    const v4 = xFloor>=(width-2)
        ? points[xFloor+1][y] 
        : points[xFloor+2][y]
	
	return {
        x: catmullRomSpline( xOffset, v1.x, v2.x, v3.x, v4.x ),
        y: catmullRomSpline( xOffset, v1.y, v2.y, v3.y, v4.y )
    }
}

const lerpY = (x, y, points) => {
	const yFloor = Math.floor(y)
	const yOffset = y - yFloor
	
    const v1 = yFloor<=0 
        ? points[x][yFloor] 
        : points[x][yFloor-1]
	
    const v2 = points[x][yFloor]
    const v3 = points[x][yFloor+1]

    const v4 = yFloor>=(height-2)
        ? points[x][yFloor+1]
        : points[x][yFloor+2]
	
	return {
        x: catmullRomSpline( yOffset, v1.x, v2.x, v3.x, v4.x ),
        y: catmullRomSpline( yOffset, v1.y, v2.y, v3.y, v4.y )
    }
}


export const calibrationGrid = (width, height, loadedPoints=[]) => {
    console.log(loadedPoints)
    const points = new Array(width+1)
        .fill(new Array(height+1)
            .fill({ x: 0, y: 0 }))

    return {        
        get: (x, y) => {
            if( x>=0 && x<width && y>=0 && y<height ) 
                return points[x][y]
            return { x: 0, y: 0 }
        },
        set: (x, y, vx, vy) => {
            if( x>=0 && x<width && y>=0 && y<height )
            {
                points[x][y].x = vx
                points[x][y].y = vy
            }
        },
        getLerp: (x, y) => {
            if( x>=width ) return lerpY(width,y)
            if( y>=height ) return lerpX(x,height)
            
            // x
            const xFloor = Math.floor(x)
            const xOffset = x - xFloor
            
            const x1 = lerpY(x_floor,y)
            const x2 = lerpY(x_floor+1,y)
            
            // y
            const yFloor = Math.floor(y)
            const yOffset = y - yFloor
            
            const y1 = lerpX(x,y_floor)
            const y2 = lerpX(x,y_floor+1)
            
            return {
                x: (x1.x * (1-xOffset)) + (x2.x * xOffset),
                y: (y1.y * (1-yOffset)) + (y2.y * yOffset)
            }
        }
    }
}