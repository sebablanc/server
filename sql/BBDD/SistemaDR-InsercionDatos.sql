-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
-------------------------------------- LOCALIDAD ------------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO localidad (codpostal, ciudad, provincia) VALUES (3263, '1ro de Mayo', 'Entre Ríos');
INSERT INTO localidad (codpostal, ciudad, provincia) VALUES (3260, 'Concepción del uruguay', 'Entre Ríos');
INSERT INTO localidad (codpostal, ciudad, provincia) VALUES (3280, 'Colón', 'Entre Ríos');
INSERT INTO localidad (codpostal, ciudad, provincia) VALUES (3265, 'Villa Elisa', 'Entre Ríos');
INSERT INTO localidad (codpostal, ciudad, provincia) VALUES (3283, 'San José', 'Entre Ríos');
INSERT INTO localidad (codpostal, ciudad, provincia) VALUES (3263, 'Pronunciamiento', 'Entre Ríos');
INSERT INTO localidad (codpostal, ciudad, provincia) VALUES (3262, 'San Justo', 'Entre Ríos');
INSERT INTO localidad (codpostal, ciudad, provincia) VALUES (3261, 'Colonia Elía', 'Entre Ríos');
INSERT INTO localidad (codpostal, ciudad, provincia) VALUES (2820, 'Gualeguaychú', 'Entre Ríos');
INSERT INTO localidad (codpostal, ciudad, provincia) VALUES (3170, 'Basavilbaso', 'Entre Ríos');

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
--------------------------------------- PERSONA -------------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, localidadid, dni, fechanacimiento, foto) VALUES ('17-2531', 'Esteban', 'Quito', 'San Martín 1287', '03442-436692', '', 'esqui@outlook.es', 'twitter.com/esqui', 2, '25678423', '19/08/1979', 'rutaFoto');
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, localidadid, dni, fechanacimiento, foto) VALUES ('17-2833', 'Aitor', 'Tilla', 'Pablo Scéliga 957', '03442-563251', '', 'aitil@hotmail.com', '', 2, '29541222', '25/03/1981', 'rutaPred');
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, localidadid, dni, fechanacimiento, foto) VALUES ('17-2957', 'Encarna', 'Vales', 'San Martín 20', '03442-595581', '', 'enval@hotmail.com', '', 1, '35123569', '22/10/1989', 'rutaPred');
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, localidadid, dni, fechanacimiento, foto) VALUES ('16-2130', 'Lola', 'Mento', 'Víctor Monzalvo 200', '03442-423628', '', 'lomen@gmail.com', '', 1, '39223787', '21/12/1996', 'rutaPred');
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, localidadid, dni, fechanacimiento, foto) VALUES ('16-2240', 'Armando', 'Paredes', 'Ameghino 350', '03442-426688', '03442-15489652', 'arpar@gmail.com', '', 2, '41258652', '03/03/1998', 'rutaFoto');
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, localidadid, dni, fechanacimiento, foto) VALUES ('17-2960', 'Dolores', 'Fuertes', 'Paso de los andes 1817', '03447-436299', '', 'dofue@yahoo.com.ar', '', 3, '50248971', null, 'rutaFoto');
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, localidadid, dni, fechanacimiento, foto) VALUES ('17-2975', 'Enrique', 'Cido', 'Maipú 253', '03442-548826', '', 'encid@gmail.com', '', 2, '45024897', null, 'rutaFoto');
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, localidadid, dni, fechanacimiento, foto) VALUES ('17-2970', 'Estela', 'Gartija', 'Ituzaingó 642', '03442-552211', '', 'esgar@gmail.com', '', 2, '55236899', '04/01/2005', 'rutaPred');
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, localidadid, dni, fechanacimiento, foto) VALUES ('18-2980', 'Alan', 'Brito', 'Paso de los andes 297', '03447-425551', '03447-15564213', 'albri@hotmail.com', '', 3, '24369147', '15/09/1979', 'rutaFoto');
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, localidadid, dni, fechanacimiento, foto) VALUES ('18-2983', 'Andrés', 'Trozado', 'Perú 82', '03442-436238', '', 'antro@hotmail.com', '', 2, '30256348', '05/11/1986', 'rutaPred');
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, localidadid, dni, fechanacimiento, foto) VALUES ('18-2985', 'Francisco', 'Rupto', 'Tte. Ibañez 132', '03442-421522', '', 'frrup@hotmail.com', 'facebook.com/frrup', 2, '41268248', '02/06/1997', 'rutaFoto');
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, localidadid, dni, fechanacimiento, foto) VALUES ('18-2990', 'Jesús', 'Tituto', 'Piedras 752', '03442-421978', '', 'jetit@gmail.com', '', 2, '45266344', '01/02/1999', 'rutaPred');

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
---------------------------------------- CURSO -------------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO curso (nombre, imagen, programa, valor, descripcion, categoria) VALUES ('Operador Junior 4 años', 'rutaImagen', 'rutaPrograma', 150, 'Curso para los más peques de la casa.', 'KIDS');
INSERT INTO curso (nombre, imagen, programa, valor, descripcion, categoria) VALUES ('Operador Junior 5 años', 'rutaImagen', 'rutaPrograma', 150, 'Los más chicos siguen aprendiendo en este curso lleno de juegos y diversión.', 'KIDS');
INSERT INTO curso (nombre, imagen, programa, valor, descripcion, categoria) VALUES ('Operador Junior 6 años', 'rutaImagen', '', 150, 'Ayudamos a que los chicos aprendan más rápido lo que dan en la escuela mediante números y letras.', 'KIDS');
INSERT INTO curso (nombre, imagen, programa, valor, descripcion, categoria) VALUES ('Operador Junior 7 años', 'rutaImagen', '', 200, 'Las tareas de los chicos se vuelven más interesantes al aprender a buscar en intenet.', 'KIDS');
INSERT INTO curso (nombre, imagen, programa, valor, descripcion, categoria) VALUES ('Operador Junior 8 años', 'rutaImagen', 'rutaPrograma', 200, 'La lectura es más divertida cuando se aprende jugando.', 'KIDS');
INSERT INTO curso (nombre, imagen, programa, valor, descripcion, categoria) VALUES ('Operador Junior 9 años', 'rutaImagen', '', 200, 'Aprendiendo a trabajar con la pc desde los 9 años.', 'KIDS');
INSERT INTO curso (nombre, imagen, programa, valor, descripcion, categoria) VALUES ('Operador Junior 10 años', 'rutaImagen', '', 350, 'A los 10 años, buscás mejor información completando las tareas más rápido.', 'KIDS');
INSERT INTO curso (nombre, imagen, programa, valor, descripcion, categoria) VALUES ('Operador Junior 11 años', 'rutaImagen', 'rutaPrograma', 350, 'Aprendé a manejar Word para que tus trabajos prácticos tengo colores y sean más lindos.', 'KIDS');
INSERT INTO curso (nombre, imagen, programa, valor, descripcion, categoria) VALUES ('Operador Junior 12 años', 'rutaImagen', '', 350, 'Aprendé a manejar la PC mejor que nunca con este curso.', 'KIDS');
INSERT INTO curso (nombre, imagen, programa, valor, descripcion, categoria) VALUES ('Operador Junior 13 años', 'rutaImagen', 'rutaPrograma', 400, 'Los trabajos prácticos se vuelven cada vez más originales en este curso, no sólo uses word, si no, todas las demás herramientas que la PC puede ofrecer.', 'KIDS');
INSERT INTO curso (nombre, imagen, programa, valor, descripcion, categoria) VALUES ('Windows/Word/Excel', 'rutaImagen', 'rutaPrograma', 690, '¡Manejá la pc como todo un profesional! aprendé a instalar programas, escribir en Word, hacer planillas de cálculos, navegar por Internet, enviar email, y bases de datos sencillas.', 'ADULTOS');
INSERT INTO curso (nombre, imagen, programa, valor, descripcion, categoria) VALUES ('Corel Draw', 'rutaImagen', 'rutaPrograma', 1300, 'Inicia tu aventura de diseño con buen pie con CorelDRAW, una solución completa de aplicaciones profesionales de diseño gráfico, diseño de páginas, edición de fotos y mucho más, diseñada específicamente para tu plataforma preferida.', 'ADULTOS');
INSERT INTO curso (nombre, imagen, programa, valor, descripcion, categoria) VALUES ('Reparador de PC II', 'rutaImagen', 'rutaPrograma', 1250, 'Continuación del curso "Reparador de PC I. Donde se ve una introducción a la electrónica y soldadura, hasta reparación de notebooks e implementación de servidores."', 'ADULTOS');
INSERT INTO curso (nombre, imagen, programa, valor, descripcion, categoria) VALUES ('Reparador de PC I', 'rutaImagen', 'rutaPrograma', 1250, 'Este curso comienza desde las bases de la computadora hasta las reparaciones de hardware e instalación de software más demandos del mercado. Salida laboral al instante.', 'ADULTOS');

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
-------------------------------------- DESCUENTO ------------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO descuento (iddescuento, razon, porcentaje, seleccion) VALUES (1, 'Ex Alumno', 5, false);
INSERT INTO descuento (iddescuento, razon, porcentaje, seleccion) VALUES (2, 'Grupo Familiar', 35, false);
INSERT INTO descuento (iddescuento, razon, porcentaje, seleccion) VALUES (3, 'Convenio institución', 50, false);

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
--------------------------------------- COMISION ------------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO comision (cursoId, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (1, 'LUN/MIE', '17:00', '17:30', '03/03/2020', '03/08/2020');
INSERT INTO comision (cursoId, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (1, 'MAR/JUE', '18:00', '18:30', '27/08/2020', '20/12/2020');
INSERT INTO comision (cursoId, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (24, 'MAR/JUE', '20:00', '21:30', '27/08/2020', '20/12/2020');
INSERT INTO comision (cursoId, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (24, 'LUN/MIE', '10:00', '11:30', '03/03/2020', '03/08/2020');
INSERT INTO comision (cursoId, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (2, 'LUN/MIE', '17:00', '18:30', '26/08/2020', '19/12/2020');
INSERT INTO comision (cursoId, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (2, 'VIE', '15:30', '18:30', '07/03/2020', '07/08/2020');
INSERT INTO comision (cursoId, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (25, 'VIE', '15:30', '18:30', '30/08/2020', '21/12/2020');
INSERT INTO comision (cursoId, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (18, 'MAR/JUE', '15:30', '16:00', '27/08/2020', '20/12/2020');
INSERT INTO comision (cursoId, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (23, 'LUN/MIE', '10:30', '12:00', '26/08/2020', '19/12/2020');
INSERT INTO comision (cursoId, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (23, 'MAR/JUE', '21:30', '23:00', '27/08/2020', '20/12/2020');

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
------------------------------------ PERSONACOMISION --------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO personacomision (fechainscripcion, personaId, comisionId) VALUES ('28/02/2020', 13, 6);
INSERT INTO personacomision (fechainscripcion, personaId, comisionId) VALUES ('12/08/2020', 13, 11);
INSERT INTO personacomision (fechainscripcion, personaId, comisionId) VALUES ('20/08/2020', 14, 7);
INSERT INTO personacomision (fechainscripcion, personaId, comisionId) VALUES ('15/02/2020', 24, 3);
INSERT INTO personacomision (fechainscripcion, personaId, comisionId) VALUES ('30/07/2020', 15, 9);
INSERT INTO personacomision (fechainscripcion, personaId, comisionId) VALUES ('15/07/2020', 21, 5);
INSERT INTO personacomision (fechainscripcion, personaId, comisionId) VALUES ('20/08/2020', 21, 11);
INSERT INTO personacomision (fechainscripcion, personaId, comisionId) VALUES ('05/08/2020', 16, 12);
INSERT INTO personacomision (fechainscripcion, personaId, comisionId) VALUES ('22/05/2020', 20, 10);
INSERT INTO personacomision (fechainscripcion, personaId, comisionId) VALUES ('07/02/2020', 22, 8);

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
------------------------------------- PERSONACURSO ----------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('28/02/2020', 'Corel Draw', '17-2531', 'puede de mañana', '#804000');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('20/05/2020', 'Operador Junior 10 años', '17-2970', 'llamar más tarde', '#ffff00');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('28/02/2020', 'Corel Draw', '17-2957', 'puede de mañana', '#804000');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('15/08/2020', 'Corel Draw', '18-2990', 'no por ahora, avisar proximo', '#ce0018');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('20/02/2020', 'Windows/Word/Excel', '18-2980', 'confiramdo', '#005221');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('10/08/2020', 'Reparador de PC I', '18-2985', 'puede de mañana', '#804000');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('22/02/2020', 'Corel Draw', '18-2983', 'confirmado', '#005221');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('02/02/2020', 'Reparador de PC I', '18-2983', 'puede de mañana', '#804000');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('10/08/2020', 'Corel Draw', '16-2240', 'puede de mañana', '#804000');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('15/05/2020', 'Reparador de PC II', '17-2833', 'puede de mañana', '#804000');

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
---------------------------------------- INSCDESC -----------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('28/02/2020', '17-2531', 4, 2);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('12/08/2020', '17-2531', 9, 2);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('20/08/2020', '17-2833', 5, 1);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('15/02/2020', '18-2990', 1, 3);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('30/07/2020', '17-2957', 7, 1);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('30/07/2020', '17-2957', 7, 2);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('05/08/2020', '16-2130', 10, 1);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('22/05/2020', '17-2970', 8, 1);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('22/05/2020', '17-2970', 8, 3);

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
---------------------------------------- CUOTA --------------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('28/02/2020', '17-2531', 4, 1, false, '15/03/2020', null);
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('12/08/2020', '17-2531', 9, 1, true, '15/09/2020', '08/09/2020');
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('20/08/2020', '17-2833', 5, 2, true, '15/09/2020', '16/09/2020');
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('15/02/2020', '18-2990', 1, 1, true, '15/03/2020', '15/03/2020');
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('30/07/2020', '17-2957', 7, 1, false, '15/09/2020', null);
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('30/07/2020', '17-2957', 7, 2, false, '15/10/2020', null);
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('05/08/2020', '16-2130', 10, 1, true, '15/09/2020', '20/09/2020');
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('22/05/2020', '17-2970', 8, 1, false, '15/09/2020', null);
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('07/02/2020', '18-2983', 6, 1, true, '15/03/2020', '01/03/2020');
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('20/08/2020', '18-2980', 9, 2, true, '15/09/2020', '10/09/2020');

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
-------------------------------------- ASISTENCIA -----------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2531', 4, '05/05/2020', false);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2531', 4, '12/05/2020', true);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2833', 5, '29/09/2020', true);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('18-2990', 1, '03/03/2020', true);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2957', 7, '22/09/2020', false);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('18-2990', 1, '10/03/2020', false);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2957', 7, '27/05/2020', false);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2833', 5, '30/10/2020', false);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('18-2980', 3, '15/09/2020', true);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('18-2980', 3, '17/09/2020', false);

GRANT ALL ON localidad TO PUBLIC;
GRANT ALL ON persona TO PUBLIC;
GRANT ALL ON alumno TO PUBLIC;
GRANT ALL ON curso TO PUBLIC;
GRANT ALL ON descuento TO PUBLIC;
GRANT ALL ON comision TO PUBLIC;
GRANT ALL ON asistencia TO PUBLIC;
GRANT ALL ON alumnocomision TO PUBLIC;
GRANT ALL ON personacurso TO PUBLIC;
GRANT ALL ON inscdesc TO PUBLIC;
GRANT ALL ON cuota TO PUBLIC;

COMMIT;