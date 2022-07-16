import {LightningElement, api, track} from 'lwc';

export default class PaginatorComponent extends LightningElement {
    @track button;
    @api
    changeView(str) {
        if (str === 'trueprevious') {
            this.template.querySelector('.disabled-lightning-button1').disabled = false;
        }
        if (str === 'falsenext') {
            this.template.querySelector('.disabled-lightning-button2').disabled = true;
        }
        if (str === 'truenext') {
            this.template.querySelector('.disabled-lightning-button2').disabled = false;
        }
        if (str === 'falseprevious') {
            this.button = this.template.querySelector('.disabled-lightning-button1').disabled = true;
        }
        if (str === 'falselast') {
            this.button = this.template.querySelector('.disabled-lightning-button4').disabled = true;
        }
        if (str === 'truelast') {
            this.button = this.template.querySelector('.disabled-lightning-button4').disabled = false;
        }
        if (str === 'falsefirst') {
            this.button = this.template.querySelector('.disabled-lightning-button3').disabled = true;
        }
        if (str === 'truefirst') {
            this.button = this.template.querySelector('.disabled-lightning-button3').disabled = false;
        }
    }

    renderedCallback() {
            this.template.querySelector('.disabled-lightning-button1').disabled = true;
            this.template.querySelector('.disabled-lightning-button3').disabled = true;
    }

    previousHandler1() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    nextHandler1() {
        this.dispatchEvent(new CustomEvent('next'));
    }

    FirstPageHandler1() {
        this.dispatchEvent(new CustomEvent('firstpage'));
    }

    LastPageHandler1() {
        this.dispatchEvent(new CustomEvent('lastpage'));
    }

    changeHandler(event) {
        event.preventDefault();
        const s_value = parseInt(event.target.value);
        const selectedEvent = new CustomEvent('selected', {detail: s_value});
        this.dispatchEvent(selectedEvent);
    }
}