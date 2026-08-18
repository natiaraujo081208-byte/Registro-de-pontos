function atualizar(){
    const horario = new Date();
    document.getElementById("data").innerHTML = "Data: " + horario.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric"}
    );
    document.getElementById("hora").innerHTML = "Hora: " + horario.toLocaleTimeString("pt-BR");
    
    document.getElementById("hora").innerHTML = "Hora: " + horario.toLocaleTimeString("pt-BR");
    const diaSemana = horario.toLocaleDateString("pt-BR", { 
        weekday: "long" 
    });

    //Primeira letra maiúscula
    const diaFormatado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
    document.getElementById("dia").innerHTML = diaFormatado;

    //Desafio:
    //Adicionar uma mensagem de saudação
    //Bom dia, Boa tarde, Boa noite
    //usar o if
    document.getElementById("saudacao").innerHTML = saudacao();
    function saudacao(){
        const hora = horario.getHours();
        if(hora > 6){
            return "bonjour";
        }
        else if(hora > 12){
            return "bon après-midi";
        } 
        else if(hora > 18){
            return "bonne nuit";
        }
    }
}

//Usando a câmera no js
let streamCamera;
async function abrirCamera() {
    try{
        streamCamera = await navigator.mediaDevices.getUserMedia(
            {video: true,});
        document.getElementById("camera").srcObject = streamCamera;
    }catch(erro){
        alert("Autorize a sua câmera.");
        console.log(erro);
    }
}
function fecharCamera() {
    if(streamCamera){
        streamCamera.getTracks().forEach(track=>{
            track.stop();
        });
    }

}
//Aqui captura da foto
function capturarFoto() {
    const imagem = document.getElementById("camera");
    const canvas = document.getElementById("foto");
    const contexto = canvas.getContext("2d");
    contexto.drawImage(
        imagem,
        0,
        0,
        canvas.width,
        canvas.height,
    )
}

//registro do ponto no localStorage
function registrarPonto() {
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipoRegistro").value;
    if (nome ===""){
        alert("insira seu nome.");
        return;
    }
    capturarFoto();
    const agora = new Date();
    const dataRegistro = agora.toLocaleDateString("pt-BR");
    const horaRegistro = agora.toLocaleTimeString("pt-BR"); 
    //trasformar o canvas em texto
    const canvas = document.getElementById("foto");
    const foto = canvas.toDataURL("image/png");
    const registro = {
        nome: nome,
        tipo: tipo,
        data: dataRegistro,
        hora: horaRegistro,
        foto: foto
    };

    

    const registros = JSON.stringify(registro);
    localStorage.setItem("ultimoRegistro", registros);
    document.getElementById("mensagemRegistro").innerHTML = tipo + " Registrada com sucesso!!!";
    mostrarRegistro(registro)
};

  function mostrarRegistro(registro){ 
        document.getElementById("ultimoNome").innerHTML = "Nome: " + registro.nome;
        document.getElementById("ultimoTipo").innerHTML = "Tipo: " + registro.tipo;
        document.getElementById("ultimaData").innerHTML = "Data: " + registro.data;
        document.getElementById("ultimaHora").innerHTML = "Hora: " + registro.hora;
        document.getElementById("ultimaFoto").src = registro.foto;      
  }
