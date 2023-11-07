# docsify-plugin-toc

> page's ToC for docsify.

[![npm](https://img.shields.io/npm/v/docsify-plugin-toc.svg?style=flat-square)](https://www.npmjs.com/package/docsify-plugin-toc)

[![homepage](./snapshot.png)](https://blog.jiapan.tw "Justin (Jiapan 賈胖) 的 Blog")

## Usage

1. Configure docsify-plugin-toc:

    ```html
    <script>
    window.$docsify = {
      toc: {
        tocMaxLevel: 5,
        target: 'h2, h3, h4, h5, h6',
        ignoreHeaders:  ['Content', 'Job Description']
      },
    }
    </script>
    ```

2. Insert style/script into docsify document:

    ```html
    <!-- head -->
    <link rel="stylesheet" href="https://unpkg.com/docsify-plugin-toc@1.3.1/dist/light.css">
    <!-- Also insert you custom css -->

    <!-- body -->
    <script src="https://unpkg.com/docsify-plugin-toc@1.3.1/dist/docsify-plugin-toc.min.js"></script>
    ```

## Options

| Argument | Type | Description |
| --- | --- | --- |
| `tocMaxLevel` | `number` | The maximum depth of the headings printed on the ToC. If you set `tocMaxLevel` to 3, I recommend you to set `subMaxLevel` to 2 avoid ToC duplication. |
| `target` | `string` | The target heading printed on the ToC. It's used as an argument to query DOM with `querySelectorAll()` |
| `ignoreHeaders` | `string[]` | ignore header name keywrod list, (e.g. ['develop', /develop/i], support Regular expressions) |
