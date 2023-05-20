const modal = document.getElementById('modal')

document.getElementById('pokemonList').addEventListener('click', function (event) {
   if (event.target.closest('li')) {
      var firstName = event.target.closest('li').querySelector('.name').textContent;

      const conteudoName = allPokemons.find((pokemon) => pokemon.name === firstName);

      if (conteudoName) {
         modal.innerHTML = convertPokemonToModal(conteudoName);
      } else {
         console.log("Pokémon não encontrado.");
      }

      document.getElementById('modal').style.display = 'block';

      document.getElementById('fecharModal').addEventListener('click', function () {
         document.getElementById('modal').style.display = 'none';
      });
   }
});



document.addEventListener('click', function (event) {
   if (event.target === document.getElementById('modal')) {
      document.getElementById('modal').style.display = 'none';
   }
});

function showDiv(divId) {
   //Some as divs
   var divs = document.getElementsByClassName('contentModal');
   for (var i = 0; i < divs.length; i++) {
      divs[i].style.display = 'none';
   }
   // Mostra a div selecionada
   document.getElementById(divId).style.display = 'block';

   // Coloca borda na div selecionada
   var aboutDiv = document.getElementById('aboutDiv');
   var baseStatsDiv = document.getElementById('baseStatsDiv');
   var movesDiv = document.getElementById('movesDiv');
   var baseStatsDiv = document.getElementById('baseStatsDiv');
   aboutDiv.classList.remove('border');
   baseStatsDiv.classList.remove('border');
   movesDiv.classList.remove('border');
   baseStatsDiv.classList.remove('border');
   document.getElementById(divId + 'Div').classList.add('border');
}