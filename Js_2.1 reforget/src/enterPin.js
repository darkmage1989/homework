class PinCodeEnter {
    constructor (box) {
this.box = box;
this.inputBox = document.querySelector ('.input_box');
this.renderEnterInput ();
this.pinCode = document.querySelector ('.create_input');
this.title = document.querySelector ('.title');
this.form = document.querySelector ('.form');
this.errorText = document.querySelector ('.error_text');   
}
    renderEnterInput () {
        const createBtn = document.querySelector ('.create_btn');
           createBtn.addEventListener ('click', (event => {
            this.form.appendChild (templateEngine(PinCodeEnter.EnterBtn()));
            event.preventDefault ();
            const createBtnBox = document.querySelector ('.create_btn_box')
            createBtnBox.remove();
            this.pinCode.classList.add ('hidden');
            this.pinCode.setAttribute ('disabled', true)
            this.title.textContent = 'Введите ваш пин код';
            for (let i = 0; i < this.pinCode.value.length; i++) {
                this.inputBox.prepend (templateEngine(PinCodeEnter.EnterPin()));    
            };
            const enterBtn = document.querySelector ('.enter_btn')
            const enterPinInputs = document.querySelectorAll ('.enter_pin')
            enterPinInputs.forEach((enterPinInput, i) => {
                enterPinInput.addEventListener ('input', (event) => {
                    enterPinInput.value = enterPinInput.value.replace(/[^0-9]/g, "");
                    if (!enterPinInput.value.match (/\d/) && !enterPinInput.value.length)   {
                        enterBtn.setAttribute ('disabled', true)
                        this.errorText.textContent = 'В каждое поле допускается только ввод цифр!';
                        setTimeout(() => this.errorText.textContent = '', 2000);
                    };
                    if (enterPinInput.value !=='') {
                        enterPinInput.nextElementSibling.focus();
                    };
                    if (enterPinInput.nextElementSibling.value !== '') {
                        enterBtn.removeAttribute ('disabled');
                    }
                });
                enterPinInput.addEventListener ('paste', (event) => {
                    const copy = window.event.clipboardData.getData ('text');
                    enterPinInputs.forEach ((enterPinInput, i) => {
                        enterPinInput.value = copy[i] || '';
                        if (enterPinInput != '') {
                            enterPinInput.nextElementSibling.focus();
                        }
                    }) 
                    
                })
                enterPinInput.addEventListener ('keydown', (event) => {
                    if (event.keyCode == 8 && enterPinInput.previousElementSibling) {
                        enterPinInput.value = '';
                        enterPinInput.previousElementSibling.focus();
                    }
                })
            });
            const check = document.querySelector ('.check');
            const enterResetBtn = document.querySelector ('.enter_Reset_btn');
            enterResetBtn.addEventListener ('click', (event) => {
                history.back();
            })
            enterBtn.addEventListener ('click', (event => {
                event.preventDefault();
                enterPinInputs.forEach ((enterPinInput) => {
                    check.value += enterPinInput.value;
                });
                if (this.pinCode.value === check.value) {
                    const btnBox = document.querySelector ('.btn_box');
                    btnBox.remove();
                    const enterPinInputs = document.querySelectorAll ('.enter_pin');
                    enterPinInputs.forEach(enterPinInput => {
                        enterPinInput.remove();
                        this.title.textContent = 'Поздравлю, все прошло успешно!';
                    });
                } else {
                    this.errorText.textContent = 'Пин код указан не верно!'
                }
                
            }))
           }));
           
    };
}
PinCodeEnter.EnterPin = () => ({
    tag: 'input',
    cls: 'enter_pin',
    content: '',
    attrs: {
        type: 'text',
        maxLength: '1',
    },
});
PinCodeEnter.EnterBtn = () => ({
    tag: 'div',
            cls: ['enter_btn_box', 'btn_box'],
            content: [
                {
                    tag: 'button',
                    cls: ['btn', 'enter_btn'],
                    content: 'Создать пин',
                    attrs: {
                        disabled: 'true',
                    }
                },
                {
                    tag: 'button',
                    cls: ['btn', 'enter_Reset_btn'],
                    content: 'сбросить  ',
                },
                {
                    tag: 'input',
                    cls: ['check', 'hidden'],
                    attrs: {
                        type: 'text',
                    }
                }
            ]
})

// const enterInputs = document.querySelectorAll ('.enter_pin');
//         enterInputs.forEach(enterInput => {
//             enterInput.addEventListener ('input', (event) => {
//                 console.log(enterInput);
//             })
//         }); 