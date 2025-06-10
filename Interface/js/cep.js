'use strict'

const pesquisarCep = async () => {
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;

    if (cepValidado(cep)) {
        try {
            const dados = await fetch(url);
            const endereco = await dados.json();

            if (endereco.hasOwnProperty('erro')) {
                document.getElementById('cep-aviso').classList.remove('hidden');
            } else {
                document.getElementById('cep-aviso').classList.add('hidden');
                preencherFormulario(endereco);
            }
        } catch (error) {
            Swal.fire("Erro", "Não foi possível buscar o CEP", "error");
            console.error("Erro", error);
        }
    } else {
        Swal.fire("ERRO", "Digite um CEP válido", "error");
    }
}

const cepValidado = cep => /^[0-9]{8}$/.test(cep); //verifica se tem 8 digites e se sao numeros

const limparFormulario = (endereco) =>{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.estado;
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);


