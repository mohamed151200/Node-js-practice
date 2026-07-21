/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {
    return {
        counter:init,
        increment()
        {
            this.counter+=1
            return this.counter
        },
        decrement()
        {
            this.counter-=1
            return this.counter
        } ,
        reset()
        {
            this.counter=init
            return this.counter
        }  

    }
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */


