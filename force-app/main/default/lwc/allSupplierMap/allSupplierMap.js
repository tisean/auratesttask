import getAllSuppliers from '@salesforce/apex/SupplierController.getAllSuppliersByCity'
import {api, LightningElement, wire} from 'lwc';
import {ShowToastEvent} from "lightning/platformShowToastEvent";
import {getRecord} from "lightning/uiRecordApi";
import CITY_FIELD from '@salesforce/schema/Account.BillingCity';
const ERROR_TITLE = 'Error loading Boats Near Me';
const ERROR_VARIANT = 'error';

export default class AllSupplierMap extends LightningElement {

    @api
    city;
    accountId;
    error = undefined;
    isLoading = true;
    mapMarkers = [];

    @api
    get recordId() {
        return this.accountId;
    }

    set recordId(value) {
        this.setAttribute('accountId', value);
        this.accountId = value;
    }

    @wire(getRecord, { recordId: '$recordId', fields: CITY_FIELD })
    wiredRecord({ error, data }) {
        if (data) {
            this.error = undefined;
            this.city = data.fields.BillingCity.value;
        } else if (error) {
            this.error = error;
            this.supplierId = undefined;
            this.mapMarkers = [];
        }
    }

    @wire(getAllSuppliers,{city: '$city'})
    wiredBoatsJSON({error, data}) {
        if (data) {
            this.createMapMarkers(data);
        } else if (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: ERROR_TITLE,
                    message: error.body.message,
                    variant: ERROR_VARIANT
                })
            );
        }
        this.isLoading = false;
    }

    createMapMarkers(boatData) {
        this.mapMarkers = JSON.parse(boatData).map(function (x) {
            return {
                location: {
                    Latitude: x.Location__Latitude__s,
                    Longitude: x.Location__Longitude__s,
                    title: x.Name+' -> '+x.City__c
                }
            }
        });
    }

    get showMap() {
        return this.mapMarkers.length > 0;
    }
}