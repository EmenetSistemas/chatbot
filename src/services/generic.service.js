const obtenerOpcionesFlujoPrincipal = () => {
    const opciones = [
        '    *1.* Ver planes de internet 📑',
        '    *2.* Validar mi cobertura 🌎',
        '    *3.* Conctactar con un asesor para contratar internet 🧑🏻‍💻',
        '    *4.* Realizar un pago de servicio 💵'
    ];

    const opcionesConSaltoInicial = [''].concat(opciones);

    return opcionesConSaltoInicial.join('\n');
}

module.exports = { obtenerOpcionesFlujoPrincipal };