  const apiUrl = 'http://localhost:8080/api/cargo';

  async function carregarCargos() {
    try {
      const res = await fetch(apiUrl);
      const cargos = await res.json();
      const tbody = document.getElementById('lista-cargos');
      tbody.innerHTML = '';
      cargos.forEach(cargo => {
        tbody.innerHTML += `
          <tr class="border-b hover:bg-gray-50">
            <td class="py-2 px-4">${cargo.id}</td>
            <td class="py-2 px-4">${cargo.nome}</td>
            <td class="py-2 px-4">${cargo.descricao || ''}</td>
            <td class="py-2 px-4 text-center space-x-2">
              <button onclick="editarCargo(${cargo.id})" class="text-blue-600 hover:underline">Editar</button>
              <button onclick="excluirCargo(${cargo.id})" class="text-red-600 hover:underline">Excluir</button>
            </td>
          </tr>`;
      });
    } catch (error) {
      console.error('Erro ao carregar cargos', error);
      Swal.fire('Erro', 'Falha ao carregar cargos', 'error');
    }
  }

  document.getElementById('form-cargo').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('cargo-id').value;
    const nome = document.getElementById('nome').value.trim();
    const descricao = document.getElementById('descricao').value.trim();

    if (!nome) {
      Swal.fire('Atenção', 'O nome do cargo é obrigatório', 'warning');
      return;
    }

    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, descricao }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Erro desconhecido');
      }

      Swal.fire('Sucesso', `Cargo ${id ? 'atualizado' : 'cadastrado'} com sucesso!`, 'success');
      document.getElementById('form-cargo').reset();
      document.getElementById('cargo-id').value = '';
      document.getElementById('btn-cancelar').classList.add('hidden');
      carregarCargos();

    } catch (err) {
      Swal.fire('Erro', err.message, 'error');
    }
  });

  async function editarCargo(id) {
    try {
      const res = await fetch(`${apiUrl}/${id}`);
      if (!res.ok) throw new Error('Cargo não encontrado');
      const cargo = await res.json();

      document.getElementById('cargo-id').value = cargo.id;
      document.getElementById('nome').value = cargo.nome;
      document.getElementById('descricao').value = cargo.descricao || '';
      document.getElementById('btn-cancelar').classList.remove('hidden');

    } catch (error) {
      Swal.fire('Erro', error.message, 'error');
    }
  }

  async function excluirCargo(id) {
    const confirmado = await Swal.fire({
      title: 'Confirmar exclusão',
      text: 'Deseja realmente excluir este cargo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    });

    if (confirmado.isConfirmed) {
      try {
        const res = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Erro ao excluir');
        Swal.fire('Excluído', 'Cargo excluído com sucesso', 'success');
        carregarCargos();
      } catch (err) {
        Swal.fire('Erro', err.message, 'error');
      }
    }
  }

  document.getElementById('btn-cancelar').addEventListener('click', () => {
    document.getElementById('form-cargo').reset();
    document.getElementById('cargo-id').value = '';
    document.getElementById('btn-cancelar').classList.add('hidden');
  });

  carregarCargos();