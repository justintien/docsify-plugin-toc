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
        target: 'h2, h3, h4, h5, h6'
      },
    }
    </script>
    ```

2. Insert script into docsify document:

    ```html
    <script src="//unpkg.com/docsify-plugin-toc"></script>
    ```

## Options

| Argument | Type | Description |
| --- | --- | --- |
| `tocMaxLevel` | `number` | The maximum depth of the headings printed on the ToC. If you set `tocMaxLevel` to 3, I recommend you to set `subMaxLevel` to 2 avoid ToC duplication. |
| `target` | `string` | The target heading printed on the ToC. It's used as an argument to query DOM with `querySelectorAll()` |
