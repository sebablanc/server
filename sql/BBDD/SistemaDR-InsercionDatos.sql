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

INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('17-2531', 'Esteban', 'Quito', 'San Martín 1287', '03442-436692', '', 'esqui@outlook.es', 'twitter.com/esqui', 3260);
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('17-2833', 'Aitor', 'Tilla', 'Pablo Scéliga 957', '03442-563251', '', 'aitil@hotmail.com', '', 3260);
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('17-2957', 'Encarna', 'Vales', 'San Martín 20', '03442-595581', '', 'enval@hotmail.com', '', 3263);
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('16-2130', 'Lola', 'Mento', 'Víctor Monzalvo 200', '03442-423628', '', 'lomen@gmail.com', '', 3263);
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('16-2240', 'Armando', 'Paredes', 'Ameghino 350', '03442-426688', '03442-15489652', 'arpar@gmail.com', '', 3260);
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('17-2960', 'Dolores', 'Fuertes', 'Paso de los andes 1817', '03447-436299', '', 'dofue@yahoo.com.ar', '', 3280);
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('17-2975', 'Enrique', 'Cido', 'Maipú 253', '03442-548826', '', 'encid@gmail.com', '', 3260);
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('17-2970', 'Estela', 'Gartija', 'Ituzaingó 642', '03442-552211', '', 'esgar@gmail.com', '', 3260);
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('18-2980', 'Alan', 'Brito', 'Paso de los andes 297', '03447-425551', '03447-15564213', 'albri@hotmail.com', '', 3280);
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('18-2983', 'Andrés', 'Trozado', 'Perú 82', '03442-436238', '', 'antro@hotmail.com', '', 3260);
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('18-2985', 'Francisco', 'Rupto', 'Tte. Ibañez 132', '03442-421522', '', 'frrup@hotmail.com', 'facebook.com/frrup', 3260);
INSERT INTO persona (nroCuenta, nombre, apellido, direccion, telefono, celular, email, otromedio, fkcodpostal) VALUES ('18-2990', 'Jesús', 'Tituto', 'Piedras 752', '03442-421978', '', 'jetit@gmail.com', '', 3260);

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
---------------------------------------- ALUMNO -------------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('17-2531', '25.678.423', '19/08/1979', 'rutaFoto');
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('17-2833', '29.541.222', '25/03/1981', 'rutaPred');
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('17-2957', '35.123.569', '22/10/1989', 'rutaPred');
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('16-2130', '39.223.787', '21/12/1996', 'rutaPred');
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('16-2240', '41.258.652', '03/03/1998', 'rutaFoto');
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('17-2970', '55.236.899', '04/01/2005', 'rutaPred');
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('18-2980', '24.369.147', '15/09/1979', 'rutaFoto');
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('18-2983', '30.256.348', '05/11/1986', 'rutaPred');
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('18-2985', '41.268.248', '02/06/1997', 'rutaFoto');
INSERT INTO alumno (fknrocuenta, dni, fechanacimiento, foto) VALUES ('18-2990', '45.266.344', '01/02/1999', 'rutaPred');

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
---------------------------------------- CURSO -------------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Operador Junior 4 años', 'rutaImagen', 'rutaPrograma', 150);
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Operador Junior 5 años', 'rutaImagen', 'rutaPrograma', 150);
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Operador Junior 6 años', 'rutaImagen', '', 150);
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Operador Junior 7 años', 'rutaImagen', '', 200);
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Operador Junior 8 años', 'rutaImagen', 'rutaPrograma', 200);
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Operador Junior 9 años', 'rutaImagen', '', 200);
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Operador Junior 10 años', 'rutaImagen', '', 350);
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Operador Junior 11 años', 'rutaImagen', 'rutaPrograma', 350);
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Operador Junior 12 años', 'rutaImagen', '', 350);
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Operador Junior 13 años', 'rutaImagen', 'rutaPrograma', 400);
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Windows/Word/Excel', 'rutaImagen', 'rutaPrograma', 690);
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Corel Draw', 'rutaImagen', 'rutaPrograma', 1300);
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Reparador de PC I', 'rutaImagen', 'rutaPrograma', 1250);
INSERT INTO curso (nombre, imagen, programa, valor) VALUES ('Reparador de PC II', 'rutaImagen', 'rutaPrograma', 1250);

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

INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (1, 'Operador Junior 4 años', 'Lun/Mie', '17:00', '17:30', '03/03/2018', '03/08/2018');
INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (2, 'Operador Junior 4 años', 'Mar/Jue', '18:00', '18:30', '27/08/2018', '20/12/2018');
INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (3, 'Corel Draw', 'Mar/Jue', '20:00', '21:30', '27/08/2018', '20/12/2018');
INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (4, 'Corel Draw', 'Lun/Mie', '10:00', '11:30', '03/03/2018', '03/08/2018');
INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (5, 'Reparador de PC I', 'Lun/Mie', '17:00', '18:30', '26/08/2018', '19/12/2018');
INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (6, 'Reparador de PC I', 'Vie', '15:30', '18:30', '07/03/2018', '07/08/2018');
INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (7, 'Reparador de PC II', 'Vie', '15:30', '18:30', '30/08/2018', '21/12/2018');
INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (8, 'Operador Junior 10 años', 'Mar/Jue', '15:30', '16:00', '27/08/2018', '20/12/2018');
INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (9, 'Windows/Word/Excel', 'Lun/Mie', '10:30', '12:00', '26/08/2018', '19/12/2018');
INSERT INTO comision (codcomision, fknombre, dias, horadesde, horahasta, fechainicio, fechafin) VALUES (10, 'Windows/Word/Excel', 'Mar/Jue', '21:30', '23:00', '27/08/2018', '20/12/2018');

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
-------------------------------------- ASISTENCIA -----------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2531', 4, '05/05/2018', false);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2531', 4, '12/05/2018', true);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2833', 5, '29/09/2018', true);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('18-2990', 1, '03/03/2018', true);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2957', 7, '22/09/2018', false);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('18-2990', 1, '10/03/2018', false);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2957', 7, '27/05/2018', false);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('17-2833', 5, '30/10/2018', false);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('18-2980', 3, '15/09/2018', true);
INSERT INTO asistencia (fknrocuenta, fkcodcomision, fechaclase, asiste) VALUES ('18-2980', 3, '17/09/2018', false);

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
------------------------------------ ALUMNOCOMISION ---------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('28/02/2018', '17-2531', 4);
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('12/08/2018', '17-2531', 9);
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('20/08/2018', '17-2833', 5);
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('15/02/2018', '18-2990', 1);
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('30/07/2018', '17-2957', 7);
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('15/07/2018', '18-2980', 3);
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('20/08/2018', '18-2980', 9);
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('05/08/2018', '16-2130', 10);
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('22/05/2018', '17-2970', 8);
INSERT INTO alumnocomision (fechainscripcion, fknrocuenta, fkcodcomision) VALUES ('07/02/2018', '18-2983', 6);

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
------------------------------------- PERSONACURSO ----------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('28/02/2018', 'Corel Draw', '17-2531', 'puede de mañana', '#804000');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('20/05/2018', 'Operador Junior 10 años', '17-2970', 'llamar más tarde', '#ffff00');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('28/02/2018', 'Corel Draw', '17-2957', 'puede de mañana', '#804000');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('15/08/2018', 'Corel Draw', '18-2990', 'no por ahora, avisar proximo', '#ce0018');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('20/02/2018', 'Windows/Word/Excel', '18-2980', 'confiramdo', '#005221');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('10/08/2018', 'Reparador de PC I', '18-2985', 'puede de mañana', '#804000');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('22/02/2018', 'Corel Draw', '18-2983', 'confirmado', '#005221');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('02/02/2018', 'Reparador de PC I', '18-2983', 'puede de mañana', '#804000');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('10/08/2018', 'Corel Draw', '16-2240', 'puede de mañana', '#804000');
INSERT INTO personacurso (fechacons, fknombre, fknrocuenta, observacion, color) VALUES ('15/05/2018', 'Reparador de PC II', '17-2833', 'puede de mañana', '#804000');

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
---------------------------------------- INSCDESC -----------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('28/02/2018', '17-2531', 4, 2);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('12/08/2018', '17-2531', 9, 2);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('20/08/2018', '17-2833', 5, 1);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('15/02/2018', '18-2990', 1, 3);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('30/07/2018', '17-2957', 7, 1);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('30/07/2018', '17-2957', 7, 2);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('05/08/2018', '16-2130', 10, 1);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('22/05/2018', '17-2970', 8, 1);
INSERT INTO inscdesc (fkfechainscripcion, fknrocuenta, fkcodcomision, fkiddescuento) VALUES ('22/05/2018', '17-2970', 8, 3);

-------------------------------------------------------------------------------------------
------------------------------ Inserción de datos en tabla  -------------------------------
---------------------------------------- CUOTA --------------------------------------------
-------------------------------------------------------------------------------------------

INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('28/02/2018', '17-2531', 4, 1, false, '15/03/2018', null);
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('12/08/2018', '17-2531', 9, 1, true, '15/09/2018', '08/09/2018');
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('20/08/2018', '17-2833', 5, 2, true, '15/09/2018', '16/09/2018');
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('15/02/2018', '18-2990', 1, 1, true, '15/03/2018', '15/03/2018');
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('30/07/2018', '17-2957', 7, 1, false, '15/09/2018', null);
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('30/07/2018', '17-2957', 7, 2, false, '15/10/2018', null);
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('05/08/2018', '16-2130', 10, 1, true, '15/09/2018', '20/09/2018');
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('22/05/2018', '17-2970', 8, 1, false, '15/09/2018', null);
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('07/02/2018', '18-2983', 6, 1, true, '15/03/2018', '01/03/2018');
INSERT INTO cuota (fkfechainsc, fknrocuenta, fkcodcomision, nrocuota, pagado, fechavenc, fechapago) VALUES ('20/08/2018', '18-2980', 9, 2, true, '15/09/2018', '10/09/2018');

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