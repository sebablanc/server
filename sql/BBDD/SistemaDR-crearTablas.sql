DROP USER administrador;
DROP TABLE IF EXISTS asistencia;
DROP TABLE IF EXISTS inscripcionDescuento;
DROP TABLE IF EXISTS cuota;
DROP TABLE IF EXISTS alumnocomision;
DROP TABLE IF EXISTS comision;
DROP TABLE IF EXISTS personacurso;
DROP TABLE IF EXISTS alumno;
DROP TABLE IF EXISTS userdr;
DROP TABLE IF EXISTS persona;
DROP TABLE IF EXISTS localidad;
DROP TABLE IF EXISTS descuento;
DROP TABLE IF EXISTS curso;
-----------------------------------------------------------------------------------
------------------------------- Creación de BBDD ----------------------------------
-----------------------------------------------------------------------------------

CREATE DATABASE SistemaDR
WITH ENCODING='UTF8'
	 OWNER = administrador
 	 CONNECTION LIMIT=25;

CREATE EXTENSION pgcrypto;

-----------------------------------------------------------------------------------
------------------------------ Creación de tablas ---------------------------------
-----------------------------------------------------------------------------------

CREATE TABLE localidad(
	id serial NOT NULL,
	codpostal smallint NOT NULL,
	ciudad varchar(22) NOT NULL UNIQUE,
	provincia varchar(20),
    createdAt Date,
    updatedAt Date,
	CONSTRAINT pk_localidad PRIMARY KEY (id),
	CONSTRAINT positive_CP CHECK (codpostal > 0)
);

CREATE TABLE descuento(
	id serial not null,
	razon varchar(25) NOT NULL UNIQUE,
	porcentaje smallint NOT NULL,
	createdAt Date,
    updatedAt Date,
	CONSTRAINT pk_descuento PRIMARY KEY (id),
	CONSTRAINT positive_id CHECK (id > 0),
	CONSTRAINT positive_porc CHECK (porcentaje > 0)
);

CREATE TABLE curso(
	id serial not null,
	nombre varchar(30) NOT NULL UNIQUE,
	imagen varchar(60),
	programa varchar(60),
	valor float NOT NULL,
	descripcion varchar(255),
	categoria varchar(10) NOT NULL,
	createdAt Date,
    updatedAt Date,
	CONSTRAINT pk_curso PRIMARY KEY (id),
	CONSTRAINT positive_valor CHECK (valor >= 0.0)
);

CREATE TABLE persona(
	id serial not null,
	nroCuenta varchar(7) NOT NULL UNIQUE,
	nombre varchar(10) NOT NULL,
	apellido varchar(20) NOT NULL,
	direccion varchar(50),
	telefono varchar(16) NOT NULL,
	celular varchar(16),
	email varchar(50),
	otroMedio varchar(50),
	localidadid smallint,
	dni integer NOT NULL UNIQUE,
	fechaNacimiento date,
	foto varchar(50),
	createdAt Date,
    updatedAt Date,
	CONSTRAINT pk_persona PRIMARY KEY (id),
	CONSTRAINT fk_persLoc FOREIGN KEY (localidadid) REFERENCES localidad(id)
);

CREATE TABLE userDR(
	id serial NOT NULL,
	email varchar(50) NOT NULL UNIQUE,
	pass varchar(255) NOT NULL,
	activated boolean DEFAULT false,
	personaId smallint,
	tipo varchar(13) DEFAULT 'Usuario',
	createdAt Date,
    updatedAt Date,
	CONSTRAINT pk_user PRIMARY KEY (id),
	CONSTRAINT fk_userPers FOREIGN KEY (personaId) REFERENCES persona(id)
);

CREATE TABLE comision(
	id serial NOT NULL,
	cursoId smallint NOT NULL,
	dias varchar(20),
	horaDesde time,
	horaHasta time,
	fechaInicio date,
	fechaFin date,
	createdAt Date,
    updatedAt Date,
	CONSTRAINT pk_comision PRIMARY KEY (id),
	CONSTRAINT fk_comCurso FOREIGN KEY (cursoId) REFERENCES curso(id)
);

CREATE TABLE personaComision(
	id serial NOT NULL,
	fechaInscripcion date NOT NULL DEFAULT CURRENT_DATE,
	personaId smallint NOT NULL,
	comisionId smallint NOT NULL,
	createdAt Date,
    updatedAt Date,
	CONSTRAINT pk_personaComision PRIMARY KEY (id),
	CONSTRAINT fk_personaPersCom FOREIGN KEY (personaId) REFERENCES persona(id),
	CONSTRAINT fk_AluComComision FOREIGN KEY (comisionId) REFERENCES comision(id)
);


