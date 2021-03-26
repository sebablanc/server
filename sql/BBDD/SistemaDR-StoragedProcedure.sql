-- DROP FUNCTION cursosxalumno(nombrepers varchar(10), apellidopers varchar(20));
-- DROP FUNCTION alumnosxcurso(nombrecurso varchar(25));
-- DROP FUNCTION alumnosxcomision(codbuscado integer);

--------------------------------------------------------------------------
----------------------- CREACION DE FUNCIONES ----------------------------
-------------------------- login de usuario ------------------------------
--------------------------------------------------------------------------

CREATE TYPE USERDRLOGIN AS (id integer,email varchar(50),pass varchar(255),activated boolean,personaId smallint, tipo varchar(13), createdAt Date,updatedAt Date);

DROP FUNCTION IF EXISTS loginUser;

CREATE OR REPLACE FUNCTION loginUser(email varchar(50), passSended varchar(255))
RETURNS SETOF USERDRLOGIN
AS $$
	SELECT *
	FROM userdr udr
	WHERE udr.email=email AND udr.pass=encode(digest(passSended, 'sha256'), 'hex')
$$ LANGUAGE SQL;

--------------------------------------------------------------------------
----------------------- CREACION DE FUNCIONES ----------------------------
---------------------- Buscar cursos x alumnos ---------------------------
--------------------------------------------------------------------------
																		  
CREATE TYPE REGISTROCURSOSXALU AS (nrocuenta varchar(7), nombre varchar(12), apellido varchar(20), codcomision smallint, nombrecurso varchar(25));

CREATE OR REPLACE FUNCTION cursosxalumno(nombrepers varchar(10), apellidopers varchar(20))
RETURNS SETOF REGISTROCURSOSXALU
AS $$
	SELECT per.nrocuenta, per.nombre, per.apellido, com.codcomision, com.fknombre
	FROM alumnocomision as aluco
	JOIN alumno as alu ON alu.fknrocuenta=aluco.fknrocuenta
	JOIN persona as per ON per.nrocuenta=alu.fknrocuenta
	JOIN comision as com ON com.codcomision=aluco.fkcodcomision
	JOIN curso as cur ON cur.nombre=com.fknombre
	WHERE (per.nombre=nombrepers AND per.apellido=apellidopers)
	ORDER BY per.nrocuenta;
$$ LANGUAGE SQL;

-- PROBADO CON: select * from cursosxalumno('Esteban', 'Quito');

--------------------------------------------------------------------------
---------------------- Buscar alumnos x cursos ---------------------------
--------------------------------------------------------------------------

CREATE TYPE REGISTROALUXCURSO AS (nombrecurso varchar(30), codcomision smallint, nrocuenta varchar(7), nombre varchar(12), apellido varchar(20));

CREATE OR REPLACE FUNCTION alumnosxcurso(nombrecurso varchar(25))
RETURNS SETOF REGISTROALUXCURSO
AS $$
	SELECT cur.nombre, com.codcomision, per.nrocuenta, per.nombre, per.apellido
	FROM alumnocomision as aluco
	JOIN alumno as alu ON alu.fknrocuenta=aluco.fknrocuenta
	JOIN persona as per ON per.nrocuenta=alu.fknrocuenta
	JOIN comision as com ON com.codcomision=aluco.fkcodcomision
	JOIN curso as cur ON cur.nombre=com.fknombre
	WHERE cur.nombre=nombrecurso
	ORDER BY cur.nombre;
$$ LANGUAGE SQL;

-- PROBADO CON: select * from alumnosxcurso('Corel Draw');

---------------------------------------------------------------------------------
----------------------------------- CONSULTA ------------------------------------
------------------------------ Alumnos por comisión -----------------------------
---------------------------------------------------------------------------------

CREATE TYPE REGISTROALUXCOMISION AS (codcomision smallint,nombrecurso varchar(25), nrocuenta varchar(7), nombre varchar(12), apellido varchar(20));

CREATE FUNCTION alumnosxcomision(codbuscado integer)
RETURNS SETOF REGISTROALUXCOMISION
AS $$
	SELECT com.codcomision, com.fknombre, per.nrocuenta, per.nombre, per.apellido
	FROM alumnocomision as aluco
	JOIN alumno as alu ON alu.fknrocuenta=aluco.fknrocuenta
	JOIN persona as per ON per.nrocuenta=alu.fknrocuenta
	JOIN comision as com ON com.codcomision=aluco.fkcodcomision
	JOIN curso as cur ON cur.nombre=com.fknombre
	WHERE com.codcomision=codbuscado
	ORDER BY per.nrocuenta;
$$ LANGUAGE SQL;

-- PROBADO CON: select * from alumnosxcomision(9);