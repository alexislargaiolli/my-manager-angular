import { AnimationMetadata, AnimationTransitionMetadata, transition } from '@angular/animations';

export interface MyRouterAnimation {
    routerState: string;
    idleAnim: AnimationMetadata[];
    apparitionAnim: AnimationMetadata[];
    disparitionAnim: AnimationMetadata[];
}

/**
 * Doesn't compile with AOT compilation
 * @param anim 
 * @param otherRouterAnims 
 */
// export function allTransition(anim: MyRouterAnimation, otherRouterAnims: MyRouterAnimation[]): AnimationTransitionMetadata[] {
//     let result = [];
//     for (let a of otherRouterAnims) {
//         result = result.concat(transitionInOut(anim, a));
//     }
//     return result;
// }

/**
 * Build all in / out transition of rootAnim with other anims
 * Signature with array of other anim breaks AOT compilation
 */
export function allTransition(rootAnim: MyRouterAnimation, otherAnim1: MyRouterAnimation, otherAnim2: MyRouterAnimation, otherAnim3: MyRouterAnimation, otherAnim4: MyRouterAnimation): AnimationTransitionMetadata[] {
    return [
        ...transitionInOut(rootAnim, otherAnim1),
        ...transitionInOut(rootAnim, otherAnim2),
        ...transitionInOut(rootAnim, otherAnim3),
        ...transitionInOut(rootAnim, otherAnim4),
    ]
}

export function recursiveIteration(anim: MyRouterAnimation, otherRouterAnims: MyRouterAnimation[], currentIndex: number, currentValue: AnimationTransitionMetadata[]) {
    if (currentIndex === otherRouterAnims.length) {
        return currentValue;
    }
    return recursiveIteration(anim, otherRouterAnims, currentIndex + 1, [...currentValue, ...transitionInOut(anim, otherRouterAnims[currentIndex])])
}

export function transitionInOut(anim: MyRouterAnimation, otherRouterAnim: MyRouterAnimation): AnimationTransitionMetadata[] {
    return [
        transitionTo(anim, otherRouterAnim),
        transitionTo(otherRouterAnim, anim),
    ];
}

export function transitionTo(anim: MyRouterAnimation, otherRouterAnim: MyRouterAnimation): AnimationTransitionMetadata {
    // `${anim.routerState}=>${otherRouterAnim.routerState}` breaks AOT compilation
    return transition(anim.routerState + '=>' + otherRouterAnim.routerState, [
        ...otherRouterAnim.idleAnim,
        ...anim.disparitionAnim,
        ...otherRouterAnim.apparitionAnim
    ]);
}
