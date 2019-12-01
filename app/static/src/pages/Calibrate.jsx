import React, { 
    useRef,
    useImperativeHandle,
    forwardRef } from 'react';
import Page from '../components/Page'
import { Row, Col } from '../components/Grid'
import { LoadingButton } from '../components/Button'
import { useCalibrationRender, useCalibrationGrid } from '../hooks/calibrationHooks'

const Video = ({ width, height }) => 
    <img 
        style={{
            position: 'absolute',
            zIndex: -1
        }}
        src={`/stream?width=${width}&height=${height}`} 
        width={width} 
        height={height} />

const Canvas = forwardRef(
    ({ width, height }, ref) => {
        const canvasRef = useRef();
        useImperativeHandle(ref, () => ({
            getContext: (x) => canvasRef.current.getContext(x)
        }));
        return <canvas 
            style={{
                position: 'absolute'
            }}
            ref={canvasRef}
            width={width} 
            height={height}/>
    })

const CalibrateRender = ({ width, height }) => {
    const calibrationGrid = useCalibrationGrid(width, height)
    const [ canvasRef ] = useCalibrationRender(width, height, calibrationGrid)

    return (
        <Row>
            <Col size={12}>
                <div style={{width: width, height: height}}>
                    <Canvas ref={canvasRef} width={width} height={height}/>
                    <Video width={width} height={height}/>
                </div>
            </Col>
        </Row>
    )
}

const Calibrate = () => {
    return (
        <Page>
            <Row>
                <Col>
                    <CalibrateRender width={680} height={420} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Help text</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <LoadingButton>
                        Save
                    </LoadingButton>
                </Col>
            </Row>
        </Page>
    );
}
export default Calibrate  
