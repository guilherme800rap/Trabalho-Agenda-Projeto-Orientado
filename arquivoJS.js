  
		var bancoDeDados = openDatabase('agendaTelefonica','1.0','BD para projeto Orientado',1024*10248*2);
		bancoDeDados.transaction(function(tx){
			tx.executeSql('create table if not exists agendas(id INTEGER not null primary key AUTOINCREMENT, nome VARCHAR not null,  telefoneResidencial VARCHAR not null,  telefoneCelular VARCHAR not null,  email VARCHAR not null, redeSocial VARCHAR not null)');
		})

	/**
	 * Esta Função registra um usuário no banco de dados
	 * @param {String} dados 	Vetor de Strings que receberá os dados enviados pelo usuário
	 */
	function inserirDados(dados){
        bancoDeDados.transaction(function(tx){
        	tx.executeSql('insert into agendas(nome, telefoneResidencial, telefoneCelular, email, redeSocial) values(?,?,?,?,?)',dados, 
        		function(resultado){
               		alert('O usuário foi cadastrado com sucesso!!');
        		},
        		function(erro){
        			alert('ERROR');
        	})
        });
	}

	/**
	 * Função que pega os dados do usuário e mostra na página de visualização
	 * @param {} 
	 */
	function pegarDados(){
		bancoDeDados.transaction(function(tx){
			tx.executeSql('SELECT * FROM agendas',[],
			function(tx,resultado){
              var tamanho = resultado.rows.length;
                       var i;
                       var texto;
                       for(i = 0; i < tamanho; i++ ){
                        texto = '<div class="vers">Nome: <span class="dadosDoUsuario">'+resultado.rows.item(i).nome+
                        '</span>Telefone Residencial: <span class="dadosDoUsuario">'+resultado.rows.item(i).telefoneResidencial+'</span>Telefone Celular: <span class="dadosDoUsuario">'+resultado.rows.item(i).telefoneCelular + '</span>Email:  <span class="dadosDoUsuario">'+resultado.rows.item(i).email +'</span>Rede Social: <span class="dadosDoUsuario">'+resultado.rows.item(i).redeSocial+ '</span></div>';
                        document.querySelector("#registros").innerHTML += texto; 

                       } 
			},
			function(erro) {
				console.log("erro ao listar agendas");
			})
		});

	}
	/**
	 * Função que pega os novos dados inseridos pelo usuário
	 * @param {} 
	 */
	function novosDados(){	
    
		let html = `
			 <input id="nome" type="text" placeholder="Nome" />
			 <input id="telefoneResidencial" type="text" placeholder="Telefone Residencial" />
			 <input id="telefoneCelular" type="text" placeholder="Telefone Celular" />
			 <input id="email" type="text" placeholder="Email" />
			 <input id="redeSocial" type="text" placeholder="Rede Social" />
			 <br>
			 <button  id="btn-enviar-alteracao" type="submit">Salvar alterações</button>

		`;
		document.querySelector("#registros").innerHTML = html;

		$("#btn-enviar-alteracao").click(function(){
			let nome2 = $('#nome').val();
			let telefoneResidencial2 = $('#telefoneResidencial').val();
			let telefoneCelular2 = $('#telefoneCelular').val();
			let email2 = $('#email').val();
			let redeSocial2 = $('#redeSocial').val();
			let pesquisaNome = $('#pesquisaNome').val();
			let nome = pesquisaNome;
			alteraAgenda(nome,nome2,telefoneResidencial2,telefoneCelular2,email2,redeSocial2);
		});


}	
	/**
	 * Pega os novos dados inseridos pelo usuário e altera no banco de dados
	 * @param {String} nome Mudará o banco de dados de acordo com o nome passado pelo usuário
	 */

	function editaDados(nome){
		try{
			bancoDeDados.transaction(function(tx){
			tx.executeSql('SELECT * FROM agendas WHERE nome = ?',[nome],
			function(tx,resultado){
             	 var tamanho = resultado.rows.length;
                    var i;
                    var texto;
                    for(i = 0; i < tamanho; i++ ){
                       	item = resultado.rows.item(i);
	                    texto = '<div class="dadosUsuario"><div class="item">Nome:'+ item['nome'] +'</div>'+
	                    '<div class="item">Telefone Residencial: '+item['telefoneResidencial'] +'</div>'+
	                    '<div class="item">Telefone Celular:  '+ item['telefoneCelular']+ '</div>'+
						'<div class="item">Email:'+item['email'] +'</div>'+
						'<div class="item">Rede Social:'+ item['redeSocial']+ '</div></div>' +
						'<br><br><br> <a id="excluir-Agendas" href="#" onClick="excluirAgendas('+item['id']+')"> Excluir Agenda </a> <br>'+
						'<button id="btn-mostra-alteracao" onclick="novosDados()" type="submit">Fazer alteração</button>';
	                    document.querySelector("#local-Recebe-Novos").innerHTML = texto;
                    }                
			},
			)
			
		});
		}catch(erro){alert(erro)}
	}

   
	/**
	 * Pega os novos dados inseridos pelo usuário e altera no banco de dados
	 * @param {String} dados Alterará a agenda com os novos dados passados
	 */

	function alteraAgenda(nome,nome2,telefoneResidencial2,telefoneCelular2,email2,redeSocial2){
    	bancoDeDados.transaction(function(tx){
    		tx.executeSql('UPDATE agendas SET nome = ?, telefoneResidencial = ?, telefoneCelular = ?, email = ?, redeSocial = ? WHERE nome = ?',[nome2,telefoneResidencial2,telefoneCelular2,email2,redeSocial2, nome],
    			function(tx,resultado){
    				alert('Agenda alterada!!!');
    			},
    			function(erro){
    				console.log("Erro, tente novamente");
    			});

    	})
    }
	/**
	 * Função que excluirá a agenda do usuário
	 * @param {number} id Excluirá a agenda de acordo com o id que será pego na função edita dados
	 */
    function excluirAgendas(id){
        bancoDeDados.transaction(function(tx){

            tx.executeSql('DELETE FROM agendas WHERE id = ? ',[id],
            function(tx,resultado){
          		alert('Agenda excluida !!!');                           
            },
            function(erro) {
                console.log("Erro ao deletar agendas, tente novamente");
            });
        });

    }

 


