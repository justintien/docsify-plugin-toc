# docsify-plugin-toc

> Page's ToC for docsify for the Singapore Government Documentation Portal

[![npm](https://img.shields.io/npm/v/docsify-plugin-toc.svg?style=flat-square)](https://www.npmjs.com/package/@developerportalsg/docsify-plugin-toc)

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/58126222/231341632-81012165-d570-4485-8d34-9c2cabe45f79.png">

## Usage

1. Configure docsify-plugin-toc:

    ```html
    <script>
    window.$docsify = {
      toc: {
        tocMaxLevel: 5,
        target: 'h2, h3, h4, h5, h6',
        ignoreHeaders:  ['<!-- {docsify-ignore} -->', '<!-- {docsify-ignore-all} -->']
      },
    }
    </script>
    ```

2. Insert style/script into docsify document:

    ```html
    <!-- head -->
    <link rel="stylesheet" href="https://unpkg.com/@developerportalsg/docsify-plugin-toc/dist/light.css">
    <!-- Also insert you custom css -->

    <!-- body -->
    <script src="https://unpkg.com/@developerportalsg/docsify-plugin-toc/dist/docsify-plugin-toc.min.js"></script>
    ```

## Options

| Argument | Type | Description |
| --- | --- | --- |
| `tocMaxLevel` | `number` | The maximum depth of the headings printed on the ToC. If you set `tocMaxLevel` to 3, I recommend you to set `subMaxLevel` to 2 avoid ToC duplication. |
| `target` | `string` | The target heading printed on the ToC. It's used as an argument to query DOM with `querySelectorAll()` |
| `ignoreHeaders` | `string[]` | ignore header name keywrod list, (e.g. ['develop', /develop/i], support Regular expressions) |
