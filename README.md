
# @triskel/parser

Compact, reliable and customizable HTML minifier.

[![ᴋɪʟᴛ ᴊs](https://jesus.germade.es/assets/images/badge-kiltjs.svg)](https://github.com/kiltjs)
[![npm](https://img.shields.io/npm/v/@triskel/parser.svg)](https://www.npmjs.com/package/@triskel/parser)
[![Build Status](https://cloud.drone.io/api/badges/triskeljs/parser/status.svg)](https://cloud.drone.io/triskeljs/parser)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)


### Installation

``` sh
npm i -D @triskel/parser

# npm install --save-dev @triskel/parser
```

### Usage

``` js

var parseHTML = require('@triskel/parser');

parseHTML(`
<body class="mediawiki ltr sitedir-ltr mw-hide-empty-elt ns-4 ns-subject page-Wikipedia_Portada rootpage-Wikipedia_Portada skin-vector action-view">    <div id="mw-page-base" class="noprint"></div>
    <div id="mw-head-base" class="noprint"></div>
    <div id="content" class="mw-body" role="main">
      <a id="top"></a>

              <div id="siteNotice" class="mw-body-content"><!-- CentralNotice --></div>
            <div class="mw-indicators mw-body-content">
</div>
      <h1 id="firstHeading" class="firstHeading" lang="es">Wikipedia:Portada</h1>
                  <div id="bodyContent" class="mw-body-content">
                  <div id="siteSub">De Wikipedia, la enciclopedia libre</div>
                <div id="contentSub"></div>
                        <div id="jump-to-nav" class="mw-jump">
          Saltar a:          <a href="#mw-head">navegación</a>,           <a href="#p-search">búsqueda</a>
        </div>
        <div id="mw-content-text" lang="es" dir="ltr" class="mw-content-ltr"><table style="margin:4px 0 0 0; width:100%; background:none">
<tr>
<td class="MainPageBG" style="width:100%; border:1px solid #C7D0F8; background:#F2F5FD; vertical-align:top; color:#000; -moz-border-radius:4px; -webkit-border-radius: 4px; border-radius: 4px;">
`, {
  ignore_unclosed: true
});
```

> Result

``` js
[
  {
    attrs: {
      class: 'mediawiki ltr sitedir-ltr mw-hide-empty-elt ns-4 ns-subject page-Wikipedia_Portada rootpage-Wikipedia_Portada skin-vector action-view',
    },
    _: [
      {
        attrs: {
          id: 'mw-page-base',
          class: 'noprint',
        },
        $: 'div',
      },
      {
        attrs: {
          id: 'mw-head-base',
          class: 'noprint',
        },
        $: 'div',
      },
      {
        attrs: {
          id: 'content',
          class: 'mw-body',
          role: 'main',
        },
        _: [
          {
            attrs: {
              id: 'top',
            },
            $: 'a',
          },
          {
            attrs: {
              id: 'siteNotice',
              class: 'mw-body-content',
            },
            _: [
              {
                comments: ' CentralNotice ',
              },
            ],
            $: 'div',
          },
          {
            attrs: {
              class: 'mw-indicators mw-body-content',
            },
            $: 'div',
          },
          {
            attrs: {
              id: 'firstHeading',
              class: 'firstHeading',
              lang: 'es',
            },
            _: 'Wikipedia:Portada',
            $: 'h1',
          },
          {
            attrs: {
              id: 'bodyContent',
              class: 'mw-body-content',
            },
            _: [
              {
                attrs: {
                  id: 'siteSub',
                },
                _: 'De Wikipedia, la enciclopedia libre',
                $: 'div',
              },
              {
                attrs: {
                  id: 'contentSub',
                },
                $: 'div',
              },
              {
                attrs: {
                  id: 'jump-to-nav',
                  class: 'mw-jump',
                },
                _: [
                  'Saltar a:          ',
                  {
                    attrs: {
                      href: '#mw-head',
                    },
                    _: 'navegación',
                    $: 'a',
                  },
                  ',           ',
                  {
                    attrs: {
                      href: '#p-search',
                    },
                    _: 'búsqueda',
                    $: 'a',
                  },
                ],
                $: 'div',
              },
              {
                attrs: {
                  id: 'mw-content-text',
                  lang: 'es',
                  dir: 'ltr',
                  class: 'mw-content-ltr',
                },
                _: [
                  {
                    attrs: {
                      style: 'margin:4px 0 0 0;width:100%;background:none',
                    },
                    _: [
                      {
                        _: [
                          {
                            attrs: {
                              class: 'MainPageBG',
                              style: 'width:100%;border:1px solid #C7D0F8;background:#F2F5FD;vertical-align:top;color:#000;-moz-border-radius:4px;-webkit-border-radius:4px;border-radius:4px;',
                            },
                            unclosed: true,
                            $: 'td',
                          },
                        ],
                        unclosed: true,
                        $: 'tr',
                      },
                    ],
                    unclosed: true,
                    $: 'table',
                  },
                ],
                unclosed: true,
                $: 'div',
              },
            ],
            unclosed: true,
            $: 'div',
          },
        ],
        unclosed: true,
        $: 'div',
      },
    ],
    unclosed: true,
    $: 'body',
  },
]
```
