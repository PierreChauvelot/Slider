<?php
require_once("plugins/Smarty/Smarty.class.php");
require_once("fonctions.php");

ini_set("display_errors", On);

####################################################################################################
############################################# SLIDERS ##############################################
####################################################################################################
// Liste des sliders
function listeSliders(){
  $assign = array();
  $assign['titre'] = "Sliders";
  $assign['sliders'] = findAllSliders();
  return $assign;
}

// Formulaire d'ajout / modification d'un slider
function formSlider(){
  $assign = array();
  if (isset($_GET['id'])){
    $assign['slider'] = findSliderById($_GET['id']);
    $assign['titre'] = 'Modifier le slider "'.$assign['slide']->titre.'"';
  }else{
    $assign['titre'] = "Ajouter un slider";
  }
  return $assign;
}

// Ajout / Modification du slider en BDD
function insertUpdateSlider(){
  header("Location: admin.php?action=listeSliders");
}

####################################################################################################
############################################# SLIDES ###############################################
####################################################################################################
// Liste des slides d'un slider passé en get
function listeSlides(){
  $slider = findSliderById($_GET['id_slider']);
  $assign = array();
  $assign['titre'] = $slider->titre;
  $assign['slider'] = $slider;
  
  return $assign;
}

// Formulaire d'ajout / modification d'un slide
function formSlide(){
  $assign = array();
  if (isset($_GET['id'])){
    $assign['slide'] = findSlideById($_GET['id']);
    $assign['titre'] = 'Modifier le slide "'.$assign['slide']->titre.'"';
  }else{
    $assign['titre'] = "Ajouter un slide";
  }
  return $assign;
}

// Ajout / Modification du slide en BDD
function insertUpdateSlide(){
  $slide = new stdClass();
  foreach ($_POST as $attr => $val){
    if ($attr != "image" && $attr != "son") {
      $slide->$attr = $val;
    }
  }
  addSlide($slide);
  header("Location: admin.php?action=listeSlides&id_slider=".$_POST['id_slider']);
}

####################################################################################################
############################################ AFFICHAGE #############################################
####################################################################################################
$action = isset($_GET['action']) ? $_GET['action'] : "listeSliders";
$assign = $action();
$assign['action'] = $action;

$smarty = new Smarty();
$smarty->setCompileDir('templates/_cache');
$smarty->force_compile = true;
$smarty->assign($assign);
$smarty->display('templates/_skeleton.tpl');