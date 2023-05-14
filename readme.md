**Project**
# Create a simple user manager (no Angular/React)

One view should be the form that creates new users
- The form should create a user with the following attributes:
    - Username, name, email address, age
- Your server should then assign a unique userId to this user upon creation.
- Post the newly created user to the server and save it to a file, then redirect the client to the user listing view

# One view should be the user listing.

- It should contain a table which should list the username, name, email address, and age of all created users, as well as an edit and delete button/link for each user
- The edit link should take you to the edit view for that user
- The delete link should delete the user

# One view should be an edit view
- This view should contain a form similar to the create user form but that is pre-populated with the users information, and allows for editing of the correct users information.


Project Recommendations:
- Use a uuid(Universally Unique Identifier) for your userIds: https://www.npmjs.com/package/uuid
- Save the users to a json file. The json object in that file would have a single property that is an array of the users: (see users.json example file)

{
    "users":[
       {
          "uniqueId":"484e08f0-d031-11ea-b8b3-dd899bf3937c",
          "username":"ctdalton",
          "name":"Curtis Dalton",
          "email":"asdf@asdf.com",
          "age":"323323"
       }
    ]
}

***You will need to use the net module for the Chat/Client server, not socket.io***
######
**Proyecto**
# Cree un administrador de usuarios simple (sin Angular/React)

Una vista debe ser el formulario que crea nuevos usuarios.

- El formulario debe crear un usuario con los siguientes atributos:

    - Nombre de usuario, nombre, dirección de correo electrónico, edad

- Luego, su servidor debe asignar un ID de usuario único a este usuario al momento de la creación.

- Publique el usuario recién creado en el servidor y guárdelo en un archivo, luego redirija al cliente a la vista de lista de usuarios

# Una vista debe ser la lista de usuarios.

- Debe contener una tabla que incluya el nombre de usuario, el nombre, la dirección de correo electrónico y la edad de todos los usuarios creados, así como un botón/enlace para editar y eliminar para cada usuario.

- El enlace de edición debería llevarlo a la vista de edición de ese usuario.

- El enlace de eliminación debe eliminar al usuario.

Una vista debe ser una vista de edición

- Esta vista debe contener un formulario similar al formulario de creación de usuario, pero que se completa previamente con la información de los usuarios y permite la edición de la información correcta de los usuarios.

https://drive.google.com/file/d/1b7JhEdRnm8BzjwUv-Rt70j31pFHXtTMP/view
