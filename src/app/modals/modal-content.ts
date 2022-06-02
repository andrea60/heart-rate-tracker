import { ModalService } from "./modal.service";

export abstract class ModalContent<TRes = never> {
    private _result?:TRes;
    constructor(
        protected _modal:ModalService
    ){}
    onModalInit() { 
        // virtual
    }

    closeModal(result:TRes){
        this._result = result;
        this._modal._complete('complete', result);
    }
    cancelModal(){
        this._modal._complete('cancel', null);
    }
}