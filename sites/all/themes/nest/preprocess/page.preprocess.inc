<?php

/**
 * Implements hook_preprocess_page().
 */
function nest_preprocess_page(&$variables) {
  // You can use preprocess hooks to modify the variables before they are passed
  // to the theme function or template file.

  $alias = drupal_get_path_alias() ? drupal_get_path_alias() : $variables['id'];

  $variables['attributes_array']['id'] = 'page-' . $alias;
}
