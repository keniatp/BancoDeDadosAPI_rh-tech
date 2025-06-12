package com.RhTech.RhTech.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "funcionario_por_cargo")
@Getter
@Setter
@NoArgsConstructor
public class funcionarioCargoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relação com Funcionario (FK funcionario_id)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "funcionario_id", nullable = false)
    private cadastroModel funcionario;

    // Relação com Cargo (FK cargo_id)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cargo_id", nullable = false)
    private cargoModel cargo;

    @Column(columnDefinition = "TEXT")
    private String detalhes;

    @Column(name = "data_inicio", nullable = false)
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;
}
