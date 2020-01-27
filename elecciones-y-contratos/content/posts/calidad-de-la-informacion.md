---
title: "Calidad de la información"
date: 2020-01-27T08:04:56-05:00
draft: false
description: "Identificar la relación entre financiación de campañas y contratación pública significa analizar los datos abiertos de las plataformas de acceso público de información de SECOP y Cuentas Claras. Sin embargo estas dos fuentes de información tienen algunos errores en el origen de los datos, principalmente en el registro de los nombres, números de identificación y/o valores. Este es nuestro diagnóstico de los datos."
images:
  - images/bg-historia.webp
---

La efectiva apertura de datos abiertos está regida por una serie de principios de calidad e interoperabilidad para que estos sean útiles y relevantes para los usuarios. El análisis de las bases de datos de Cuentas Claras y SECOP I y II muestran la ausencia de dos de los criterios fundamentales de calidad: exactitud y completitud.

En estas plataformas la intervención humana es esencial y por tanto susceptible a errores. Parte de estos ellos están ligados a la falta de capacitación de las personas encargadas de registrar la información y a la falta de validación previa de los datos por parte de las entidades encargadas de registrar los contratos y los ingresos de campañas.

## SECOP

El sistema de registro SECOP en sus dos versiones contiene la información de contratación pública de Colombia, sus datasets tienen una gran cantidad de registros y una cobertura a nivel tanto nacional como territorial.

Uno de los grandes problemas de esta plataforma se relaciona con el acceso a sus bases de datos, ya que existen muchos datasets en la página web de datos abiertos de Colombia con distintos registros cada uno (se han encontrado hasta 6 versiones de SECOP I).

## Números de identificación

SECOP I y II adolece de sistemas de control para algunos tipos de datos, como la identificación de contratantes, contratistas y representantes legales, lo que significa que el sistema no valida la integridad de los datos, como el caso de "CC 0000" o "NIT 1111-1" o "CC 123456" con separaciones en comas, puntos, e incluso información equivocada en la columna de identificación, con direcciones, números de teléfono, de celular etc.

Sin embargo, el principal problema del campo de números de identificación es que este es de texto abierto, es decir que se pueden adicionar letras y números, y por lo tanto el diligenciamiento queda al libre albedrío de la persona que registra la información. Por ejemplo se puede escribir en una fila "C.C. 80010148 expedida en Bogotá" y en otra "CC 3.489.289" a pesar de que los dos campos son de cédula y lo único relevante es el número.

Todos los contratos deben tener un identificador único, que indica un sólo proceso de contratación, a pesar de que puedan existir varios registros (filas) de identificación de un único contrato. No obstante, existen registros duplicados (de un mismo contrato) con un identificador único diferente. Puede haber hasta 20 registros de un mismo contrato que tienen un identificador único distinto, que se cuentan en el sistema como contratos diferentes.

## Números de contratistas, empresas y demás

Hay múltiples formas de digitar o escribir un mismo nombre. Por ejemplo el nombre "Eneriedh" se puede escribir en la base de datos como "Eneriedt", "Enerieth", "Eneriheth", o "Eneryed", para el sistema son personas diferentes aunque en realidad es la misma persona con el nombre escrito de diferentes maneras debido al mal ingreso de la información en la plataforma. Esto puede hacer parecer que hay múltiples contratistas o múltiples contratos, cuando en realidad solo hay uno.

Además existen distintos nombres de personas y empresas con un mismo número de cédula o de NIT, lo que no permite automatizar los contratistas, las empresas o los representantes legales.

El campo del contratante directo (es decir la entidad) también es un texto abierto, y a pesar de que hay un código para cada institución, en muchos casos se escribe distinto cada registro a pesar de que es la misma, por ejemplo en una fila se escribe "Secretaría de Movilidad" en otra "Secretaría de movilidad de Bogotá", y en otra "Secretaría de Movilidad del Distrito".

## Adiciones y valores del contrato

Particularmente, en SECOP se encuentran errores, tales como que en las adiciones y en el valor total del contrato se reportan números decimales que en la base son interpretados como unidades, lo que lleva a que el valor del contrato se multiplique hasta por mil veces respecto a su valor original. Los separadores de miles normalmente en excel se realizan por puntos y los decimales en comas, entonces contratos que son de $100.000,00 (con decimales como valores de centavo) puede resultar en $10.000.000.

A su vez, en muchos registros se encuentra información errada del contrato, por ejemplo un contrato directo con el IDRD, de prestación de servicios y destinado a una persona natural, se puede plantear como de muy bajo costo, pero el valor del contrato registrado en la base de datos es de 68 billones de pesos, lo que evidentemente no refleja el monto real del contrato, que debe ser mucho menor.

Es particularmente sensible analizar la información de las adiciones de los contratos, ya que a veces en el registro de la base de datos las adiciones no corresponden al valor pagado en la totalidad del contrato (que es verificado en el pdf de la plataforma).

## Información faltante

Los contenidos faltantes en una base de datos es de los principales problemas al analizar contratos, ya que estos registros pueden dejar de contener información fundamental para entender estos procesos.

