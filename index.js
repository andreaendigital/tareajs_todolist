document.addEventListener('DOMContentLoaded', () => {
    renderTareas();
});


//3 tareas iniciales
const tareas = [
    { id: 1, nombre: 'Colaciones para el día siguiente', realizada: false },
    { id: 2, nombre: 'Revisar tareas para el colegio', realizada: false },
    { id: 3, nombre: 'Arreglar uniformes', realizada: true }
];

let contadorTareas = 3;

const agregarTarea = () => {
    event.preventDefault();
    const inputNuevaTarea = document.getElementById('inputNuevaTarea');
    const nombreTarea = inputNuevaTarea.value.trim();

    if (!nombreTarea) {
        alert('Por favor, ingrese un nombre para la tarea.');
        return;
    }

    const nuevaTarea = {
        // id: tareas.length + 1,
        id: ++contadorTareas,
        nombre: nombreTarea,
        realizada: false
    };

    tareas.push(nuevaTarea);
    inputNuevaTarea.value = '';
    renderTareas();
};

const renderTareas = () => {
    const contenedorTareas = document.getElementById('listaTareas');
    contenedorTareas.innerHTML = '';
    // Agregar fila de encabezado
    const encabezado = document.createElement('div');
    encabezado.classList.add('row', 'fw-bold', 'text-start', 'mb-2');
    encabezado.innerHTML = `
        <div class="col">ID</div>
        <div class="col">Nombre</div>
        <div class="col">Realizada</div>
        <div class="col">Eliminar</div>
    `;
    contenedorTareas.appendChild(encabezado);
    // Iterar sobre las tareas y agregar cada tarea como una fila
    tareas.forEach(tarea => {
        const tareaElemento = document.createElement('div');
        tareaElemento.classList.add('row');
        tareaElemento.innerHTML = `
            <div class="col">${tarea.id}</div>
            <div class="col">${tarea.nombre}</div>
            <div class="col">
                <input type="checkbox" ${tarea.realizada ? 'checked' : ''} onchange="toggleRealizada(${tarea.id})">
            </div>
            <div class="col">
                <div style="cursor: pointer;" onclick="eliminarTarea(${tarea.id})">❌</div>
            </div>
        `;
        contenedorTareas.appendChild(tareaElemento);
    });

    actualizarContadores();
};

const toggleRealizada = (id) => {
    const tarea = tareas.find(t => t.id === id);
    tarea.realizada = !tarea.realizada;
    renderTareas();
};

const eliminarTarea = (id) => {
    const index = tareas.findIndex(t => t.id === id);
    tareas.splice(index, 1);
    renderTareas();
};

const actualizarContadores = () => {
    const totalTareas = tareas.length;
    const totalTareasRealizadas = tareas.filter(t => t.realizada).length;
    document.getElementById('totalTareas').textContent = `Total: ${totalTareas}`;
    document.getElementById('totalTareasRealizadas').textContent = `Realizadas: ${totalTareasRealizadas}`;
};