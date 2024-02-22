package br.com.projeto.api.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.projeto.api.modelo.Cliente;

@Repository //spring entende que esse arquivo será repositorio
public interface Repositorio extends CrudRepository<Cliente, Long>{ //lembrando a necessidade de importar a classe Cliente
    
}
