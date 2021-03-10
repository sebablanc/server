---------------------------------------------------------------------------------
----------------------------------- CONSULTA ------------------------------------
------------------------------- Cursos por alumno -------------------------------
---------------------------------------------------------------------------------

CREATE VIEW cursoxalu AS(
SELECT per.nrocuenta, per.nombre, per.apellido, com.codcomision, com.fknombre
FROM alumnocomision as aluco
JOIN alumno as alu ON alu.fknrocuenta=aluco.fknrocuenta
JOIN persona as per ON per.nrocuenta=alu.fknrocuenta
JOIN comision as com ON com.codcomision=aluco.fkcodcomision
JOIN curso as cur ON cur.nombre=com.fknombre
ORDER BY per.nrocuenta
);

--PROBADO CON: select * from cursoxalu;

---------------------------------------------------------------------------------
----------------------------------- CONSULTA ------------------------------------
------------------------------ Alumnos por cursos -------------------------------
---------------------------------------------------------------------------------

CREATE VIEW aluxcurso AS(
SELECT com.fknombre, per.nrocuenta, per.nombre, per.apellido
FROM alumnocomision as aluco
JOIN alumno as alu ON alu.fknrocuenta=aluco.fknrocuenta
JOIN persona as per ON per.nrocuenta=alu.fknrocuenta
JOIN comision as com ON com.codcomision=aluco.fkcodcomision
JOIN curso as cur ON cur.nombre=com.fknombre
ORDER BY cur.nombre
);

--PROBADO CON: select * from aluxcurso;

---------------------------------------------------------------------------------
----------------------------------- CONSULTA ------------------------------------
------------------------------ Alumnos por comisión -----------------------------
---------------------------------------------------------------------------------

CREATE VIEW aluxcomision AS(
SELECT com.codcomision, com.fknombre, per.nrocuenta, per.nombre, per.apellido
FROM alumnocomision as aluco
JOIN alumno as alu ON alu.fknrocuenta=aluco.fknrocuenta
JOIN persona as per ON per.nrocuenta=alu.fknrocuenta
JOIN comision as com ON com.codcomision=aluco.fkcodcomision
JOIN curso as cur ON cur.nombre=com.fknombre
ORDER BY com.codcomision
);

--PROBADO CON: select * from aluxcomision;