El problema se agrava cuando vemos que muchas de estas variables dependen de otras. Por ejemplo, si un contrato no tiene una fecha de finalización, tampoco tiene la cuantía final de ejecución del contrato. O algunos montos de contratos que en el campo del tipo de moneda no tienen registro, no se sabe si el monto se encuentra en moneda colombiana, dólares u otra moneda, y así si en el campo de valor se registra "100000" podrían ser 100 mil pesos colombianos (valor muy bajo para un contrato), o podrían ser 100 mil dólares (que es una cifra mucho más alta).

Esto además hace que aparezca más información faltante de la que puede haber, pues por ejemplo el hecho de que no haya datos de cuantías se puede atribuir en parte a que la base de datos cuenta con contratos que no fueron asignados.

## Cuentas claras

Por su parte, Cuentas Claras tiene un completo registro de los ingresos y gastos de campaña y sus formularios cuentan con sistemas de validación del tipo de dato, no obstante, también es común encontrar que allí no existe una previa validación de la información que se registra, especialmente cuando hacemos referencia a las identificaciones de aportantes.

Se encuentran registros de identificación con asociaciones a nombres distintos (cédulas incompletas, con errores de digitación o su total ausencia), o errores en la asociación del tipo de identificación con cédulas que se registran como NIT y viceversa.

Hay casos donde varios aportes de una misma persona a un mismo candidato se registran de manera inadecuada, ya que al momento de diligenciar la información en formatos de excel no se tiene en cuenta que cuando se arrastra un número (de cédula en este caso), este empieza a hacer sumatoria, por ejemplo si el número de cédula de un aportante es "8174653", cuando se arrastra, la siguiente fila será "8174654", la siguiente "8174655", y así sucesivamente, así cada fila será diferente y se leerán números de cédula de personas distintas a pesar de que sea el mismo aportante.

En las elecciones territoriales de 2015 se encontró que aproximadamente 2.600 millones de pesos estaban asociados a financiadores con números de identificación alterados, entre los que se encontraron 81 personas que registraron números de identificación como "1", "2", "3", "4", "17", "70", "11111" o "444444", entre otros números inventados. También hay 829 registros de personas en las que el número de identificación no concuerda con el nombre registrado. Incluso un aportante registró su número de celular como si fuera su cédula de ciudadanía.

En algunos casos es casi imposible establecer el origen de los recursos de una campaña política. Por ejemplo Jazmín Stibaliz Puerta Pinto, candidata a la Cámara de Representantes por el partido Somos, presenta en su reporte de ingresos y gastos que el 95 por ciento de sus recursos (110 millones de pesos) se los donó  el señor Danilo Trujillo Pinto, sin embargo, el número de cédula registrado en Cuentas Claras corresponde a John De La Cruz Zapata ¿Finalmente quien fue el aportante de esta campaña?

El senador Luis Fernando Velasco, por ejemplo registra un crédito recibido del señor Jorge Sair Naranjo López. Sin embargo, según la Registraduría Nacional del Estado Civil y el sistema de seguridad social (ADRES), Naranjo, identificado con la cédula de ciudadanía número 10547343, falleció en 2014.

Además existen ciertos números de identificación que corresponden a cédulas de extranjería a pesar de que la legislación colombiana establece que ciudadanos extranjeros no pueden financiar campañas.

En estos casos, la responsabilidad principal es de los candidatos, gerentes y contadores de campañas, quienes deben reportar de manera adecuada y completa todos los ingresos que reciben. Deben verificar que los números de identificación correspondan a los nombres de los aportantes. Ya que como lo indica la Resolución 3097 de 2013 del Consejo Nacional Electoral (CNE), cualquier falsedad o falta de veracidad debidamente comprobada de los datos del aplicativo Cuentas Claras será sancionada.

**Recomendaciones**

Teniendo en cuenta lo anterior y con el propósito de aportar a través de este análisis al acceso efectivo a la información de carácter público, a continuación se proponen algunas acciones de mejora en la calidad de los datos de estas plataformas:

- Establecer controles de validación de tipo de datos, que sea acorde con el carácter del dato registrado, sobre todo en los campos de identificación de personas y entidades, y en los de registro de valores numéricos y de fecha. Asegurarse de contar con un software que valide la información digitada por los funcionarios en el momento de carga, incluso con un sistema de validación en marcha. Una vez cargada la información, se deben incluir rutinas de limpieza para validar que la información es correcta, asegurándose de que los campos numéricos en efecto son numéricos, de que los de texto son textos o de que las fechas son fechas.
- Proyectar la posibilidad de precargar los nombres de las entidades públicas contratantes en un campo de texto predictivo, para que el nombre registrado sea estándar y no un texto libre. Esto se podría realizar, por ejemplo, a partir de códigos asignados a cada entidad, lo que permitiría la trazabilidad en otras bases de datos, tal es el caso del Divipola y el Código FUT.
- Establecer obligatoriedad en el registro de algunos campos fundamentales para conocer el proceso de contratación o de financiación de campaña.
- En cualquier ejercicio de análisis de datos es muy importante contar con descripciones de las variables que se están recogiendo para que todos los usuarios entiendan qué significan.
- Cada una de las columnas de información como la cédula, el tipo de contrato, los proponentes, etc. cuenta con su propia forma de designar los registros que no tienen información como "No Definido", "No definido", "No definida", "No registra" y otras variantes. Para hacer análisis de información sería conveniente que todos los campos mantengan la misma convención.


