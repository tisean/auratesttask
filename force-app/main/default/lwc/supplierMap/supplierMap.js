import {api, LightningElement, wire} from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
const LONGITUDE_FIELD = 'Suppliers__c.Location__Longitude__s';
const LATITUDE_FIELD = 'Suppliers__c.Location__Latitude__s';
const SUPPLIER_FIELDS = [LONGITUDE_FIELD, LATITUDE_FIELD];
export default class SupplierMap extends LightningElement {

    supplierId;

    @api
    get recordId() {
        return this.supplierId;
    }

    set recordId(value) {
        this.setAttribute('supplierId', value);
        this.supplierId = value;
    }

    error = undefined;
    mapMarkers = [];

    @wire(getRecord, { recordId: '$recordId', fields: SUPPLIER_FIELDS })
    wiredRecord({ error, data }) {
        if (data) {
            this.error = undefined;
            const longitude = data.fields.Location__Longitude__s.value;
            const latitude = data.fields.Location__Latitude__s.value;
            this.updateMap(longitude, latitude);
        } else if (error) {
            this.error = error;
            this.supplierId = undefined;
            this.mapMarkers = [];
        }
    }
    updateMap(Longitude, Latitude) {
        this.mapMarkers = [
            {
                location: {
                    Latitude,
                    Longitude,
                },
            }
        ];
    }

    get showMap() {
        return this.mapMarkers.length > 0;
    }
}