CREATE TABLE cuota(
	id serial NOT NULL,
	personaComisionId smallint NOT NULL,
	pagado boolean DEFAULT false,
	nroCuota smallint,
	fechaVenc date,
	fechaPago date DEFAULT CURRENT_DATE,
	createdAt Date,
    updatedAt Date,
	CONSTRAINT pk_cuota PRIMARY KEY (id),
	CONSTRAINT fk_cuotaPersCom FOREIGN KEY (personaComisionId) REFERENCES personaComision(id),
	CONSTRAINT positive_nroCuota CHECK (nroCuota > 0)
);

CREATE TABLE inscripcionDescuento(
	id serial NOT NULL,
	comisionId smallint NOT NULL,
	descuentoId smallint NOT NULL,
	createdAt Date,
    updatedAt Date,
	CONSTRAINT pk_inscDesc PRIMARY KEY (id),
	CONSTRAINT fk_cuotaPersCom FOREIGN KEY (comisionId) REFERENCES personaComision(id),
	CONSTRAINT fk_inscDescDescuento FOREIGN KEY (descuentoId) REFERENCES descuento(id)
);

CREATE TABLE asistencia(
	id serial NOT NULL,
	personaComisionId smallint NOT NULL,
	fechaClase date,
	asiste boolean,
	createdAt Date,
    updatedAt Date,
	CONSTRAINT pk_asistencia PRIMARY KEY (id),
	CONSTRAINT fk_asistPersonaComision FOREIGN KEY (personacomisionId) REFERENCES personacomision(id)
);

CREATE TABLE personaCurso(
	id serial NOT NULL,
	fechaCons date NOT NULL DEFAULT CURRENT_DATE,
	cursoId smallint NOT NULL,
	personaId smallint NOT NULL,
	observacion varchar(255),
	color varchar(8),
	createdAt Date,
    updatedAt Date,
	CONSTRAINT pk_personaCurso PRIMARY KEY (id),
	CONSTRAINT fk_persCursoCurso FOREIGN KEY (cursoId) REFERENCES curso(id),
	CONSTRAINT fk_persAlu FOREIGN KEY (personaId) REFERENCES persona(id)
);

-----------------------------------------------------------------------------------
----------------------------- Creación de controles -------------------------------
-----------------------------------------------------------------------------------


-----------------------------------------------------------------------------------
------------------------------ Validando localidad --------------------------------
-----------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION func_validar_localidad() RETURNS TRIGGER AS $funcemp$
BEGIN
IF(NEW.codpostal<=0)THEN
	RAISE EXCEPTION 'Debe rellenar el campo código postal con un valor positivo.';
END IF;
IF(NEW.ciudad='')THEN
	RAISE EXCEPTION 'Debe rellenar el campo ciudad.';
END IF;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

-- Habilitar para PGAdmin3
--CREATE TRIGGER verificar_carga_localidad
--BEFORE INSERT OR UPDATE ON localidad
--FOR EACH ROW EXECUTE PROCEDURE func_validar_localidad();

-- Habilitar para PGAdmin4
CREATE TRIGGER verificar_carga_localidad
BEFORE INSERT OR UPDATE ON localidad
FOR EACH ROW EXECUTE FUNCTION func_validar_localidad();

-----------------------------------------------------------------------------------
------------------------------ Validando descuento --------------------------------
-----------------------------------------------------------------------------------

-- Habilitar para PGAdmin4
CREATE OR REPLACE FUNCTION func_validar_descuento() RETURNS TRIGGER AS $funcemp$
BEGIN
IF(NEW.razon='' OR NEW.razon is NULL)THEN
	RAISE EXCEPTION 'Debe proporcionar el motivo/razón del descuento.';
END IF;
IF(NEW.porcentaje<=0  OR NEW.porcentaje is NULL)THEN
	RAISE EXCEPTION 'Debe proporcionar una valor correspondiente al porcentaje del descuento.';
END IF;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

-- Habilitar para PGAdmin3
-- CREATE TRIGGER verificar_carga_descuento
-- BEFORE INSERT OR UPDATE ON descuento
-- FOR EACH ROW EXECUTE PROCEDURE func_validar_descuento();

CREATE TRIGGER verificar_carga_descuento
BEFORE INSERT OR UPDATE ON descuento
FOR EACH ROW EXECUTE FUNCTION func_validar_descuento();

-----------------------------------------------------------------------------------
-------------------------------- Validando curso ----------------------------------
-----------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION func_validar_curso() RETURNS TRIGGER AS $funcemp$
BEGIN
IF(NEW.nombre='' OR NEW.nombre is NULL)THEN
	RAISE EXCEPTION 'Debe proporcionar un nombre para el curso.';
