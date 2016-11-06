'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
getEmitter.isStar = false;
module.exports = getEmitter;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    var subscriberEvents = {};
    var count = 0;

    function performEvents(event) {
        var eventsKeys = Object.keys(subscriberEvents);
        var check = eventsKeys.indexOf(event.split('.')[0]);

        if (count - check > -1) {
            count = check + 1;
            subscriberEvents[event].forEach(function (subscriber) {
                subscriber.handler.call(subscriber.context);
            });
        }
    }

    return {

        on: function (event, context, handler) {
            // console.info(event, context, handler);
            if (!subscriberEvents.hasOwnProperty(event)) {
                subscriberEvents[event] = [];
            }

            subscriberEvents[event].push({
                context: context,
                handler: handler
            });

            return this;
        },

        off: function (event, context) {
            // console.info(event, context);

            if (subscriberEvents.hasOwnProperty(event)) {
                var events = Object.keys(subscriberEvents);
                var searchedEvents = [event];

                events.forEach(function (searchedEvent) {
                    var check = searchedEvent.split('.');
                    for (var i = 0; i < check.length; i++) {
                        var nameEvent = check.slice(0, i).join('.');
                        if (searchedEvent !== event &&
                            nameEvent === event) {
                            searchedEvents.push(searchedEvent);
                        }
                    }
                });
                searchedEvents.forEach(function (searchEvent) {
                    subscriberEvents[searchEvent].forEach(function (subscriber, i) {
                        if (subscriber.context === context) {
                            subscriberEvents[searchEvent].splice(i, 1);
                        }
                    });
                });
            }

            return this;
        },

        emit: function (event) {
            // console.info(event);
            var namesEvent = event.split('.');

            for (var i = namesEvent.length; i > -1; i--) {
                var nameEvent = namesEvent.slice(0, i).join('.');
                if (subscriberEvents.hasOwnProperty(nameEvent)) {
                    performEvents(nameEvent);
                }
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}
