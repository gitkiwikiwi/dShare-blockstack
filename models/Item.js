import { Model } from 'radiks';
import moment from 'moment';

export default class Item extends Model {
    static className = 'Item';
    static schema = {
        name: {
            type: String,
            decrypted: true
        },
        path: {
            type: String,
            decrypted: true
        },
        recipients: {
            type: Array,
            decrypted: true
        },
        owner: {
            type: String,
            decrypted: true
        }
    }

    static defaults = {
        recipients: []
    }

    ago() {
        return moment(this.attrs.createdAt).fromNow();
    }
}