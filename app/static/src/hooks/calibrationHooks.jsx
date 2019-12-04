import { 
    useRef,
    useLayoutEffect,
    useEffect,
    useState,
    useMemo } from 'react';
import { calibrationGrid } from '../calibrationGrid'


const renderGrid = (ctx, grid, calibrationGrid) => {
    ctx.strokeStyle = 'green'
    ctx.lineWidth = 2;

    ctx.beginPath()

    for (let i = 0; i < grid.gridSize[0]; i++) {
        const startX = i*grid.cellSize[0]
		const startY = 0
		const endX = startX
		const endY = grid.fieldCount[1]*grid.cellSize[1]

        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
    }
    
    for (let i = 0; i < grid.gridSize[1]; i++) {
        const startX = 0
		const startY = i*grid.cellSize[1]
		const endX = grid.fieldCount[0]*grid.cellSize[0]
		const endY = startY

        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
    }
    
    ctx.stroke()
}

const renderCalibrateCircles = (ctx, grid, calibrationGrid) => {

}

const useGrid = (width, height) => {
    const grid = useMemo(
        () => {
            let gridSizeX = 7;
            if ((width/height) > 1.3) gridSizeX +=2;
            if ((width/height) > 1.7) gridSizeX +=2;
            
            const gridSize = [ gridSizeX, 7]
            const fieldCount = gridSize.map(x => x-1)
            const center = fieldCount.map(x => x/2)
            const cellSize = [ width/fieldCount[0], height/fieldCount[1] ]
        
            return {
                gridSize, fieldCount, center, cellSize
            }
        },
        [width, height])
    return grid
} 

export const useCalibrationGrid = (width, height, name) => {
    const [grid, setGrid] = useState(calibrationGrid(width, height))

    useEffect(
        () => {
            if (!(name === 'default' || name === 'default.grid')) {
                fetch(`/api/calibration/${name}`)
                    .then(res => res.json())
                    .then(res => setGrid(calibrationGrid(width, height, res['calibration'])))
            }
        },
        [])

    return grid
}

export const useCalibrationRender = (width, height, calibrationGrid) => {
    const canvasRef = useRef()
    const grid = useGrid(width, height)

    useLayoutEffect(
        () => {
            const { current: canvas } = canvasRef;
            const ctx = canvas.getContext('2d')

            ctx.clearRect(0, 0, width, height);
            
            renderGrid(ctx, grid, calibrationGrid)
            renderCalibrateCircles(ctx, grid, calibrationGrid)
        },
        [width, height, grid])
    
    return [
        canvasRef
    ]
}

export const useCameraSettings = () => {
    return {
        width: 680,
        height: 420
    }
}