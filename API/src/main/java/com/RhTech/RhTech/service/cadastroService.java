package com.RhTech.RhTech.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service;             

import com.RhTech.RhTech.model.cadastroModel;
import com.RhTech.RhTech.repository.cadastroRepository;

@Service
public class cadastroService {
    @Autowired
    private cadastroRepository repository;

    public List<cadastroModel> listarTodos() {
        // Chama o método findAll() do repository para buscar 
        return repository.findAll();
    }

    public Optional<cadastroModel> buscarPorId(Long id) {
        // Chama o método findById() do repository para buscar a pessoa pelo ID
        return repository.findById(id);
    }

    public cadastroModel salvar(cadastroModel cadastromodel) {
        // Chama o método save() do repository para salvar os dados no banco
        return repository.save(cadastromodel);
    }

    public void deletar(Long id) {
        // Chama o método deleteById() do repository para remover o registro
        repository.deleteById(id);
    }
}
