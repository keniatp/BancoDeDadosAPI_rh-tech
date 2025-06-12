package com.RhTech.RhTech.repository;
import org.springframework.data.jpa.repository.JpaRepository; // Interface que fornece métodos prontos para CRUD
import org.springframework.stereotype.Repository;

import com.RhTech.RhTech.model.funcionarioCargoModel; 


public interface funcionarioCargoRepository extends JpaRepository<funcionarioCargoModel, Long>{
    
}
