import Component, { ComponentProps } from '../../app/js/component';
import Input from '../input/input';
import getComponents = Component.getComponents;
import FormButton from '../form-button/form-button';
import getComponent = Component.getComponent;

export default class Form extends Component.Default {
    nInputs: Input[];
    nFormButton: FormButton;

    constructor(element: ComponentProps) {
        super(element);

        this.nInputs = getComponents('input', this.nRoot).map(component => new Input(component, this.updateButton));
        this.nFormButton=new FormButton(getComponent('form-button',this.nRoot));

        this.nRoot.addEventListener('submit', this.onSubmit);
    }

    updateButton = () => {
        const state = this.nInputs.every(item=> {
            if (item.required) return item.valid;
            return true;
        });

        this.nFormButton.setDisabled(!state);
    }

    onSubmit = (e: Event) => {
        e.preventDefault();

        let data: any = {};

        this.nInputs.forEach(item=> {
            data[item.name]=item.value;
        })

        console.log(data);

    }

    destroy = () => {
        // Destroy functions
    }
}