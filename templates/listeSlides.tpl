<p class="tac"><a href="admin.php?action=formSlide&id_slider={$smarty.get.id_slider}">Ajouter un slide</a></p>
<table>
  <thead>
    <tr>
      <th>Nom</th>
      <th>Image</th>
      <th>Son</th>
      <th>Desctiption</th>
      <th colspan="2">&nbsp;</th>
    </tr>
  </thead>
  <tbody>
    {foreach from=$slider->slides item=slide}
    <tr>
      <td>{$slide->titre}</td>
      <td><img src="slides/{$slide->nom_fichier}.jpg" alt="Apperçu"/></td>
      <td>
        <audio controls>
          <source src="sons/{$slide->nom_fichier}.mp3"  type="audio/mpeg" />
            Un navigateur ça se met à jour.
        </audio>
      </td>
      <td>{$slide->description}</td>
      <td><a href="admin.php?action=formSlide&id_slider={$smarty.get.id_slider}&id={$slide->id}"><img id="edit" src="icone-modifier.png" alt="Modifier" /></a></td>
      <td><a href="admin.php?action=deleteSlider&id={$slide->id}" class="delete"><img src="icone-supprimer.png" alt="Supprimer" /></a></td>
    </tr>
    {/foreach}
  </tbody>
</table>