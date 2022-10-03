// import { saveToLocalStorage } from './localStorage';
// const teste = [
//   {
//     "type": "meal",
//     "nationality": "Sunrise!",
//     "category": "Entrada",
//     "alcoholicOrNot": "",
//     "name": "Guacamole Joe",
//     "image": "https://scontent.fbfh3-3.fna.fbcdn.net/v/t1.18169-9/12654697_451590035040776_4130967265540550346_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9267fe&_nc_ohc=zNPpm9XaeuwAX_iFWwT&_nc_ht=scontent.fbfh3-3.fna&oh=00_AT8OumnbTWb7bVNvQkLpJLIyb6NtBsHhM1EQDvVJDn5wRQ&oe=635D2EA3",
//     "ingredientsList": {
//       "salmão": "1 tira",
//       "Guacamole": "",
//       "Massa Harumaki": "1 un",
//       "gohan": "50 g"
//     },
//     "instructions": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     "id": "recipe1",
//     "user": {
//         "email": "gabriel@eu.com"
//     }
//   },
//   {
//     "type": "drink",
//     "nationality": "",
//     "category": "Cocktail",
//     "alcoholicOrNot": "Alcoholic",
//     "name": "Caipirinha",
//     "image": "https://img.estadao.com.br/fotos/crop/960x540/resources/jpg/9/3/1532640931039.jpg",
//     "ingredientsList": {
//       "Limão": "1 un",
//       "Cachaça": "60 ml"
//     },
//     "instructions": "1Corte o limão ao meio e, depois, em fatias meia-lua finas. 2Macere (esmague) levemente as fatias de limão com o açúcar em um copo baixo (macerar demais deixa o drinque amargo). 3Encha o copo com gelo e coloque a cachaça. Misture e finalize com fatias de limão.",
//     "id": "recipe2",
//     "user": {
//         "email": "gabriel@eu.com"
//     }
//   },
//   {
//     "type": "meal",
//     "nationality": "Brasil",
//     "category": "burguer",
//     "alcoholicOrNot": "",
//     "name": "Burger de Salmão",
//     "image": "https://scontent.fbfh3-3.fna.fbcdn.net/v/t1.18169-9/14364911_536268716572907_1955571925492527560_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9267fe&_nc_ohc=L7lQ_-EHAhsAX_o_k0I&_nc_ht=scontent.fbfh3-3.fna&oh=00_AT8eL1-2WmXeThlAfj6zjtcq0mr5XXfIvnqCrYcPeV8nRQ&oe=635BD482",
//     "ingredientsList": {
//       "Salmão": "200g",
//       "Pão": "1un"
//     },
//     "instructions": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     "id": "recipe3",
//     "user": {
//         "email": "gabriel@eu.com"
//     }
//   },
//   {
//     "type": "meal",
//     "nationality": "Japan",
//     "category": "Sushi",
//     "alcoholicOrNot": "",
//     "name": "Combinado",
//     "image": "https://scontent.fbfh3-2.fna.fbcdn.net/v/t1.18169-9/12745415_455485564651223_7299321985541722042_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=9267fe&_nc_ohc=uQqCf80v04gAX95R34V&_nc_ht=scontent.fbfh3-2.fna&oh=00_AT-odbZ5t_IwuEieX59DPwZSaMX_fQhJlXOeooIToSLQCg&oe=635C7F5B",
//     "ingredientsList": {
//       "Salmão": "",
//       "Atum": "",
//       "Tilapia": "",
//       "Cream cheese": "",
//       "Gohan": "",
//     },
//     "instructions": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     "id": "recipe4",
//     "user": {
//         "email": "gabriel@eu.com"
//     }
//   },
//   {
//     "type": "meal",
//     "nationality": "Japan",
//     "category": "Sushi",
//     "alcoholicOrNot": "",
//     "name": "Niguiri",
//     "image": "https://scontent.fbfh3-2.fna.fbcdn.net/v/t31.18172-8/10333672_466261986906914_991343912336189636_o.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9267fe&_nc_ohc=qsAidcH6-XsAX9NsSts&_nc_ht=scontent.fbfh3-2.fna&oh=00_AT-6jQehYOPC-Jyv3ebCyDWpKyQxCsmnSRxCxK4FQh6xag&oe=635D7F34",
//     "ingredientsList": {
//       "Salmão": "",
//       "Gohan": "",
//       "Molho": "",
//     },
//     "instructions": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     "id": "recipe5",
//     "user": {
//         "email": "tryber@eu.com"
//     }
//   },
//   {
//     "type": "meal",
//     "nationality": "Japan",
//     "category": "Sushi",
//     "alcoholicOrNot": "",
//     "name": "Hot Kiiro",
//     "image": "https://scontent.fbfh3-2.fna.fbcdn.net/v/t1.18169-9/12523001_448739895325790_1409204653805772499_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9267fe&_nc_ohc=DcauY0NSwNsAX9CIS7Z&_nc_ht=scontent.fbfh3-2.fna&oh=00_AT_aIw7SbQEcGlOziBYPBQZQlliujtkdfzo9-n12LVab5Q&oe=635EBEFE",
//     "ingredientsList": {
//       "Salmão": "",
//       "massa harumaki": "",
//       "Chutney de Manga": "",
//       "Hortelã": "1 folha",
//     },
//     "instructions": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     "id": "recipe6",
//     "user": {
//         "email": "tryber@eu.com"
//     }
//   },
// ];

// saveToLocalStorage('myRecipes', teste);
