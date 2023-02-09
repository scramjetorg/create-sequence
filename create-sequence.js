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
  const fixturesPath = path.join(__dirname, "fixtures", path.resolve("/", templateName))

  if (!(await exists(fixturesPath))) {
    throw new Error(`Template ${templateName} couldn't be found`)
  }

  const fixturePkgJSON = await (async () => {
    try {
      return JSON.parse(await fs.readFile(path.resolve(fixturesPath, "package.json"), "utf8"))
    } catch (_e) {
      console.error(`WARN: Error while reading package.json from ${fixturesPath}`, _e)

      return {}
    }
  })()

  return {
    pkgPath,
    fixturesPath,
    wdPath: path.resolve(),
    pkgJSON,
    fixturePkgJSON
  }
}

async function copyFiles(data) {
  const { fixturesPath, wdPath } = data

  await fse.copy(fixturesPath, wdPath, { filter: (src) => !src.endsWith("package.json") })
  return data
}

async function initPackage({ fixturePkgJSON, pkgJSON, wdPath: dir }) {
  const configData = { ...fixturePkgJSON, ...pkgJSON }
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
