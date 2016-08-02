import Dispatcher from '../dispatcher/Dispatcher';
import UrlConstants from '../constants/Url';
import EventConstants from '../constants/Events';
import $ from 'jquery';

var PingAction = {

    callForPing (){
        $.get({
            url: UrlConstants.PING_URL,
            success: (data) => {
                Dispatcher.dispatch({
                    eventType: EventConstants.INCOMING_PING,
                    payload: data
                });
            },
            error: function () {
                Dispatcher.dispatch({
                    eventType: EventConstants.INCOMING_PING,
                    payload: "Some error was happened! Probably you don't have backend :D"
                });
            }
        });
    }

};

export default PingAction;