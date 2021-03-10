module.exports.ERROR_MESSAGES = {
    ER_NO_REFERENCED_ROW_2: 'La localidad seleccionada no existe en el sistema',
    ER_DUP_ENTRY: 'La información que intenta ingresar contiene datos existentes en el sistema',
    ER_NO_SUCH_TABLE: 'No existe la tabla donde se intenta ingresar los datos',
    22001: 'El valor es demasiado largo para el tipo',
    23503: 'El id foráneo no existe en la tabla principal',
    22007: 'El tipo de fecha enviado es inválido'
}

module.exports.REQUEST_METHODS_ACTION = {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    FIND: 'find',
    LOGIN: 'login'
}