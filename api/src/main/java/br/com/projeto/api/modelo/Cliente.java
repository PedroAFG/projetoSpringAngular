package br.com.projeto.api.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

//modelo onde eu gero as tabelas no banco e trafego informações

@Entity
@Table(name = "clientes")
@Getter //não precisar fazer get e set em cada atributo
@Setter
public class Cliente {
    
    @Id //faz com que o codigo seja chave primaria no banco
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long codigo;

    private String nome;

    private int idade;

    private String cidade;

}
