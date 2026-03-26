+--------------------------+----------------------------------+-------------------------------+
| **N° reporte**: 37537    | **Cliente**: INFOCENT, CA.       | **Responsable**:              |
+:=========================+:=================================+:==============================+
| **Descripción del reporte**: Configurar flujos de           | **Fecha de la solicitud**:    |
| aprobación de solicitudes.                                  | 21/07/2014                    |
+-------------------------------------------------------------+-------------------------------+
| **Alternativa en SPI**: No tiene.                                                           |
+-------------------------------------------------------------+-------------------------------+
| **Ruta:** SPIAS                                             | **Plataforma**: Java          |
+-------------------------------------------------------------+-------------------------------+
| **Observación**:                                                                            |
+--------------------------+------------------------------------------------------------------+
| **Situación actual**:    | No existe                                                        |
+--------------------------+------------------------------------------------------------------+

**Propuesta**: Crear una opción para configurar Actores y flujo de
aprobación para las solicitudes en SPIAS, para esta primera etapa será
para la solicitud de Vacaciones.

**SPI Seguridad**: Se propone crear una opción denominada Roles SPIAS,
donde se podrá asociar por roles, las personas responsables de tener
permisos según el rol que se defina para interactuar con SPI
Autoservicio.

![](media/image1.png){width="7.46875in" height="3.7604166666666665in"}

En esta sección contaremos con 3 Roles predefinidos por SPIAS: Delegado,
Master y Aprobador.

1.  Al ingresar en la opción Rol SPIAS, visualizará los roles
    predefinidos por SPI.

2.  Ubíquese en el rol al cual requiere agregar o asociar la o las
    personas que lo ocuparán.

3.  Luego del lado derecho de la pantalla visualizará las personas ya
    asociadas según el rol seleccionado.

4.  Para agregar una persona a un rol, seleccione el botón Agregar.

![](media/image2.png){width="7.666666666666667in" height="2.46875in"}

**Observación**: Al ingresar en un ambiente en cero, los roles de
master, aprobador y Delegado no tendrán empleados asociados, sin
embargo, el rol de solicitante tendrá asignados a todos los empleados
activos a la fecha.

![](media/image3.png){width="0.3125in" height="0.3229166666666667in"} Al
seleccionar el Botón de agregar, se mostrará la pantalla para
seleccionar las personas que tendrán la permsología del rol previamente
seleccionado.

![Interfaz de usuario gráfica El contenido generado por IA puede ser
incorrecto.](media/image4.png){width="5.077040682414698in"
height="3.875in"}

**Observación**:

- Se creará un script para insertar los roles predefinidos de spias.

- Se creará un script para insertar las opciones nuevas que contendrá
  spias en las que tendrá autorización el Rol Master.

- Se creará un script que insertará todas las personas con relación
  laboral activa, las cuales se crearán con rol de Solicitante.

**SPI Autoservicio**:

**Máster**:

**Este perfil está designado para funciones administrativas**, esto con
el propósito de que no tengamos un super aprobador de solicitudes, las
personas encargadas o con permisos para hacer esto son únicamente los
aprobadores. Con este perfil las personas asignadas podrán agregar a los
responsables de unidades, eliminarlos, poder visualizar los reportes de
solicitudes y administrar los flujos de aprobación por niveles de los
distintos tipos de solicitudes.

**Solicitante**:

El solicitante puede ver sus solicitudes, crear, modificar y eliminar
las mismas. (**las solicitudes que ya tengan un avance en los estatus no
podrán ser eliminadas o modificadas**).

**Aprobador**:

Con el perfil de aprobador podremos aceptar o denegar las solicitudes.

Para agregar un aprobador, seleccionaremos el rol de aprobar y haremos
clic en el botón de agregar:

**Delegar permisos de aprobación**:

Con el perfil de Delegado podremos dentro de la configuración de roles
de aprobación, delegar las aprobaciones durante un lapso de tiempo.

**Administración de solicitudes o flujos de autorización**: Se propone
crear una opción en SPI Autoservicio, en esta opción los usuarios master
podrán configurar solicitudes y flujos de aprobación.

1.  Al entrar a esta opción podrá visualizar la siguiente tabla:

![](media/image5.png){width="7.666666666666667in" height="2.53125in"}

Inicialmente tendremos ya definido la solicitud de vacaciones, la idea
es que posteriormente se agreguen otro tipo de solicitudes.

2.  Se incluirá un botón para al seleccionar el flujo de la solicitud,
    poder agregar un tiempo de aprobación de la solicitud, en días. En
    caso de no indicar este campo, se mostrará por defecto 5 días,
    además de un botón para activar el flujo de aprobación de la
    solicitud seleccionada, por defecto se indicará Inactiva. Para ello:

    2.  Ubíquese en la solicitud.

    3.  Presione el botón de modificar

    4.  A continuación, se mostrará la siguiente pantalla donde podrá
        indicar la siguiente información:

- Nombre: Visualizará el nombre de la solicitud previamente seleccionada
  en este caso: Solicitud de vacaciones.