END IF;
IF(NEW.valor<=0  OR NEW.valor is NULL)THEN
	RAISE EXCEPTION 'Debe proporcionar un valor mayor a 0 para el curso.';
END IF;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

-- Habilitar para PGAdmin3
-- CREATE TRIGGER verificar_carga_curso
-- BEFORE INSERT OR UPDATE ON curso
-- FOR EACH ROW EXECUTE PROCEDURE func_validar_curso();

-- Habilitar para PGAdmin4
CREATE TRIGGER verificar_carga_curso
BEFORE INSERT OR UPDATE ON curso
FOR EACH ROW EXECUTE FUNCTION func_validar_curso();

-----------------------------------------------------------------------------------
------------------------------- Validando persona ---------------------------------
-----------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION func_validar_persona() RETURNS TRIGGER AS $funcemp$
BEGIN
IF(NEW.nroCuenta='' OR NEW.nroCuenta is NULL)THEN
	RAISE EXCEPTION 'Debe proporcionar un numero de cuenta para la persona.';
END IF;
IF(NEW.nombre='' OR NEW.nombre is NULL)THEN
	RAISE EXCEPTION 'Debe proporcionar un nombre para la persona.';
END IF;
IF(NEW.apellido='' OR NEW.apellido is NULL)THEN
	RAISE EXCEPTION 'Debe proporcionar un apellido para la persona.';
END IF;
IF(NEW.telefono='' OR NEW.telefono is NULL)THEN
	RAISE EXCEPTION 'Debe proporcionar un teléfono para la persona.';
END IF;
IF(NEW.dni='' OR NEW.dni is NULL)THEN
	RAISE EXCEPTION 'Debe proporcionar un DNI para la persona.';
END IF;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

-- Habilitar para PGAdmin3
-- CREATE TRIGGER verificar_carga_persona
-- BEFORE INSERT OR UPDATE ON persona
-- FOR EACH ROW EXECUTE PROCEDURE func_validar_pers();

-- Habilitar para PGAdmin4
CREATE TRIGGER verificar_carga_persona
BEFORE INSERT OR UPDATE ON persona
FOR EACH ROW EXECUTE FUNCTION func_validar_persona();

-----------------------------------------------------------------------------------
------------------------------- Validando userDR ---------------------------------
-----------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION fun_validar_userdr() RETURNS TRIGGER AS $funcemp$
BEGIN
IF(NEW.email='' OR NEW.email is NULL)THEN
	RAISE EXCEPTION 'Debe proporcionar un número de cuenta.';
END IF;
IF(NEW.pass='' OR NEW.pass is NULL)THEN
	RAISE EXCEPTION 'Debe proporcionar una contraseña.';
ELSIF (OLD.pass=NEW.pass) THEN
	NEW.pass := NEW.pass;
ELSE
	NEW.pass := encode(digest(NEW.pass, 'sha256'), 'hex');
END IF;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

-- Habilitar para PGAdmin3
-- CREATE TRIGGER verificar_carga_userdr
-- BEFORE INSERT OR UPDATE ON userdr
-- FOR EACH ROW EXECUTE PROCEDURE fun_validar_userdr();

-- Habilitar para PGAdmin4
CREATE TRIGGER verificar_carga_userdr
BEFORE INSERT OR UPDATE ON userdr
FOR EACH ROW EXECUTE FUNCTION fun_validar_userdr();


-----------------------------------------------------------------------------------
------------------------------ Validando comision ---------------------------------
-----------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION func_validar_comision() RETURNS TRIGGER AS $funcemp$
BEGIN
IF(NEW.cursoId<0 OR NEW.cursoId is NULL)THEN
	RAISE EXCEPTION 'Seleccione el nombre del curso.';
END IF;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

-- Habilitar para PGAdmin3
-- CREATE TRIGGER verificar_carga_comision
-- BEFORE INSERT OR UPDATE ON comision
-- FOR EACH ROW EXECUTE PROCEDURE func_validar_comision();

-- Habilitar para PGAdmin4
CREATE TRIGGER verificar_carga_comision
BEFORE INSERT OR UPDATE ON comision
FOR EACH ROW EXECUTE FUNCTION func_validar_comision();

-----------------------------------------------------------------------------------
--------------------------- Validando personaComision ------------------------------
-----------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION func_validar_aluCom() RETURNS TRIGGER AS $funcemp$
BEGIN
IF(NEW.fechaInscripcion is NULL)THEN
	RAISE EXCEPTION 'Debe ingresar una fecha de inscripción.';
END IF;
IF(NEW.personaId<=0 OR NEW.personaId is NULL)THEN
	RAISE EXCEPTION 'Seleccione un persona.';
