#!/usr/bin/env node

"use strict"

const fse = require("fs-extra")
const init = require("init-package-json")
const fs = require("fs/promises")
const path = require("path")

const templateName = process.argv[2] || "default"

const exists = async (path) => {
  return fs.access(path)
    .then(
      () => true,
      () => false
    )
}

async function initFiles() {
  const pkgPath = path.resolve("package.json")
  const pkgJSON = (await exists(pkgPath))
    ? JSON.parse(await fs.readFile(pkgPath, "utf8"))
    : {}
  const templatesPath = path.join(__dirname, "templates", path.resolve("/", templateName))

  if (!(await exists(templatesPath))) {
    throw new Error(`Template ${templateName} couldn't be found`)
  }

  const fixturePkgJSON = await (async () => {
    try {
      return JSON.parse(await fs.readFile(path.resolve(templatesPath, "package.json"), "utf8"))
    } catch (_e) {
      console.error(`WARN: Error while reading package.json from ${templatesPath}`, _e)

      return {}
    }
  })()

  return {
    pkgPath,
    templatesPath,
    wdPath: path.resolve(),
    pkgJSON,
    fixturePkgJSON
  }
}

async function copyFiles(data) {
  const { templatesPath, wdPath } = data

  await fse.copy(templatesPath, wdPath, { overwrite: false, filter: (src) => !src.endsWith("package.json") })
  return data
}

async function initPackage({ fixturePkgJSON, pkgJSON, wdPath: dir, pkgPath }) {
  const configData = { ...fixturePkgJSON, ...pkgJSON }

  await fs.writeFile(pkgPath, JSON.stringify(configData))

  // eslint-disable-next-line no-undefined
  return init(dir, undefined, configData)
}

Promise
  .resolve()
  // Add a newline to stdout between the create-esm installation and
  // the package initialization.
  // eslint-disable-next-line no-console
  .then(() => console.log(""))
  .then(initFiles)
  .then(copyFiles)
  .then(initPackage)
  .catch(console.error)
