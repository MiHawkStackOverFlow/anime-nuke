import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

/**
 * Decorater which allows to unsubscribe all subscriptions at once
 */
export function unsubscribeAll(destroyMethodName: string = 'ngOnDestroy'): PropertyDecorator {
    return function decorate(target: any, key: string): void {
      const destroyFunction: Function = target[destroyMethodName];
      if(!_.isFunction(destroyFunction)) {
        throw new TypeError(`Cannot apply 'unsubscribeAll' decorater, '${destroyMethodName}' is not a function`);
      }

      target[destroyMethodName] = function() {
        destroyFunction.apply(this);
        const subscriptions: StringMap = this[key];

        if(!_.isObjectLike(subscriptions)) {
            throw new TypeError(`Cannot unsubscribe, property '${key}' is not an object`);
        }

        _.forEach(subscriptions, (s: Subscription) => {
           if(s && s.unsubscribe) {
            s.unsubscribe();
           }
        });
      }
    }
}