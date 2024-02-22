import { Component } from '@angular/core';
import { Cliente } from '../modelo/cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

    // Objeto do tipo cliente
    cliente = new Cliente();

    // Variável para visibilidade dos botões
    btnCadastro:boolean = true;
    btnExportarTxt:boolean = true;
    btnExportarCsv:boolean = true;

    // Variável para visibilidade da tabela
    tabela:boolean = true;

    // JSON de clientes
    clientes:Cliente[] = [];

    // Construtor
    constructor(private servico:ClienteService){}

    // Método para selecionar os clientes
    selecionar():void{
      this.servico.selecionar()
      .subscribe(retorno => this.clientes = retorno);
    }

    // Método de cadastro
    cadastrar():void{
      this.servico.cadastrar(this.cliente)
      .subscribe(retorno => {
        
        // Cadastrar o cliente no vetor
        this.clientes.push(retorno); });

        // Limpar formulário
        this.cliente = new Cliente();

        // Mensagem
        alert('Cliente cadastrado com sucesso!')
    }

    // Método para editar clientes
    editar():void{
      this.servico.editar(this.cliente)
      .subscribe(retorno => {

        // Obter posição do vetor, onde está o cliente
        let posicao = this.clientes.findIndex(obj => {
          return obj.codigo == retorno.codigo; // Naquela linha, vou trabalhar com a caracteristica codigo
        });

        // Alterar os dados do cliente no vetor
        this.clientes[posicao] = retorno;

        // Visibilidade dos botões
        this.btnCadastro = true;
        this.btnExportarTxt = true;
        this.btnExportarCsv = true;

        // Visibilidade da tabela
        this.tabela = true;

        // Mensagem
        alert('Cliente alterado com sucesso!')

        // Limpar formulário
        this.cliente = new Cliente();

      })
    }

    // Método para remover clientes
    remover():void{

      this.servico.remover(this.cliente.codigo)
      .subscribe(retorno => {

        // Obter posição do vetor, onde está o cliente
        let posicao = this.clientes.findIndex(obj => {
          return obj.codigo == this.cliente.codigo; // Naquela linha, vou trabalhar com a caracteristica codigo
        });

        // Remover cliente do vetor
        this.clientes.splice(posicao, 1); // Limpar uma linha

        // Visibilidade dos botões
        this.btnCadastro = true;
        this.btnExportarTxt = true;
        this.btnExportarCsv = true;

        // Visibilidade da tabela
        this.tabela = true;

        // Mensagem
        alert('Cliente removido com sucesso!')

        // Limpar formulário
        this.cliente = new Cliente();

      })
    }

    // Método para cancelar
    cancelar():void{

      // Limpar formulário
      this.cliente = new Cliente();

      // Visibilidade dos botões
      this.btnCadastro = true;
      this.btnExportarTxt = true;
      this.btnExportarCsv = true;

      // Visibilidade da tabela
      this.tabela = true;

    }

    // Método para selecionar um cliente específico
    selecionarCliente(posicao:number):void{

      // Selecionar cliente no vetor
      this.cliente = this.clientes[posicao];

      // Visibilidade dos botões
      this.btnCadastro = false;
      this.btnExportarTxt = false;
      this.btnExportarCsv = false;

      // Visibilidade da tabela
      this.tabela = false;

    }

    // Método de inicialização
    ngOnInit(){
      this.selecionar();
    }

    exportarDadosTxt(): void {
      const dadosFormatados = this.clientes.map(cliente => `${cliente.nome}, ${cliente.idade}, ${cliente.cidade}`).join('\n');
      const blob = new Blob([dadosFormatados], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'clientes.txt';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }

    exportarDadosCsv(): void {
      //Cabeçalho do arquivo csv
      let csv = 'Nome;Idade;Cidade\n'

      //Adicionando cada cliente como uma linha no csv
      this.clientes.forEach(cliente =>{
        csv += `${cliente.nome};${cliente.idade};${cliente.cidade}\n`;
      });

      //Criando blob com os dados csv
      const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});

      //Criando a URL pro Blob
      const url = window.URL.createObjectURL(blob);

      //Criando um elemento <a> pra fazer download do arquivo csv
      const a = document.createElement('a');
      a.href = url;
      a.download = 'clientes.csv';
      document.body.appendChild(a);

      //Simula o clique no link para iniciar o download do arquivo CSV
      a.click();

      //Libera o URL do Blob
      window.URL.revokeObjectURL(url);

    }

}
