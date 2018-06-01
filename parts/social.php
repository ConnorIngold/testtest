<?php
$michigan_webnus_options = michigan_webnus_options();
$michigan_webnus_options['michigan_webnus_social_first'] = isset($michigan_webnus_options['michigan_webnus_social_first']) ? $michigan_webnus_options['michigan_webnus_social_first'] : '';
$michigan_webnus_options['michigan_webnus_social_second'] = isset($michigan_webnus_options['michigan_webnus_social_second']) ? $michigan_webnus_options['michigan_webnus_social_second'] : '';
$michigan_webnus_options['michigan_webnus_social_third'] = isset($michigan_webnus_options['michigan_webnus_social_third']) ? $michigan_webnus_options['michigan_webnus_social_third'] : '';
$michigan_webnus_options['michigan_webnus_social_fourth'] = isset($michigan_webnus_options['michigan_webnus_social_fourth']) ? $michigan_webnus_options['michigan_webnus_social_fourth'] : '';
$michigan_webnus_options['michigan_webnus_social_fifth'] = isset($michigan_webnus_options['michigan_webnus_social_fifth']) ? $michigan_webnus_options['michigan_webnus_social_fifth'] : '';
$michigan_webnus_options['michigan_webnus_social_sixth'] = isset($michigan_webnus_options['michigan_webnus_social_sixth']) ? $michigan_webnus_options['michigan_webnus_social_sixth'] : '';
$michigan_webnus_options['michigan_webnus_social_seventh'] = isset($michigan_webnus_options['michigan_webnus_social_seventh']) ? $michigan_webnus_options['michigan_webnus_social_seventh'] : '';
$michigan_webnus_options['michigan_webnus_social_first_url'] = isset($michigan_webnus_options['michigan_webnus_social_first_url']) ? $michigan_webnus_options['michigan_webnus_social_first_url'] : '';
$michigan_webnus_options['michigan_webnus_social_second_url'] = isset($michigan_webnus_options['michigan_webnus_social_second_url']) ? $michigan_webnus_options['michigan_webnus_social_second_url'] : '';
$michigan_webnus_options['michigan_webnus_social_third_url'] = isset($michigan_webnus_options['michigan_webnus_social_third_url']) ? $michigan_webnus_options['michigan_webnus_social_third_url'] : '';
$michigan_webnus_options['michigan_webnus_social_fourth_url'] = isset($michigan_webnus_options['michigan_webnus_social_fourth_url']) ? $michigan_webnus_options['michigan_webnus_social_fourth_url'] : '';
$michigan_webnus_options['michigan_webnus_social_fifth_url'] = isset($michigan_webnus_options['michigan_webnus_social_fifth_url']) ? $michigan_webnus_options['michigan_webnus_social_fifth_url'] : '';
$michigan_webnus_options['michigan_webnus_social_sixth_url'] = isset($michigan_webnus_options['michigan_webnus_social_sixth_url']) ? $michigan_webnus_options['michigan_webnus_social_sixth_url'] : '';
$michigan_webnus_options['michigan_webnus_social_seventh_url'] = isset($michigan_webnus_options['michigan_webnus_social_seventh_url']) ? $michigan_webnus_options['michigan_webnus_social_seventh_url'] : '';

$social = array();
$social[1] = strtolower(trim($michigan_webnus_options['michigan_webnus_social_first']));
$social[2] = strtolower(trim($michigan_webnus_options['michigan_webnus_social_second']));
$social[3] = strtolower(trim($michigan_webnus_options['michigan_webnus_social_third']));
$social[4] = strtolower(trim($michigan_webnus_options['michigan_webnus_social_fourth']));
$social[5] = strtolower(trim($michigan_webnus_options['michigan_webnus_social_fifth']));
$social[6] = strtolower(trim($michigan_webnus_options['michigan_webnus_social_sixth']));
$social[7] = strtolower(trim($michigan_webnus_options['michigan_webnus_social_seventh']));
$social_url = array();
$social_url[1] = trim($michigan_webnus_options['michigan_webnus_social_first_url']);
$social_url[2] = trim($michigan_webnus_options['michigan_webnus_social_second_url']);
$social_url[3] = trim($michigan_webnus_options['michigan_webnus_social_third_url']);
$social_url[4] = trim($michigan_webnus_options['michigan_webnus_social_fourth_url']);
$social_url[5] = trim($michigan_webnus_options['michigan_webnus_social_fifth_url']);
$social_url[6] = trim($michigan_webnus_options['michigan_webnus_social_sixth_url']);
$social_url[7] = trim($michigan_webnus_options['michigan_webnus_social_seventh_url']);

for ($x = 1; $x <= 7; $x++) {
	echo($social[$x] && $social_url[$x])?'<a target="_blank" href="'. $social_url[$x] .'" class="'.$social[$x].'"><i class="fa-'.$social[$x].'"></i></a>':'';
}
?>