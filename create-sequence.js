#!/usr/bin/env node
/* eslint-disable no-console */

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

  if (await exists(pkgPath)){
    throw new Error("Error: package.json already exists in current location")
  }

  const templatesPath = path.join(__dirname, "templates", path.resolve("/", templateName))

  if (!(await exists(templatesPath))) {
    throw new Error(`Error: Template ${templateName} couldn't be found`)
  }

  const templatePkgJSON = await (async () => {
    try {
      return JSON.parse(await fs.readFile(path.resolve(templatesPath, "package.json"), "utf8"))
    } catch (_e) {
      throw new Error("Error while reading template package.json")
    }
  })()

  return {
    pkgPath,
    templatesPath,
    wdPath: path.resolve(),
    templatePkgJSON
  }
}

async function initPackage(data) {
  const { templatePkgJSON, wdPath } = data

  console.log("")
  const result =  await init(wdPath, "", templatePkgJSON)
  console.log("")

  if (!result) {
    throw new Error("Sequence template initialization canceled")
  }

  data.pkgJSON = { ...templatePkgJSON, ...result }
  return data
}

async function copyFiles(data) {
  const { templatesPath, wdPath } = data

  await fse.copy(templatesPath, wdPath, { overwrite: false, errorOnExist: true, filter: (src) => !src.endsWith("package.json") })
  return data
}

async function copyPackage(data) {
  const { pkgPath, pkgJSON } = data

  await fs.writeFile(pkgPath, JSON.stringify(pkgJSON, null, 2))
  console.log("Sequence template succesfully created")
  return data
}

function errorHandler(error) {
  console.error(error.message ? error.message : error)
}

Promise
  .resolve()
  .then(initFiles)
  .then(initPackage)
  .then(copyFiles)
  .then(copyPackage)
  .catch(errorHandler)
