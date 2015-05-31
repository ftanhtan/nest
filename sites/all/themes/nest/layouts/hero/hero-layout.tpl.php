<div<?php print $attributes; ?>>
  <header class="l-header" role="banner">
    <div class="l-constrained">
      <div class="l-branding site-branding">
        <?php if ($logo && $site_name): ?>
          <a href="<?php print $front_page; ?>" title="<?php print $site_name; ?>" rel="home" class="site-branding__logo"><img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" /></a>
        <?php elseif ($site_name): ?>
          <a href="<?php print $front_page; ?>" class="site-branding__name" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
        <?php endif; ?>
        <?php if ($site_slogan): ?>
          <h2 class="site-branding__slogan"><?php print $site_slogan; ?></h2>
        <?php endif; ?>
        <?php print render($page['branding']); ?>
      </div>
      <?php print render($page['header']); ?>
    </div>
    <div class="l-navigation-wrapper">
      <div class="l-constrained l-navigation">
        <?php print render($page['navigation']); ?>
      </div>
    </div>
  </header>

  <?php print render($page['hero']); ?>

  <?php if (!empty($page['highlighted'])): ?>
    <div class="l-highlighted-wrapper">
      <?php print render($page['highlighted']); ?>
    </div>
  <?php endif; ?>

  <div class="l-main l-constrained">
    <a id="main-content"></a>
    <?php print render($tabs); ?>
    <?php print $messages; ?>
    <?php print render($page['help']); ?>
    <?php print render($page['sidebar_first']); ?>

    <div class="l-content" role="main">
      <?php print render($title_prefix); ?>
      <?php if ($title && !$is_front): ?>
        <h1><?php print $title; ?></h1>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
      <?php if ($action_links): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
      <?php print render($page['content']); ?>
      <?php print $feed_icons; ?>
    </div>

    <?php print render($page['sidebar_second']); ?>
  </div>

  <footer class="l-footer-wrapper" role="contentinfo">
    <?php print render($page['footer']); ?>
    <?php print render($page['footer_copyright']); ?>
    <div class="copyright">Copyright © NEST All Rights Reserved.</div>
  </footer>
</div>
