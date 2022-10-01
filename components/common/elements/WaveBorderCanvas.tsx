import React, {FunctionComponent, useCallback, useEffect, useRef, useState} from "react";
import {alpha, styled} from '@mui/system';
import {css} from "@emotion/react";
import {Canvas, createCanvas} from "canvas";
import setRef from "@mui/utils/setRef";


const FillDiv = styled('div')(css`
  width: 100%;
  height: 101%;
  position: relative;

  span > svg, canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // Fix to a very weird chrome bug :/
    opacity: .99;
  }
`)

interface IWaveBorder {
  background: string;
  flip?: boolean;
  pause?: boolean;
  reverse?: boolean;
}

const drawWave = (ctx: CanvasRenderingContext2D, step: number, width: number, height: number, amplitude: number, frequency: number, points: number, background: string) => {
  ctx.save()
  step *= frequency
  const waveWidth = 2 * (width / points);
  ctx.translate(-(step % waveWidth), -(amplitude * height) / 2)
  ctx.fillStyle = background;
  ctx.beginPath();
  const baseLine = height
  ctx.moveTo(0, baseLine);

  const getYPos = (): number => (height * amplitude) * Math.sin(frequency * 20)
  ctx.lineTo(0, 0);
  let i = 0;
  let startX = 0, midX = 0, endX = width * (i + 1) / points;

  for (; endX < waveWidth + width; i++) {
    startX = width * i / points;
    endX = width * (i + 1) / points;
    midX = startX + (endX - startX) / 2;

    const multi = i % 2 === 0 ? 1 : -1
    ctx.quadraticCurveTo(midX, multi * getYPos(), endX, 0);
  }
  ctx.lineTo(endX, baseLine);
  ctx.closePath();
  ctx.fill()
  ctx.restore()
}

/**
 *  https://codepen.io/csspoints/pen/WNeOEqd
 */
const WaveBorder: FunctionComponent<IWaveBorder> = ({background, flip, reverse, pause}) => {
  const isSSr = typeof window === "undefined";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrame = useRef<number>(NaN)
  const svgString = useRef()
  const [showSvg, setShowSvg] = useState(true)


  const drawFrame = useCallback((i: number, points = 2) => {
    const step = i / 200;

    let canvas: any = canvasRef.current;
    if (isSSr) {
      canvas = createCanvas(800, 82, "svg")
    }

    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true
    });


    if (!ctx) {
      return;
    }
    let {width, height} = canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.setTransform(reverse ? -1 : 1, 0, 0, flip ? 1 : -1, reverse ? width : 0, flip ? height : 0);
    drawWave(ctx, step, width, height, .4, 1, points, alpha(background, 1))
    drawWave(ctx, step, width, height, .6, 1.3, points + 1, alpha(background, .7))
    drawWave(ctx, step, width, height, .7, 1.5, points + 1, alpha(background, .5))
    drawWave(ctx, step, width, height, 1, 2, points, alpha(background, .2))
    ctx.restore();
    if (isSSr) {
      setRef(svgString, (canvas as Canvas).toBuffer().toString().replace("xmlns=", "preserveAspectRatio=\"none\" xmlns="))
    } else {
      animationFrame.current = window.requestAnimationFrame(ni => drawFrame(ni))
      setShowSvg(false)
    }
  }, [background, flip, isSSr, reverse]);
  if(isSSr){
    drawFrame(0)
  }

  useEffect(() => {
    if (!pause) {
      animationFrame.current = window.requestAnimationFrame(drawFrame);
    }
    return () => window.cancelAnimationFrame(animationFrame.current);
  }, [drawFrame, pause])


  return <FillDiv>
    {showSvg && <span id={"svg-ssr-autogenerated"} dangerouslySetInnerHTML={{__html: svgString.current || ""}}/>}
    <canvas ref={canvasRef}/>
  </FillDiv>;
}

export default WaveBorder;
