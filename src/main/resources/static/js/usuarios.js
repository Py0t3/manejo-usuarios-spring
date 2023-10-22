// Call the dataTables jQuery plugin
$(document).ready(function() {

    cargarUsuarios();
  $('#usuarios').DataTable();
});


async function cargarUsuarios(){

    const request = await fetch("api/usuarios",{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const usuarios = await request.json();
    console.log(usuarios);

    let listadoHtml = '';
    for(let usuario of usuarios){

        let telefono = usuario.telefono == null? "-" : usuario.telefono;
        let usuarioHtml =  '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre+ ' ' + usuario.apellido +
                           '</td><td>' + usuario.email + '</td><td> ' + telefono +
                           ' </td><td><a href="#" onClick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a></td></tr>';
        listadoHtml += usuarioHtml;
    }



    document.querySelector('#usuarios tbody').outerHTML = listadoHtml;
}

async function eliminarUsuario(id){

    if(!confirm('¿Deseas eliminar este usuario?')){
        return;
    }else{

        const request = await fetch('api/usuarios/' + id,{
              method: 'DELETE',
              headers: {
                  'Accept': 'application/json',
                  'Contnet-Type': 'application/json'
              }
          });
          location.reload();
    }
}