export class FormValidator {
    constructor(config, form) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = form;
    }

    enableValidation() {
        this._setEventListener();
    }

    _setEventListener = () => {
        this._inputArray = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
      
        this._inputArray.forEach((inputElement) => {
            this._inputElement = inputElement;
            this._inputElement.addEventListener('input', (evt) => {
              this._trgt = evt.target;
              this._isValid();
              this.toggleButtonState();
            })
          inputElement.closest('.form').addEventListener('submit', () => {
            this.toggleButtonState();
          })
        })
      }

      _isValid () {
        if (this._trgt.validity.valid) {
          this._hideInputError()
        } else {
          this._showInputError()
        }
      }

      _hideInputError () {
        const errorElement = this._formElement.querySelector(`#${this._trgt.id}-error`);
        errorElement.classList.remove(this._errorClass);
        this._trgt.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
      }

      _showInputError () {
        const errorElement = this._formElement.querySelector(`#${this._trgt.id}-error`);
        errorElement.classList.add(this._errorClass);
        this._trgt.classList.add(this._inputErrorClass);
        errorElement.textContent = this._trgt.validationMessage;
      }

      toggleButtonState() {
        
        if (this._hasInvalid()) {
          this._buttonElement.setAttribute('disabled', true);
          this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
          this._buttonElement.removeAttribute('disabled');
          this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
      }

      _hasInvalid() {
        return this._inputArray.some((inputElement) => {
          return !inputElement.validity.valid;
        })
      }

      errorCleaner = () => {
        const errorList = this._formElement.querySelectorAll('.form__input-error');
        const inputList = this._formElement.querySelectorAll('.form__item');
        errorList.forEach(errorItem => {
            errorItem.textContent = '';
        })
        inputList.forEach(inputitem => {
            inputitem.classList.remove('form__item_type_error');
        })
    }
}