- Días para procesar la solicitud: Seleccione la cantidad de días en que
  la solicitud debe completar el flujo de aprobación. Tendrá disponible
  máximo 10 días.

- Tilde el check Activo para activar el flujo para la solicitud.

![](media/image6.png){width="4.46875in" height="2.132813867016623in"}

3.  Luego de realizada la configuración de la solicitud (es opcional),
    podrá ubicarse del lado derecho de la pantalla de consulta de Flujo
    de aprobación, donde podrá crear los diferentes flujos que desee
    sobre la solicitud de Vacaciones, así como los responsables de
    Aprobar o no las solicitudes, para ello:

3.1 Pulse el botón Agregar.

![Interfaz de usuario gráfica, Aplicación, Sitio web El contenido
generado por IA puede ser
incorrecto.](media/image5.png){width="7.666666666666667in"
height="2.53125in"}

3.2 Indique la siguiente información:

3.3 Nombre del flujo que desee definir.

![](media/image7.png){width="4.9118055555555555in" height="3.45625in"}

3.4 Luego podrá seleccionar los aprobadores responsables del flujo que
se esté definiendo, para ello pulse el botón de listar, seguidamente se
mostrarán los actores definidos con el Rol de Aprobados, previamente
definidos en SPI Seguridad opción Rol SPIAS. (Tendrá como máximo 4
aprobadores para un flujo).

![Interfaz de usuario gráfica El contenido generado por IA puede ser
incorrecto.](media/image4.png){width="5.077040682414698in"
height="3.875in"}

3.5 Para cada aprobador debe indicar el nivel de aprobación de cada uno,
se puede colocar para un mismo aprobar el mismo nivel, en ese caso los
aprobadores que tengan el mismo nivel indicarán que uno de los dos que
apruebe primero dará continuidad al flujo. (Existirá un tope de nivel,
en este caso hasta 4).

4.6 Luego pulse Guardar.

**Nota Importante**: En caso de No asignar nivel a la persona, esta no
participará en el flujo.

4.  Luego de realizada la configuración del flujo de aprobación,
    seleccione el flujo al cual desee asociarles los solicitantes que
    participarán en el flujo. Para ello:

4.1 Ubíquese en la pestaña Aprobación A.

![Interfaz de usuario gráfica, Aplicación, Sitio web El contenido
generado por IA puede ser
incorrecto.](media/image8.png){width="7.666666666666667in"
height="2.6041666666666665in"}

2.  Pulse el botón Agregar, seguidamente indique la información que se
    muestra a continuación:

3.  Se mostrará el nombre de la solicitud seleccionada anteriormente.

4.  Seleccione la Distribución de nómina, en caso de que requiera
    filtrar por distribución.

![](media/image9.png){width="3.9028729221347334in"
height="3.3958333333333335in"}

5.  Luego seleccione la Unidad organizativa, en este caso podrá
    selecciona a toda la unidad organizativa o utilizarlo como un filtro
    para luego listar los Solicitantes.

6.  Seleccione el solicitante o los solicitantes que participarán en el
    flujo que se esté definiendo.

7.  Guarde los ajustes realizados.

![Interfaz de usuario gráfica, Aplicación, Tabla El contenido generado
por IA puede ser
incorrecto.](media/image10.png){width="4.979166666666667in"
height="3.47242782152231in"}

**Delegar permisos de aprobación**:

Existe otra funcionalidad dentro de la configuración de roles de
aprobación, que es la de delegar responsables, para esto al selecciona
el rol de Aprobador, se mostrará un botón con un ícono para delegar las
aprobaciones durante un lapso, para ello:

1.  Seleccione el flujo de aprobación.

2.  Luego pulse el botón modificar.

3.  Seguidamente ubíquese en el aprobador que desee delegar su rol
    dentro del flujo.

![](media/image11.png){width="4.2711778215223095in"
height="3.0079997812773405in"}

4.  Pulse clic sobre el botón Delegar.

5.  A continuación, ingrese la información que se muestra en la
    siguiente imagen:

![](media/image12.png){width="5.96875in" height="2.8541666666666665in"}

- **Aprobador**: Se mostrará la persona seleccionada previamente como
  aprobador, este campo no es editable en esta pantalla.

- **Delegar a**: Seleccione la persona que ocupará el rol de aprobación
  del aprobador seleccionado previamente, en este listado se mostrarán
  las personas que se configuraron con el rol de Delegado en SPI
  Seguridad, Rol de SPIAS.

- **Fecha de Inicio**: Seleccione la fecha en la que la persona que se
  esté configurando iniciará con el rol de aprobador.

- **Fecha Fin**: Seleccione la fecha fin en la que la persona que se
  esté configurando culminará con el rol de aprobador.

**Observación**: Para el botón de delegado se mostrarán las personas
creadas con el rol de Delegar en SPI Seguridad.

