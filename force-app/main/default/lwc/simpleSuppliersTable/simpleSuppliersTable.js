import {api, LightningElement, track, wire} from 'lwc';
import getSupplierList from '@salesforce/apex/SupplierController.getAllSuppliers';
import totalRecords from '@salesforce/apex/SupplierController.totalRecords';
import CITY_FIELD from '@salesforce/schema/Account.BillingCity'
import {getRecord} from "lightning/uiRecordApi";

const COLUMNS = [
    {
        label: 'View',
        type: 'button-icon',
        initialWidth: 55,
        typeAttributes: {
            iconName: 'action:preview',
            title: 'Preview',
            variant: 'border-filled',
            alternativeText: 'View'
        }
    },
    {
        label: 'Name',
        fieldName: 'Name'
    },
    {
        label: 'City',
        fieldName: 'City__c',
        type: 'text',
        cellAttributes: {alignment: 'center'}
    },
    {
        label: 'Latitude',
        fieldName: 'Location__Latitude__s',
        type: 'latitude',
        cellAttributes: {alignment: 'center'}
    },
    {
        label: 'Longitude',
        fieldName: 'Location__Longitude__s',
        type: 'longitude',
        cellAttributes: {alignment: 'center'}
    },
];


export default class SimpleSuppliersTable extends LightningElement {

    @api v_Offset = 0;
    @api v_TotalRecords;
    @track page_size = 10;

    @api city;
    data;
    error;
    columns = COLUMNS;
    accountId;
    @track hide;
    @track isModalOpen = false;
    supplierRow;
    @api
    mapMarkers;

    @api
    get recordId() {
        return this.accountId;
    }

    set recordId(value) {
        this.setAttribute('accountId', value);
        this.accountId = value;
    }

    @wire(getRecord, {recordId: '$recordId', fields: CITY_FIELD})
    wiredRecord({error, data}) {
        if (data) {
            this.error = undefined;
            this.city = data.fields.BillingCity.value;
        } else if (error) {
            this.error = error;
            this.supplierId = undefined;
            this.mapMarkers = [];
        }
    }

    @wire(getSupplierList, {city: '$city', v_Offset: '$v_Offset', v_pageSize: '$page_size'})
    suppliersHandler({data, error}) {
        if (data) {
            this.data = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    @wire(totalRecords, {city: '$city'})
    totalRecordsHandler({data, error}) {
        if (data) {
            this.v_TotalRecords = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    previousHandler2() {
        if (this.v_Offset === 0 || (this.v_Offset - this.page_size) <= 0) {
            this.v_Offset = 0;
            this.template.querySelector('c-paginator-component').changeView('falseprevious');
            this.template.querySelector('c-paginator-component').changeView('falsefirst');
            this.template.querySelector('c-paginator-component').changeView('truenext');
            this.template.querySelector('c-paginator-component').changeView('truelast');
        } else {
            this.v_Offset -= this.page_size;
            this.template.querySelector('c-paginator-component').changeView('truenext');
            this.template.querySelector('c-paginator-component').changeView('truefirst');
            this.template.querySelector('c-paginator-component').changeView('trueprevious');
            this.template.querySelector('c-paginator-component').changeView('truelast');
        }
    }

    nextHandler2() {
        if (this.v_Offset == (this.v_TotalRecords - (this.v_TotalRecords % this.page_size))) {
            this.template.querySelector('c-paginator-component').changeView('falsenext');
            this.template.querySelector('c-paginator-component').changeView('falselast');
            this.template.querySelector('c-paginator-component').changeView('trueprevious');
            this.template.querySelector('c-paginator-component').changeView('truefirst');
        } else {
            this.v_Offset += this.page_size;
            this.template.querySelector('c-paginator-component').changeView('truenext');
            this.template.querySelector('c-paginator-component').changeView('trueprevious');
            this.template.querySelector('c-paginator-component').changeView('truelast');
            this.template.querySelector('c-paginator-component').changeView('truefirst');
            if (this.v_Offset == (this.v_TotalRecords - (this.v_TotalRecords % this.page_size))) {
                this.template.querySelector('c-paginator-component').changeView('falsenext');
                this.template.querySelector('c-paginator-component').changeView('falselast');
                this.template.querySelector('c-paginator-component').changeView('trueprevious');
                this.template.querySelector('c-paginator-component').changeView('truefirst');
            }
        }
    }

    changeHandler2(event) {
        const det = event.detail;
        this.page_size = parseInt(det);
        this.v_Offset = 0;
        if (this.v_Offset == (this.v_TotalRecords - (this.v_TotalRecords % this.page_size))) {
            this.template.querySelector('c-paginator-component').changeView('falsenext');
            this.template.querySelector('c-paginator-component').changeView('falselast');
            this.template.querySelector('c-paginator-component').changeView('falseprevious');
            this.template.querySelector('c-paginator-component').changeView('falsefirst');
        } else {
            this.template.querySelector('c-paginator-component').changeView('truenext');
            this.template.querySelector('c-paginator-component').changeView('falseprevious');
            this.template.querySelector('c-paginator-component').changeView('truelast');
            this.template.querySelector('c-paginator-component').changeView('falsefirst');
            }
        }


    firstpagehandler() {
        this.v_Offset = 0;
        this.template.querySelector('c-paginator-component').changeView('falseprevious');
        this.template.querySelector('c-paginator-component').changeView('falsefirst');
        this.template.querySelector('c-paginator-component').changeView('truenext');
        this.template.querySelector('c-paginator-component').changeView('truelast');
    }

    lastpagehandler() {
        const offset = this.v_TotalRecords - ((this.v_TotalRecords) % (this.page_size));
        this.v_Offset = offset;
        this.template.querySelector('c-paginator-component').changeView('trueprevious');
        this.template.querySelector('c-paginator-component').changeView('falsenext');
        this.template.querySelector('c-paginator-component').changeView('falselast');
        this.template.querySelector('c-paginator-component').changeView('truefirst');
    }

    handleRowAction(event) {
        const dataRow = event.detail.row;
        this.supplierRow = dataRow;
        const latitude = event.detail.row.Location__Latitude__s;
        const longitude = event.detail.row.Location__Longitude__s;
        this.updateMap(latitude, longitude);
        this.isModalOpen = true;
    }

    closeModalAction() {
        this.isModalOpen = false;
    }

    updateMap(longitude, latitude) {
        this.mapMarkers = [
            {
                location: {
                    Latitude: longitude,
                    Longitude: latitude
                },
            }
        ];
    }
}