require("dotenv").config();
const conn = require("./db/conn");
const express = require("express");

const Usuario = require("./models/Usuario");
const Cartao = require("./models/Cartao");
const Jogo = require("./models/Jogo");


const exphbs = require ("express-handlebars");

//instanciação do server
const app = express();

//vinculação do handlebars ao express:
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars")

// Middleware para analisar o corpo da solicitação
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req,res)=>{
    res.render("home")
});

app.get("/usuarios", async (req,res)=>{
    const usuarios = await Usuario.findAll({ raw: true})
    res.render("usuarios", { usuarios });

});

app.get("/usuarios/novo", (req,res)=>{
    res.render("formUsuario")
});

app.post("/usuarios/novo", async (req, res) => {
    try {
        const { nickname, nome } = req.body;
        const dadosUsuario = {
            nickname,
            nome,
        };
        const usuario = await Usuario.create(dadosUsuario);
        res.send("Usuário inserido sob o id " + usuario.id);
    } catch (error) {
        console.error("Erro ao inserir usuário:", error);
        res.status(500).send("Erro ao inserir usuário");
    }
});

app.get("/usuarios/:id/update", async (req,res)=>{
const id = parseInt(req.params.id);
const usuario = await Usuario.findByPk(id, {raw: true});

res.render("formUsuario", { usuario })
//const usuario = Usuario.findOne({
    //where: {id: id},
    //raw: true,
});


//excluir user
app.post("/usuarios/:id/delete", async (req,res)=>{
    const id = parseInt(req.params.id);
    const retorno = await Usuario.destroy({where: {id: id}});
    
    if(retorno> 0){
        res.redirect("/usuarios")
    }else{
        res.send("Erro ao deletar user :(")
    }
    });



app.post("/usuarios/:id/update", async (req, res)=> {
    const id = parseInt(req.params.id)
    const dadosUsuario = {
        nickname: req.body.nickname,
        nome: req.body.nome,
    };

    const retorno = await Usuario.update({dadosUsuario,  where: {id:id} })
    if(retorno>0){
        res.redirect("/usuarios")
    }else{
        res.send("Erro ao atualizar user :(")
    }
});

//JOGOSSS
app.get("/jogos", async (req,res)=>{
    const jogos = await Usuario.findAll({ raw: true})
    res.render("jogos", { jogos });

});

app.get("/jogos/novo", (req, res)=>{
    res.render("formJogo")
});

//INSERIR JOGOS
app.post("/jogos/novo", async (req, res) => {
    try {
        const { titulo, descricao, preco } = req.body;
        const dadosJogo = {
            titulo, 
            descricao,
            preco,
        };
        //PARA CADASTRAR DADOS DO JOGO
        const jogo = await Jogo.create(dadosJogo);
        res.send("Jogo inserido sob o id " + jogo.id);
    } catch (error) {
        console.error("Erro ao inserir jogo:", error);
        res.status(500).send("Erro ao inserir jogo");
    }
});

//ATUALIZAR Jogos
app.get("/jogos/:id/update", async (req, res)=>{
    const id = parseInt(req.params.id);
    const jogo = await Jogo.findByPk(id, {raw: true});
    
    res.render("formJogo", { jogo })
    });
    
    
    //excluir Jogos
    app.post("/jogos/:id/delete", async (req,res)=>{
        const id = parseInt(req.params.id);
        const retorno = await Jogo.destroy({where: {id: id}});
        
        if(retorno> 0){
            res.redirect("/jogos")
        }else{
            res.send("Erro ao deletar jogo :(")
        }
        });
    
    
    
    app.post("/jogos/:id/update", async (req, res)=> {
        const id = parseInt(req.params.id)
        const dadosJogo = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            preco: req.body.preco,
        };
    
        const retorno = await Jogo.update({dadosJogo,  where: {id:id} })
        if(retorno>0){
            res.redirect("/jogos");
        }else{
            res.send("Erro ao atualizar jogos :(")
        }
    });
    
//ROTAS PARA CARTÕES

//VER CARTÕES
app.get("/usuarios/:id/cartoes", async (req, res)=>{
    const id = parseInt(req.params.id);
    const usuario = await Usuario.findByPk(id, {raw: true});

    res.render("cartoes.handlebars", { usuario });
    });

    //FORMULARIO DE CARTÕES
    app.get("/usuarios/:id/novoCartao", async (req, res)=>{
        const id = parseInt(req.params.id);
        const usuario = await Usuario.findByPk(id, {raw: true});
    
        res.render("formCartao", {usuario})
    }
    )

    //CADASTRO DE CARTAO 
    app.post("/usuarios/:id/novoCartao", async (req, res)=>{
        const dadosCartao = {
            numero: req.body.numero,
            nome: req.body.nome,
            codigoSeguranca: req.body.codigoSeguranca,
            usuarioId: id,
        };

       await Cartao.create(dadosCartao)

       res.redirect(`/usuarios/${id}/cartoes`);
    });


app.listen(8000, () => {
    console.log("Servidor está ouvindo na porta 8000");
});

conn
    .sync()
    .then(() => {
        console.log("Conectado e sincronizado ao banco de dados com sucesso!");
    })
    .catch(err => {
        console.error("Ocorreu um erro ao conectar/sincronizar o banco de dados:", err);
    });