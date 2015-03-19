<p class="tac"><a href="admin.php?action=formSlider">Ajouter un slider</a></p>
<table>
  <thead>
    <tr>
      <th>Nom</th>
      <th colspan="2">&nbsp;</th>
    </tr>
  </thead>
  <tbody>
    {foreach from=$sliders item=slider}
      <tr>
        <td><a href="admin.php?action=listeSlides&id_slider={$slider->id}">{$slider->titre}</a></td>
        <td><a href="admin.php?action=formSlider&id={$slider->id}"><img id="edit" src="" alt="Modifier" /></a></td>
        <td><a href="admin.php?action=deleteSlider&id={$slider->id}" class="delete"><img src="" alt="Supprimer" /></a></td>
      </tr>
    {/foreach}
  </tbody>
</table>