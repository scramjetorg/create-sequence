# create-sequence

The [`Scramjet Cloud Platform`](https://docs.scramjet.org/platform) sequence package
initialization template ran by `npm init scramjetorg/sequence <template-name>`, for example:

```bash
npm init scramjetorg/sequence py-simple
```

The command above will not create any sequence directory, main file and package.json will be created in a place from which `npm init ...` command was executed. We advise to create sequence directory first and then execute `npm init scramjetorg/sequence <template-name>` from there.

All templates are in `templates` directory. If you won't use any `<template-name>` in `npm init ...` command, like when you execute init command like this:

```bash
npm init scramjetorg/sequence
```

the main file and package.json file will be created out of `templates/default`.
