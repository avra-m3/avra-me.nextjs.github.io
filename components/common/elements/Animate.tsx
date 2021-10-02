import {createRef, FC, useCallback, useEffect, useRef} from 'preact/compat';
import animejs, {AnimeInstance} from 'animejs';

import {flatten} from 'lodash-es';
import {ElementType} from "react";

type AnimeSet = Set<any>;
export type Easing =
  | 'easeInSine'
  | 'easeOutSine'
  | 'easeInOutSine'
  | 'easeInCirc'
  | 'easeOutCirc'
  | 'easeInOutCirc'
  | 'easeInElastic'
  | 'easeOutElastic'
  | 'easeInOutElastic'
  | 'easeInBack'
  | 'easeOutBack'
  | 'easeInOutBack'
  | 'easeInBounce'
  | 'easeOutBounce'
  | 'easeInOutBounce'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'
  | 'easeInExpo'
  | 'easeOutExpo'
  | 'easeInOutExpo'
  | 'linear'
  | [number, number, number, number];

// eslint-disable-next-line no-unused-vars
type NumberFunction = (el: Element, index?: number, len?: number) => number

export type AnimeValue = {
  value: string | number;
  delay: NumberFunction | number;
  duration?: NumberFunction | number;
  easing?: Easing;
} | string | number
  // eslint-disable-next-line no-unused-vars
  | ((el: Element, index?: number) => string | number);

export type AnimeProps = {
  delay?: NumberFunction | number;
  duration?: NumberFunction | number;
  autoplay?: boolean;
  loop?: number | boolean;
  direction?: 'normal' | 'reverse' | 'alternate';
  easing?: Easing;
  elasticity?: number;
  round?: number | boolean;
  component?: ElementType;
  begin?: Function;
  update?: Function;
  complete?: Function;

  // DOM
  value?: AnimeValue | AnimeValue[];

  // Transformations
  translateX?: AnimeValue | AnimeValue[];
  translateY?: AnimeValue | AnimeValue[];
  rotate?: AnimeValue | AnimeValue[];
  scale?: AnimeValue | AnimeValue[];

  // CSS
  opacity?: AnimeValue | AnimeValue[];
  color?: AnimeValue | AnimeValue[];
  backgroundColor?: AnimeValue | AnimeValue[];

  //SVG
  points?: AnimeValue | AnimeValue[];
  strokeDashoffset?: AnimeValue | AnimeValue[];

  style?: Record<string, unknown>

  // Custom Props
  [prop: string]: any;
};

const Animate: FC<AnimeProps> = (props) => {
  // Current anime instance
  const animations = useRef<AnimeInstance[]>([]);
  // Currently fed Anime targets
  const targets = useRef<Element[]>([]);
  //Current refs
  const targetRefs = useRef<{ current: Element }[]>([]);
  // Completed Anime targets
  const completed = useRef<AnimeSet>(new Set<Element>());

  const cleanupAnimeStack = () => {
    for (let ani of animations.current) {
      if (ani.completed) animations.current = animations.current.filter(a => a != ani);
    }
    targets.current = targets.current.filter(t => t != undefined && t != null);
    targetRefs.current = targetRefs.current.filter(t => t && t.current != null);
  };

  const cycleAnime = useCallback((props: AnimeProps) => {
    // 🚽 Clean anime refs
    cleanupAnimeStack();

    // 🗾 Reset Anime.js
    if (targets.current.length > 0) animejs.remove(targets);
    targets.current = [];

    // ➕ Add new target references that haven't completed
    for (let ref of targetRefs.current) {
      /* istanbul ignore next */
      if (ref.current && !completed.current.has(ref.current))
        targets.current.push(ref.current);
    }

    // 😮 Overload complete callback
    const complete = (ani: AnimeInstance) => {
      if (props.complete) props.complete(ani);
      ani.animatables.map((a: any) => completed.current.add(a.target));
      cleanupAnimeStack();
    };
    const animeProps: any = {
      ...props,
      targets: targets.current,
      complete
    };
    delete animeProps.children;
    animations.current.push(animejs(animeProps));
  }, []);

  const createAnime = useCallback(() => {
    cycleAnime(props);
  }, [cycleAnime, props]);

  useEffect(() => {
    createAnime();
  }, [createAnime]);

  const refs = targetRefs.current;
  let children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  children = flatten(children);
  return (
    <>
      {children.map((child: any, i: number) => {
        const ref = createRef();
        refs.push(ref);
        const El = props.component ? props.component : 'div';
        return (
          <El ref={ref} style={props.style} key={`__anime__${i}`}>
            {child}
          </El>
        );
      })}
    </>
  );
}

export default Animate
export type { AnimeInstance };
export { animejs as anime };