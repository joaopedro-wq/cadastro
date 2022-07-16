class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    
    salvar (){
        let produto = this.lerdados();
        
        if(this.validacao(produto) == true){
            if(this.editId == null){

                this.adicionar(produto);
            }else{
                this.atualizacao(this.editId, produto);
            }
        }
        
        this.printarTable();
        this.cancelar();
    }

    //retorna o campo digitado como um OBJETO
    lerdados(){
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto =  document.getElementById('nameProduto').value;
        produto.preco = document.getElementById('preco').value;

        return produto;

    }

    // Valida o campo digitado para saber seu estado completo ou incompleto
    validacao(produto){
        let msg = '';

       if(produto.nomeProduto == ''){
        msg += 'Campo Produto INCOMPLETO';
        alert(msg);
        
        
    }
    if(produto.preco == ''){
        msg += 'Campo preço INCOMPLETO';
        alert(msg);
        
    }
    if(msg != ''){
        
        return false;
    }
    return true;

    }
    
    // Adicionar o OBJETO produto no ARRAY
    adicionar(produto){
        produto.preco = parseFloat(produto.preco);
        this.arrayProdutos.push(produto);
        this.id+=1;

    }

    //printar tabela de produtos
    printarTable(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++){
            let tr = tbody.insertRow();

            let tdId = tr.insertCell();
            let tdname = tr.insertCell();
            let tdpreco = tr.insertCell();
            let tdacoes = tr.insertCell();

            tdId.innerText = this.arrayProdutos[i].id;
            tdname.innerText = this.arrayProdutos[i].nomeProduto;
            tdpreco.innerText = this.arrayProdutos[i].preco;

            let editImg = document.createElement('img');
            editImg.src = 'img/lapis.svg';
            editImg.setAttribute("onclick", "produto.editList("+ JSON.stringify(this.arrayProdutos[i])+ ")");
            
            let lixoImg = document.createElement('img');
            lixoImg.src = 'img/lixo.svg';
            lixoImg.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")  ");
            

            tdacoes.classList.add('cursore');
            tdacoes.appendChild(editImg);
            tdacoes.appendChild(lixoImg);


            
        }
        console.log(this.arrayProdutos); 

    }

    //RETORNAR VALORES VAZIOS
    cancelar(){
        document.getElementById('nameProduto').value = '';
        document.getElementById('preco').value = '';
        document.getElementById('botao').innerText = 'Cadastrar';
        document.getElementById('l1').innerText = 'Lista de Cadastro';

        this.editId = null;

    }

    //botao de editar e ativar o metodo de atualizacao passando os valores para do campo
    editList(array){

        this.editId = array.id;


        document.getElementById('nameProduto').value = array.nomeProduto;
        document.getElementById('preco').value = array.preco;
        document.getElementById('botao').innerText = 'Atualizar';
        document.getElementById('l1').innerText = 'Lista de Atualização';

    }

    // id e Objeto como parametro e alterar os novos valores
    atualizacao(id, produto){

        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id ){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }

    }

    deletar(id) {
    if(confirm('Deseja realmente apagar o produto ?' )){


        let tbody = document.getElementById('tbody');
    
        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
        //console.log(this.arrayProdutos);
    }

    }
    

}

var produto = new Produto();