**Nota Importante**: Importante mencionar que el sistema de aprobación
validará la fecha fin indicada al delegado, es decir que todas las
solicitudes que se encuentren dentro del rango fecha de inicio y fecha
fin serán aprobadas por el delegado asignado.

**Mis solicitudes:**

Para los usuarios con el rol de Solicitantes, existirá un nuevo recuadro
en donde aparezcan las solicitudes del empleado.

![Interfaz de usuario gráfica, Aplicación, Sitio web El contenido
generado por IA puede ser
incorrecto.](media/image13.png){width="6.1375in" height="2.7375in"}

Al ingresar a esa sección podremos ver una tabla con todas mis
solicitudes, con el tipo de solicitud y la información relevante de la
misma, se contará con filtros para ver todo el historial:

![Interfaz de usuario gráfica, Texto, Aplicación El contenido generado
por IA puede ser incorrecto.](media/image14.png){width="6.1375in"
height="1.3298611111111112in"}

Si hacemos clic en alguna veremos un detalle de la misma:

![Imagen que contiene Interfaz de usuario gráfica El contenido generado
por IA puede ser
incorrecto.](media/image15.png){width="5.420138888888889in"
height="3.5262292213473314in"}

**Solicitudes por aprobación**:

Los usuarios con el rol aprobadores tendrán una opción extra en el
perfil superior de SPIAS, en el que aparezcan las solicitudes
pendientes, al lado de perfil o inicio:

![](media/image16.png){width="6.1375in" height="0.2916666666666667in"}

Al hacer clic en ella podremos ver una tabla con las solicitudes
pendientes a la fecha:

![Interfaz de usuario gráfica, Texto, Aplicación, Correo electrónico El
contenido generado por IA puede ser
incorrecto.](media/image17.png){width="6.072916666666667in"
height="2.8645833333333335in"}

Para Aprobar, Rechazar o En Revisión, tildaremos o haremos clic en la
solicitud y presionaremos el estatus. En caso de rechazar o colocar en
revisión la solicitud se puede añadir una observación.

- En caso de Aprobar la solicitud, este estatus es para indicar que la
  solicitud fue aprobada por el responsable según el flujo definido, se
  notificará al siguiente aprobador dependiente de la configuración
  realizada.

- En caso de Rechazar la solicitud, este estatus indica que la solicitud
  se rechaza por alguna justificación, se cerrará la solicitud, en este
  caso se enviará notificación al solicitante.

- En caso de colocar el estatus En Revisión, este estatus indica que la
  solicitud tiene una observación por el aprobador, se enviará al
  solicitante notificación con la observación del porque requiere ajuste
  la solicitud, con el fin que el solicitante realice el ajuste indicado
  y envíe nuevamente la solicitud, en este caso iniciará nuevamente el
  flujo.

**Observaciones**:

- Idealmente todas estas notificaciones se harán vía correo, con las
  credenciales que se configuran al desplegar SPIAS.

**\**

**Propuesta en SPI Nómina**:

- Se propone crear en SPI Nómina una opción donde RRHH podrá visualizar
  las solicitudes Aprobadas desde SPIAS, donde además podrán generar
  listado de dichas solicitudes en un archivo exportable en Excel.

- El reporte se generará con toda la información que se imprime en la
  solicitud de vacaciones.

- La pantalla de parámetros para generar el reporte debe considerar
  filtros para imprimir rangos de fechas, estatus de la solicitud.
  Evaluar la inclusión de estatus de avance de las solicitudes.

- Evaluar incorporar un estatus cuando la solicitud ya se encuentre
  procesada por RRHH.

  ---------------------------------------------------------------------------------
  **Observaciones**:   
  -------------------- ------------------------------------------------------------

  ---------------------------------------------------------------------------------

+-------------------------+------------------------------------------------+-------------------------+
| **Aprobado por**:       | **Firma**:                                     | **Asistencia**          |
+=========================+:===============================================+:========================+
| EriKa Ferrao            |                                                |                         |
+-------------------------+------------------------------------------------+-------------------------+
| Leisser Ciampani        |                                                |                         |
+-------------------------+------------------------------------------------+-------------------------+
| Ana T. Naranjo          |                                                |                         |
+-------------------------+------------------------------------------------+-------------------------+
| María Y. Guillen        |                                                |                         |
+-------------------------+------------------------------------------------+-------------------------+
| Julia Liendo            |                                                |                         |
+-------------------------+------------------------------------------------+-------------------------+
| Rosa Vera               |                                                |                         |
+-------------------------+------------------------------------------------+-------------------------+
| Raquel Toro             |                                                |                         |
+-------------------------+------------------------------------------------+-------------------------+
| **Nota:** *Los arriba firmantes certificamos que el planteamiento aprobado será la base principal  |
| para la elaboración del prototipo correspondiente.*                                                |
+----------------------------------------------------------------------------------------------------+
| **Fecha de Certificación**: xx/xx/xxxx                                                             |
+----------------------------------------------------------------------------------------------------+
| **Elaborado por:** María Zambrano                                                                  |
+----------------------------------------------------------------------------------------------------+
