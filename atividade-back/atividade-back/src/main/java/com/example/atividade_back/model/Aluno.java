package com.example.atividade_back.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(collection = "alunos")
@Data
public class Aluno {
    @Id
    private String id;
    private String nome;
    private String telefone;
    private String email;
    private String endereco;
}