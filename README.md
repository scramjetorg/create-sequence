# create-sequence

The [`Scramjet Cloud Platform`](https://docs.scramjet.org/platform) sequence package
initialization template ran by `npm init scramjetorg/sequence <template-name>`, for example:

```bash
npm init scramjetorg/sequence py-generator
```

The command above will not create any sequence directory, main files and package.json will be created in a place from which `npm init ...` command was executed. We advise to create sequence directory first and then execute `npm init scramjetorg/sequence <template-name>` from there. Then, if using typescript, use the `npm install` command.

All templates are in `templates` directory. If you won't use any `<template-name>` in `npm init ...` command, like when you execute init command like this:

```bash
npm init scramjetorg/sequence
```

the main file and package.json file will be created out of `templates/default`.

## Running

Open a terminal in the folder of the selected template, then use:

```bash
# If you run this sample on Self Hosted Hub, please start it with command:
sth

# Run predeploy script:
npm run predeploy

# Deploy sequence to STH:
si seq deploy dist
```

And that's it, your code is running in the hub of your choice. :)

## Error handling

**In case of error:**

```bash
$ npm init scramjetorg/sequence py-simple
Need to install the following packages:
  @scramjet/create-sequence@1.0.0
Ok to proceed? (y) y
npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/@scramjet%2fcreate-sequence - Not found
npm ERR! 404 
npm ERR! 404  '@scramjet/create-sequence@1.0.0' is not in this registry.
npm ERR! 404 
npm ERR! 404 Note that you can also install from a
npm ERR! 404 tarball, folder, http url, or git url.

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/user/.npm/_logs/2023-02-16T09_54_16_704Z-debug-0.log
```

It may be connected to node version. If you work on node 16 please upgrade to version 18 (lts), and try again.

The desired outcome after executing `npm init scramjetorg/sequence` for the first time should be:

```bash
$ npm init scramjetorg/sequence py-simple

Need to install the following packages:
  github:scramjetorg/create-sequence

Ok to proceed? (y) y
```

Please type `y` to allow package installation, it is initial for `npm init` command to create files out of templates defined in this github repository.

**In case of error:**

```bash
$ npm init scramjetorg/sequence py-simple

Error: package.json already exists in current location
```

The Sequence initialization from the template must be done in the localization where there is no other `package.json` file.
The command `npm init scramjetorg/sequence` does not include directory creation. Therefore, before you initiate sequence creation, create a new directory and run the `npm init scramjetorg/sequence` command from there.