END IF;
IF(NEW.comisionId<=0 OR NEW.comisionId is NULL)THEN
	RAISE EXCEPTION 'Seleccione una comision.';
END IF;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

-- Habilitar para PGAdmin3
-- CREATE TRIGGER verificar_carga_personaComision
-- BEFORE INSERT OR UPDATE ON personacomision
-- FOR EACH ROW EXECUTE PROCEDURE func_validar_aluCom();

-- Habilitar para PGAdmin4
CREATE TRIGGER verificar_carga_personaComision
BEFORE INSERT OR UPDATE ON personacomision
FOR EACH ROW EXECUTE FUNCTION func_validar_aluCom();

-----------------------------------------------------------------------------------
-------------------------------- Validando cuota ----------------------------------
-----------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION func_validar_cuota() RETURNS TRIGGER AS $funcemp$
BEGIN
IF(NEW.personaComisionId<=0 OR NEW.personaComisionId is NULL)THEN
	RAISE EXCEPTION 'Seleccione una comision.';
END IF;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;


-- Habilitar para PGAdmin3
-- CREATE TRIGGER verificar_carga_cuota
-- BEFORE INSERT OR UPDATE ON cuota
-- FOR EACH ROW EXECUTE PROCEDURE func_validar_cuota();

-- Habilitar para PGAdmin4
CREATE TRIGGER verificar_carga_cuota
BEFORE INSERT OR UPDATE ON cuota
FOR EACH ROW EXECUTE FUNCTION func_validar_cuota();

-----------------------------------------------------------------------------------
------------------------ Validando inscripcionDescuento ---------------------------
-----------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION func_validar_inscdesc() RETURNS TRIGGER AS $funcemp$
BEGIN
IF(NEW.comisionId<=0 OR NEW.comisionId is NULL)THEN
	RAISE EXCEPTION 'Seleccione una comision.';
END IF;
IF(NEW.descuentoId<=0 OR NEW.descuentoId is NULL)THEN
	RAISE EXCEPTION 'Seleccione un descuento.';
END IF;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

-- Habilitar para PGAdmin3
-- CREATE TRIGGER verificar_carga_inscdesc
-- BEFORE INSERT OR UPDATE ON inscripcionDescuento
-- FOR EACH ROW EXECUTE PROCEDURE func_validar_inscdesc();

-- Habilitar para PGAdmin4
CREATE TRIGGER verificar_carga_inscdesc
BEFORE INSERT OR UPDATE ON inscripcionDescuento
FOR EACH ROW EXECUTE FUNCTION func_validar_inscdesc();

-----------------------------------------------------------------------------------
----------------------------- Validando asistencia --------------------------------
-----------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION func_validar_asistencia() RETURNS TRIGGER AS $funcemp$
BEGIN
IF(NEW.personacomisionId<=0 OR NEW.personacomisionId is NULL)THEN
	RAISE EXCEPTION 'Seleccione un persona.';
END IF;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

-- Habilitar para PGAdmin3
--CREATE TRIGGER verificar_carga_asistencia
--BEFORE INSERT OR UPDATE ON asistencia
--FOR EACH ROW EXECUTE PROCEDURE func_validar_asistencia();

-- Habilitar para PGAdmin4
CREATE TRIGGER verificar_carga_asistencia
BEFORE INSERT OR UPDATE ON asistencia
FOR EACH ROW EXECUTE FUNCTION func_validar_asistencia();

-----------------------------------------------------------------------------------
---------------------------- Validando personaCurso -------------------------------
-----------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION func_validar_persCurso() RETURNS TRIGGER AS $funcemp$
BEGIN
IF(NEW.fechaCons is NULL)THEN
	RAISE EXCEPTION 'Debe seleccionar una fecha.';
END IF;
IF(NEW.cursoId<=0 OR NEW.cursoId IS NULL)THEN
	RAISE EXCEPTION 'Seleccione el nombre del curso.';
END IF;
IF(NEW.personaId<=0 OR NEW.personaId IS NULL)THEN
	RAISE EXCEPTION 'Seleccione una persona.';
END IF;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

-- Habilitar para PGAdmin3
-- CREATE TRIGGER verificar_carga_personaCurso
-- BEFORE INSERT OR UPDATE ON personaCurso
-- FOR EACH ROW EXECUTE PROCEDURE func_validar_persCurso();

-- Habilitar para PGAdmin4
CREATE TRIGGER verificar_carga_personaCurso
BEFORE INSERT OR UPDATE ON personaCurso
FOR EACH ROW EXECUTE FUNCTION func_validar_persCurso();

-----------------------------------------------------------------------------------
------------------------------ Creación de usuarios -------------------------------
-----------------------------------------------------------------------------------

CREATE USER administrador PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE SistemaDR TO administrador;

COMMIT;