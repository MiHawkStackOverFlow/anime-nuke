// import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Subscription';

export function unsubscribe(): PropertyDecorator {
    return function decorate(target: Object, propertyKey: string | symbol) : void {
        console.log('what is target', target, propertyKey);
        let ngOnDestroyFunction: Function = target['ngOnDestroy'];
        console.log('what is ngOnDestroyFunction', ngOnDestroyFunction);
        let ngOnDestroy: Function = function(): void {
            console.log('what is this', this);
        }
        target['ngOnDestroy'] = ngOnDestroy;
        console.log('final target', target[propertyKey]);
    }
}