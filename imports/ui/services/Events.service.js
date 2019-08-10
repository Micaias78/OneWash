import { Subject } from "rxjs";

export default EventsService = {
    onUserLogin: new Subject(),
    onNotify: new Subject()
};