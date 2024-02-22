package br.com.projeto.api.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.api.modelo.Cliente;
import br.com.projeto.api.repositorio.Repositorio;

@RestController
@CrossOrigin(origins = "*")
public class Controle {

    @Autowired //criacao do objeto repositorio, permitindo o spring identificar sua necessidade de instanciá-lo quando necessário
    private Repositorio acao;

    //Cadastro de cliente
    @PostMapping("/")
    public Cliente cadastrar(@RequestBody Cliente c){
        return acao.save(c); //o c significa um objeto contendo nome, idade e cidade
    }

    //Teste da aplicação - listar os clientes
    @GetMapping("/")
    public Iterable<Cliente> selecionar(){
        return acao.findAll();
    }

    //Alteração de um cliente
    @PutMapping("/")
    public Cliente editar(@RequestBody Cliente c){
        return acao.save(c);
    }

    //Remover cliente - necessário informar o código na remoção
    @DeleteMapping("/{codigo}")
    public void remover(@PathVariable long codigo){
        acao.deleteById(codigo);
    }
    
}

