class PinCodeCreate {
    constructor (box) {
        this.box = box;
        this.renderCreate ();
        this.pinCode = document.querySelector ('.create_input');
        this.createPin ();
        this.errorText = document.querySelector ('.error_text');
        
      
    }
    renderCreate () {
        this.box.appendChild (templateEngine(PinCodeCreate.formCreator()))
        };
        createPin () {
            this.pinCode.addEventListener ('keydown', (event) => {
                if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 13 || event.keyCode == 17 || event.keyCode == 67) {
                    return
                }
                if (event.keyCode < 48 || event.keyCode > 57 && event.keyCode < 96 || event.keyCode > 105) {
                    this.errorText.textContent = 'допускается только ввод цифр!';
                    event.preventDefault ();
                    setTimeout(() => this.errorText.textContent = '', 2000);
                }
            });
            const resetBtn = document.querySelector ('.reset_btn');
           resetBtn.addEventListener ('click', (event) => {
            event.preventDefault();
            this.pinCode.value = '';
           });
           this.pinCode.addEventListener ('input', (event) => {
            this.pinCode.value = this.pinCode.value.replace(/[^0-9]/g, "")
           })
        };
}
PinCodeCreate.formCreator = () => ({
    tag: 'form',
    cls: ['form_create', 'form'],
    attrs: {
        action: '#',
    },
    content: [
        {
            tag: 'div',
            cls: 'input_box',
            content: [
                {
                    tag: 'input',
                    cls: ['create_input','input'],
                    attrs: { 
                        type: 'text',
                    },
                },
                {
                    tag: 'p',
                    cls: 'error_text',
                    content: '',
                },
            ]
        },
        {
            tag: 'div',
            cls: ['create_btn_box', 'btn_box'],
            content: [
                {
                    tag: 'button',
                    cls: ['btn', 'create_btn'],
                    content: 'Создать пин',
                },
                {
                    tag: 'button',
                    cls: ['btn', 'reset_btn'],
                    content: 'очистить  ',
                },
            ]
        }            
    ],
})