-----------------------------------------------------------------------------------
--*                                                                            * --
--*                            INSERCIÓN EN TABLAS                             * --
--*                                                                            * --
-----------------------------------------------------------------------------------

-----------------------------------------------------------------------------------
------------------------------- Probando localidad --------------------------------
-----------------------------------------------------------------------------------

INSERT INTO localidad (codpostal, ciudad, provincia) VALUES (NULL, '', 'Entre Ríos'); -- Error de codPostal null
INSERT INTO localidad (codpostal, ciudad, provincia) VALUES (3248, '', 'Entre Ríos'); -- Error de nombre vacío
INSERT INTO localidad (codpostal, ciudad, provincia) VALUES (3248, 'Santa Anita', ''); -- Query OK

-----------------------------------------------------------------------------------
-------------------------------- Probando persona ---------------------------------
-----------------------------------------------------------------------------------

INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES (NULL, NULL, NULL, 'Calle 318', NULL, '', 'roqui@outlook.es', 'twitter.com/roqui', 3260); -- Error debido a nroCuenta null
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('', NULL, NULL, 'Calle 318', NULL, '', 'roqui@outlook.es', 'twitter.com/roqui', 3260); -- Error debido a nroCuenta vacía
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('20-3432', NULL, NULL, 'Calle 318', NULL, '', 'roqui@outlook.es', 'twitter.com/roqui', 3260); -- Error debido a nombre null
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('20-3432', '', NULL, 'Calle 318', NULL, '', 'roqui@outlook.es', 'twitter.com/roqui', 3260); -- Error debido a nombre vacío
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('20-3432', 'Rodrigo', NULL, 'Calle 318', NULL, '', 'roqui@outlook.es', 'twitter.com/roqui', 3260); -- Error debido a apellido null
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('20-3432', 'Rodrigo', '', 'Calle 318', NULL, '', 'roqui@outlook.es', 'twitter.com/roqui', 3260); -- Error debido a apellido vacío
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('20-3432', 'Rodrigo', 'Quintana', 'Calle 318', NULL, '', 'roqui@outlook.es', 'twitter.com/roqui', 3260); -- Error debido a teléfono null
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('20-3432', 'Rodrigo', 'Quintana', 'Calle 318', '', '', 'roqui@outlook.es', 'twitter.com/roqui', 3260); -- Error debido a teléfono vacío
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('20-3432', 'Rodrigo', 'Quintana', 'Calle 318', '03442-435622', '', 'roqui@outlook.es', 'twitter.com/roqui', 3260); --Query OK

-----------------------------------------------------------------------------------
--------------------------------- Probando alumno ---------------------------------
-----------------------------------------------------------------------------------

INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES (NULL, NULL, '19/08/1990', 'rutaFoto'); -- Error debido a nroCuenta null
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('', NULL, '19/08/1990', 'rutaFoto'); -- Error debido a nroCuenta vacío
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('20-3432', NULL, '19/08/1990', 'rutaFoto'); -- Error debido a dni null
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('20-3432', '', '19/08/1990', 'rutaFoto'); -- Error debido a dni vacío
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('20-3432', '1234', '19/08/1990', 'rutaFoto'); -- Error debido a longitud dni menor a la esperada
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('20-3432', '1234654987123', '19/08/1990', 'rutaFoto'); -- Error debido a longitud dni mayor a la esperada
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('20-3432', '35.123.456', '19/08/1990', 'rutaFoto'); --Query OK

-----------------------------------------------------------------------------------
---------------------------------- Probando curso ---------------------------------
-----------------------------------------------------------------------------------

INSERT INTO curso (nombre, imagen, programa, valor) VALUES (NULL, 'rutaImagen', 'rutaPrograma', NULL); -- Error por nombre de curso nulo
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('', 'rutaImagen', 'rutaPrograma', NULL); -- Error por nombre de curso vacío
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Programación Avanzada', 'rutaImagen', 'rutaPrograma', NULL); -- Error por valor de curso nulo
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Programación Avanzada', 'rutaImagen', 'rutaPrograma', 0); -- Error por valor de curso = 0
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Programación Avanzada', 'rutaImagen', 'rutaPrograma', -10); -- Error por valor de curso < 0
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Programación Avanzada', 'rutaImagen', 'rutaPrograma', 1800); --Query OK

-----------------------------------------------------------------------------------
-------------------------------- Probando descuento -------------------------------
-----------------------------------------------------------------------------------

INSERT INTO descuento (iddescuento, razon, porcentaje, seleccion) VALUES (NULL, NULL, NULL, false); -- Error id nulo
INSERT INTO descuento (iddescuento, razon, porcentaje, seleccion) VALUES (0, NULL, NULL, false); -- Error id = 0
INSERT INTO descuento (iddescuento, razon, porcentaje, seleccion) VALUES (-10, NULL, NULL, false); -- Error id < 0
INSERT INTO descuento (iddescuento, razon, porcentaje, seleccion) VALUES (4, NULL, NULL, false); -- Error razón nula
INSERT INTO descuento (iddescuento, razon, porcentaje, seleccion) VALUES (4, '', NULL, false); -- Error razón vacía
INSERT INTO descuento (iddescuento, razon, porcentaje, seleccion) VALUES (4, 'Promoción', NULL, false); -- Error porcentaje nulo
INSERT INTO descuento (iddescuento, razon, porcentaje, seleccion) VALUES (4, 'Promoción', 0, false); -- Error porcentaje = 0
INSERT INTO descuento (iddescuento, razon, porcentaje, seleccion) VALUES (4, 'Promoción', -10, false); -- Error porcentaje < 0
INSERT INTO descuento (iddescuento, razon, porcentaje, seleccion) VALUES (4, 'Promoción', 25, false); -- Query OK


