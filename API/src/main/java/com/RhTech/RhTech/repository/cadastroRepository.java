package com.RhTech.RhTech.repository;
import org.springframework.data.jpa.repository.JpaRepository; // Interface que fornece métodos prontos para CRUD
import org.springframework.stereotype.Repository; // Anotação para identificar como um repositório

import com.RhTech.RhTech.model.cadastroModel;

@Repository
public interface cadastroRepository extends JpaRepository<cadastroModel, Long> {
    
}
