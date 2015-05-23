<?php

/**
 * @file
 * Template overrides as well as (pre-)process and alter hooks for the
 * nest theme.
 */



/**
 * Output the Webform into the node content.
 *
 * @param $node
 *   The webform node object.
 * @param $page
 *   If this webform node is being viewed as the main content of the page.
 * @param $form
 *   The rendered form.
 * @param $enabled
 *   If the form allowed to be completed by the current user.
 */
function nest_webform_view($variables) {
  dpm($variables);
  // Only show the form if this user is allowed access.
  if ($variables['webform']['#enabled']) {
    dpm($variables['webform']['#form']['submitted']);

    $rows = array();
    foreach ($variables['webform']['#form']['submitted'] as $key => $field) {
      # code...
    }
    return drupal_render($variables['webform']['#form']);
  }
}
