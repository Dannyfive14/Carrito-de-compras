//Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventlisteners();

function cargarEventlisteners(){
    //Cuando agregas un curso presionando en agregar al carrito
    listaCursos.addEventListener('click', agregarCurso)

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito =[];//reseteamos el arreglo

        limpiarHTML();//Eliminar todo el HTML
    })
}

//Funciones

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

//Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }else{

    }
}

//Lee el copntenido HTML

function leerDatosCurso (curso){
    // console.log(curso);

    //Crear un objeto
    const infoCurso = {
        imagen: curso.querySelector('img').src ,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //revisa si un elemento ya esta en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    
    if(existe){
        const cursos = articulosCarrito.map( curso => {
            
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        
        articulosCarrito = [...cursos];
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }



    //Agrega elementos al arreglo de carrito
    
    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el carrito de compras en HTML

function carritoHTML(){

    //Limpiar HTML
    limpiarHTML();

    //recorre el carrito y genera el HTL
    
    articulosCarrito.forEach(curso =>{
        const { imagen, titulo, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `

            <td>  
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a> 
            </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })

    
}

//eliminar cursos

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
