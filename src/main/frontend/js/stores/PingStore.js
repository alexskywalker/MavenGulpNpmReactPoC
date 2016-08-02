import EventEmitter from 'eventemitter3';
import Dispatcher from '../dispatcher/Dispatcher';
import EventConstants from '../constants/Events';

class PingStore extends EventEmitter {

    constructor() {
        super();
        this.pingData = null;
    }

    getPingData() {
        return this.pingData;
    }

    onChange(listener, context) {
        this.on(EventConstants.PING_CHANGE_EVENT, listener, context);
    }

    offChange(listener, context) {
        this.removeListener(EventConstants.PING_CHANGE_EVENT, listener, context);
    }

    emitChange() {
        this.emit(EventConstants.PING_CHANGE_EVENT);
    }

}

const pingStore = new PingStore();

pingStore.dispatchToken = Dispatcher.register(function(event) {
    switch (event.eventType) {

        case EventConstants.INCOMING_PING:
            pingStore.pingData = event.payload;
            pingStore.emitChange();
            break;

        default:
        // Do nothing

    }
});

export default pingStore;