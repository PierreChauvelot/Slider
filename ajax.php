<?php
require_once("fonctions.php");
/**
 * Renvoie la liste des sliders
 */
function getSliders(){
	header("Content-Type: application/json");
	echo json_encode(findAllSliders());
}

/**
 * Renvoie la liste des slides correspondant à l'id passé en post
 */
function getSlides(){
	header("Content-Type: application/json");
	echo json_encode(findSliderById($_GET['id']));
}

$action = $_GET['action'];
$action();