-----------------------------------------------------------------------------------
--------------------------------- Probando comisión -------------------------------
-----------------------------------------------------------------------------------

INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (NULL, NULL, 'Lun/Mie', '22:00', '23:30', '03/03/2018', '03/08/2018'); -- Error por codComisión nulo
INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (0, NULL, 'Lun/Mie', '22:00', '23:30', '03/03/2018', '03/08/2018'); -- Error por codComisión = 0
INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (-10, NULL, 'Lun/Mie', '22:00', '23:30', '03/03/2018', '03/08/2018'); -- Error por codComisión < 0
INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (11, NULL, 'Lun/Mie', '22:00', '23:30', '03/03/2018', '03/08/2018'); -- Error por nombre nulo
INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (11, '', 'Lun/Mie', '22:00', '23:30', '03/03/2018', '03/08/2018'); -- Error por nombre vacío
INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (11, 'Programación Avanzada', 'Lun/Mie', '22:00', '23:30', '03/03/2018', '03/08/2018'); -- Query OK

-----------------------------------------------------------------------------------
-------------------------------- Probando asistencia ------------------------------
-----------------------------------------------------------------------------------

INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES (NULL, NULL, '20/02/2018', false); -- Error fknrocuenta es nulo
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('', NULL, '20/02/2018', false); -- Error fknrocuenta es vacío
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2531', NULL, '20/02/2018', false); -- Error fkcodcomision es nulo
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2531', 0, '20/02/2018', false); -- Error fkcodcomision es 0
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2531', -10, '20/02/2018', false); -- Error fkcodcomision es menor a 0
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2531', 4, '20/02/2018', false); -- Query OK


-----------------------------------------------------------------------------------
------------------------------ Probando alumnoComision ----------------------------
-----------------------------------------------------------------------------------

INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES (NULL, NULL, NULL); -- Error fechainscripcion es nula
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('28/02/2020', NULL, NULL); -- Error fknrocuenta es nulo
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('28/02/2020', '', NULL); -- Error fknrocuenta es vacío
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('28/02/2020', '17-2531', NULL); -- Error fkcodcomision es nulo
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('28/02/2020', '17-2531', 0); -- Error fkcodcomision es 0
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('28/02/2020', '17-2531', -10); -- Error fkcodcomision es menor a 0
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('28/02/2020', '17-2531', 4); -- Query OK

-----------------------------------------------------------------------------------
--*                                                                            * --
--*                          PROBANDO STORE PROCEDDURES                        * --
--*                                                                            * --
-----------------------------------------------------------------------------------


--------------------------------------------------------------------------
---------------------- Buscar cursos x alumnos ---------------------------
--------------------------------------------------------------------------

select * from cursosxalumno('Esteban', 'Quito'); -- Devuelve tres registros
select * from cursosxalumno('Aitor', 'Tilla'); -- Devuelve un único registro
select * from cursosxalumno('Armando', 'Paredes'); -- No trae ningún registro
select * from cursosxalumno('Encarna', 'Vales'); -- Devuelve un registro


--------------------------------------------------------------------------
---------------------- Buscar alumnos x cursos ---------------------------
--------------------------------------------------------------------------

 select * from alumnosxcurso('Corel Draw'); -- Devuelve tres registros
 select * from alumnosxcurso('Reparador de PC II'); -- No trae ningún registro
 select * from alumnosxcurso('Operador Junior 4 años'); -- Devuelve un único registro
 select * from alumnosxcurso('Windows/Word/Excel'); -- Devuelve tres registros

 --------------------------------------------------------------------------------
------------------------------ Alumnos por comisión -----------------------------
---------------------------------------------------------------------------------

select * from alumnosxcomision(9); -- Devuelve dos registros // Curso: Windows/Word/Excel
select * from alumnosxcomision(5); -- Devuelve un registro // Curso: Reparador de PC I
select * from alumnosxcomision(7); -- Devuelve un registro // Curso: Reparador de PC II
select * from alumnosxcomision(2); -- No devuelve registros
select * from alumnosxcomision(1); -- Devuelve un registro // Curso: Operador Junior 4 años
select * from alumnosxcomision(11); -- No devuelve registros // La comisión no existe


-----------------------------------------------------------------------------------
--*                                                                            * --
--*                               PROBANDO VISTAS                              * --
--*                                                                            * --
-----------------------------------------------------------------------------------


---------------------------------------------------------------------------------
------------------------------- Cursos por alumno -------------------------------
---------------------------------------------------------------------------------

select * from cursoxalu; -- Devuelve 11 registros
select * from aluxcurso; -- Devuelve 11 registros
select * from aluxcomision; -- Devuelve 11 registros