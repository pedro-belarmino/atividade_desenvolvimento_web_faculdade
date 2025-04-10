package com.example.atividade_back.service;

import com.example.atividade_back.model.Aluno;
import com.example.atividade_back.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // Indica que esta classe é um serviço gerenciado pelo Spring
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    // Cadastra um aluno
    public Aluno criarAluno(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    // Lista todos os alunos
    public List<Aluno> listarAlunos() {
        return alunoRepository.findAll();
    }
}
