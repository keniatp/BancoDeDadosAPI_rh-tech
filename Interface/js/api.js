
document.getElementById('formulario').addEventListener('submit', async function (event) {
  event.preventDefault();

  const usuario = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    senha: document.getElementById('senha').value,
    cep: document.getElementById('cep').value,
    endereco: document.getElementById('endereco').value,
    numero: document.getElementById('numero').value,
    bairro: document.getElementById('bairro').value,
    cidade: document.getElementById('cidade').value,
    estado: document.getElementById('estado').value
  };

  try {
    const response = await fetch('http://localhost:8080/api/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });

    if (response.ok) {
      Swal.fire("Sucesso", "Usuário cadastrado com sucesso", "success");
      document.getElementById('formulario').reset();
    } else {
      Swal.fire("ERRO", "Não foi possivel fazer o cadastro!", "error");
    }
  } catch (error) {
    console.log('Erro na conexão com a API!');
    console.error(error);
  }
});