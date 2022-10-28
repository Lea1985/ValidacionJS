// Variables

const btnEnviar = document.querySelector('#enviar');

const btnReset = document.querySelector('#resetBtn');

const email = document.querySelector('#email');

const asunto = document.querySelector('#asunto');

const mensaje = document.querySelector('#mensaje');

const formulario = document.querySelector('#enviar-mail');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


// Main

addEventListeners();

function addEventListeners() {
    document.addEventListener('DOMContentLoaded', iniciarApp);

    email.addEventListener('blur', validarFurmulario);
    asunto.addEventListener('blur', validarFurmulario);
    mensaje.addEventListener('blur', validarFurmulario);



    // Reseter

    btnReset.addEventListener('click', resetarFormuluario);
    // ENviar mail

    formulario.addEventListener('submit', enviarEmail)


};


// Funciones

function iniciarApp() {

    btnEnviar.disabled = true;

    btnEnviar.classList.add('curso-not-allowed', 'opacity-50');

};



function validarFurmulario(e) {

    if (e.target.value.length) {

        // Elimina los errores ...

        const errores = document.querySelector('.error');
        if (errores != undefined) {
            errores.remove();
        }



        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');

    }

    if (e.target.type === 'email') {


        if (er.test(e.target.value)) {
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('Email no Valido');
        };
    };

    if (er.test(email.value) != '' && asunto.value != '' && mensaje.value != '') {

        btnEnviar.disabled = false;

        btnEnviar.classList.remove('cursor-not-allowed');
        btnEnviar.classList.remove('opacity-50');
    }

};

function mostrarError(msj) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = msj;
    mensajeError.classList.add('border', 'border-red-500', 'backGround-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    };

};

function enviarEmail(e) {

    e.preventDefault();

    // mostrar el spinner

    const spinner = document.querySelector('#spinner');

    spinner.style.display = 'flex'

    setTimeout(() => {

        spinner.style.display = 'none';

        const parrafo = document.createElement('p');

        parrafo.textContent = 'Mensaje enviado correctamente';

        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();
            resetarFormuluario();
        }, 5000);


    }, 3000)

}


function resetarFormuluario() {

    email.classList.remove('border');
    asunto.classList.remove('border');
    mensaje.classList.remove('border');

    const errores = document.querySelector('.error');

    if (errores) {
        errores.remove();
    }

    formulario.reset();

    iniciarApp();

}