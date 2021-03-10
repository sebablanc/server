-- BORRANDO TABLAS;
DROP TABLE IF EXISTS persona;
DROP TABLE IF EXISTS localidad;

-- CREANDO TABLAS;
CREATE TABLE localidad(
	id smallint NOT NULL AUTO_INCREMENT,
	codPostal smallint NOT NULL,
	ciudad varchar(22) NOT NULL UNIQUE,
	provincia varchar(20),
    createdAt Date,
    updatedAt Date,
	CONSTRAINT pk_localidad PRIMARY KEY (id),
	CONSTRAINT positive_CP CHECK (codPostal > 0)
);

CREATE TABLE persona(
	id smallint NOT NULL AUTO_INCREMENT,
	nroCuenta varchar(7) NOT NULL UNIQUE,
	nombre varchar(10) NOT NULL,
	apellido varchar(20) NOT NULL,
	direccion varchar(50),
	telefono varchar(16) NOT NULL,
	celular varchar(16),
	email varchar(50),
	otroMedio varchar(50),
	localidadId smallint,
    createdAt Date,
    updatedAt Date,
	CONSTRAINT pk_persona PRIMARY KEY (id),
	CONSTRAINT fk_persLoc FOREIGN KEY (localidadId) REFERENCES localidad(id)
);

CREATE TABLE userDR(
	id smallint NOT NULL AUTO_INCREMENT,
	email varchar(50) NOT NULL UNIQUE,
	pass varchar(255) NOT NULL,
	activated boolean DEFAULT false,
	personaId smallint,
	createdAt Date,
    updatedAt Date,
	CONSTRAINT pk_user PRIMARY KEY (id),
	CONSTRAINT fk_userPers FOREIGN KEY (personaId) REFERENCES persona(id)
);